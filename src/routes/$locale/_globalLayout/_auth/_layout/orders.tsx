import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from '@/i18n/routing';
import { cn, formatDate, formatPrice, pageTitle } from '@/lib/utils';
import { useBreadcrumbItems } from '@/stores/breadcrumb';
import { useSidebarItems } from '@/stores/sidebar';
import CustomPagination from '@components/custom-pagination';
import { DataTable } from '@components/data-table';
import LocalizedText from '@components/localized-text';
import OrderCard from '@modules/orders/components/order-card';
import {
  useOrders,
  withOrdersProvider,
} from '@modules/orders/components/orders-provider';
import { useUpdateOrderStatus } from '@modules/orders/mutations';
import type { Order } from '@modules/orders/types';
import { useFiltersQuery } from '@modules/products/queries';
import { createFileRoute } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import type { BadgeVariant } from '@ui/badge';
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import { Card, CardContent } from '@ui/card';
import CustomCombobox from '@ui/custom-combobox';
import CustomSelect from '@ui/custom-select';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import i18next from 'i18next';
import {
  CheckCircle,
  Eye,
  Loader2,
  Package,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export const Route = createFileRoute(
  '/$locale/_globalLayout/_auth/_layout/orders'
)({
  component: withOrdersProvider(RouteComponent),
  onEnter() {
    useSidebarItems.getState().setActiveItem('orders');
  },
  head() {
    return { meta: [{ title: pageTitle('Orders') }] };
  },
});

function RouteComponent() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const {
    dispatch,
    params,
    queryResult: { data, isLoading, isFetching, refetch },
  } = useOrders();

  const orders = data?.data.data || [];
  const { data: filtersData } = useFiltersQuery();
  const filtersOptions = filtersData?.data.data;
  const statusOptions = [
    { label: t('OrdersPage.status.pending'), value: 'pending' },
    { label: t('OrdersPage.status.delivered'), value: 'delivered' },
    { label: t('OrdersPage.status.cancelled'), value: 'cancelled' },
    { label: t('OrdersPage.status.refunded'), value: 'refunded' },
  ];

  useBreadcrumbSetup();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h1 className="heading">
            {t('OrdersPage.orders')} ({orders.length})
          </h1>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RotateCcw
              className={cn({
                'animate-spin': isFetching,
              })}
            />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 *:flex-1 sm:grid sm:grid-cols-2 md:flex md:flex-row md:flex-wrap md:items-start md:*:min-w-[200px]">
        <div className="space-y-2">
          <Label htmlFor="search">{t('OrdersPage.searchLabel')}</Label>
          <Input
            type="search"
            id="search"
            placeholder={t('OrdersPage.searchPlaceholder')}
            className="h-10"
            value={params.customer_name || params.email}
            onChange={(e) => {
              if (z.string().email().safeParse(e.target.value.trim()).success) {
                dispatch({ type: 'SET_EMAIL', payload: e.target.value.trim() });
                dispatch({ type: 'SET_CUSTOMER_NAME', payload: '' });
                return;
              } else {
                dispatch({
                  type: 'SET_CUSTOMER_NAME',
                  payload: e.target.value.trim(),
                });
                dispatch({ type: 'SET_EMAIL', payload: '' });
              }
            }}
          />
        </div>
        <CustomCombobox
          options={statusOptions}
          label={t('OrdersPage.filterByStatus')}
          placeholder={t('OrdersPage.selectStatus')}
          className="max-w-md"
          onValueChange={(v) =>
            dispatch({
              type: 'SET_ORDER_STATUS',
              payload: v as Array<Order['order_status']>,
            })
          }
          noItemsFound={t('Global.noItemsFound')}
          multiple
          defaultValues={params.order_status}
        />
        <CustomCombobox
          options={
            filtersOptions?.sizes.map((size) => ({
              label: size,
              value: size,
            })) || []
          }
          label={t('OrdersPage.filterBySize')}
          placeholder={t('OrdersPage.selectSize')}
          className="max-w-md"
          onValueChange={(v) =>
            dispatch({
              type: 'SET_SIZE',
              payload: v,
            })
          }
          noItemsFound={t('Global.noItemsFound')}
          multiple
          defaultValues={params.size}
        />

        <CustomCombobox
          options={
            filtersOptions?.colors.map((color) => ({
              label: color,
              value: color,
            })) || []
          }
          label={t('OrdersPage.filterByColor')}
          placeholder={t('OrdersPage.selectColor')}
          className="max-w-md"
          onValueChange={(v) =>
            dispatch({
              type: 'SET_COLOR',
              payload: v,
            })
          }
          noItemsFound={t('Global.noItemsFound')}
          multiple
          defaultValues={params.color}
        />
      </div>
      {isLoading ? (
        <Card>
          <CardContent>
            <Loader2
              className={cn('mx-auto h-6 w-6 text-primary', {
                'animate-spin': isLoading,
              })}
            />
          </CardContent>
        </Card>
      ) : isMobile ? (
        <div
          className={cn('space-y-4', {
            'animate-pulse': isFetching,
          })}
        >
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard key={order.order_id} order={order} />
            ))
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                {t('Global.noResultsFound')}
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <DataTable
          className={cn('animation-duration-[0.7s]', {
            'animate-pulse': isFetching,
          })}
          columns={columns}
          data={orders}
        />
      )}
      {orders.length > 0 && (
        <CustomPagination
          className="mx-auto [&_ul]:gap-3"
          defaultPage={Number(params.offset || 0) + 1}
          key={params.offset}
          onValueChange={(page) =>
            dispatch({ type: 'SET_PAGE', payload: String(page - 1) })
          }
          totalPages={1}
        />
      )}
    </div>
  );
}

const columns: Array<ColumnDef<Order>> = [
  {
    accessorKey: 'order_id',
    header: () => i18next.t('OrdersPage.table.header.orderId'),
    cell({ row: { original } }) {
      return (
        <Link
          to="/orders/$id/view"
          params={{ id: String(original.order_id) }}
          className="font-medium underline-offset-2 duration-200 hover:text-primary hover:underline"
        >
          #{original.order_id}
        </Link>
      );
    },
  },
  {
    accessorKey: 'customer_name',
    header: () => i18next.t('OrdersPage.table.header.customerName'),
    cell({ row: { original } }) {
      return (
        <div>
          <LocalizedText className="font-medium">
            {original.customer_name}
          </LocalizedText>
          <br />
          <a
            href={`mailto:${original.email}`}
            className="english text-sm text-muted-foreground underline-offset-2 hover:text-primary hover:underline"
          >
            {original.email}
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: 'total_amount',
    header: () => i18next.t('OrdersPage.table.header.totalAmount'),
    cell({ row: { original } }) {
      return (
        <LocalizedText>{formatPrice(original.total_amount)}</LocalizedText>
      );
    },
  },
  {
    accessorKey: 'items',
    header: () => i18next.t('OrdersPage.table.header.items'),
    cell({ row: { original } }) {
      const itemCount = original.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      return (
        <div className="flex items-center gap-1">
          <Package className="h-4 w-4" />
          {itemCount} {i18next.t('OrdersPage.items')}
        </div>
      );
    },
  },
  {
    accessorKey: 'order_date',
    header: () => i18next.t('OrdersPage.table.header.orderDate'),
    cell({ row: { original } }) {
      return formatDate(original.order_date, i18next.language);
    },
  },
  {
    accessorKey: 'order_status',
    header: () => i18next.t('OrdersPage.table.header.status'),
    cell({ row: { original } }) {
      const statusConfig: Record<
        Order['order_status'],
        { variant: BadgeVariant; icon: React.ElementType; label: string }
      > = {
        pending: {
          variant: 'info-yellow',
          icon: Package,
          label: i18next.t('OrdersPage.status.pending'),
        },
        delivered: {
          variant: 'success',
          icon: CheckCircle,
          label: i18next.t('OrdersPage.status.delivered'),
        },
        cancelled: {
          variant: 'destructive',
          icon: XCircle,
          label: i18next.t('OrdersPage.status.cancelled'),
        },
        refunded: {
          variant: 'info-blue',
          icon: RotateCcw,
          label: i18next.t('OrdersPage.status.refunded'),
        },
      };

      const config = statusConfig[original.order_status];
      const Icon = config.icon;

      return (
        <Badge variant={config.variant}>
          <Icon className="h-4 w-4" />
          {config.label}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const ActionsCell = () => {
        const { mutate: updateStatus, isPending } = useUpdateOrderStatus(
          row.original.order_id
        );
        const [selectedStatus, setSelectedStatus] = useState<
          Order['order_status']
        >(row.original.order_status);

        const handleStatusChange = (status: Order['order_status']) => {
          setSelectedStatus(status);
          updateStatus(status);
        };

        const statusOptions = [
          { label: i18next.t('OrdersPage.status.pending'), value: 'pending' },
          {
            label: i18next.t('OrdersPage.status.delivered'),
            value: 'delivered',
          },
          {
            label: i18next.t('OrdersPage.status.cancelled'),
            value: 'cancelled',
          },
          { label: i18next.t('OrdersPage.status.refunded'), value: 'refunded' },
        ];

        return (
          <div className="ms-auto flex w-fit items-center gap-2">
            <Link
              to="/orders/$id/view"
              params={{ id: String(row.original.order_id) }}
            >
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4" />
                {i18next.t('Global.view')}
              </Button>
            </Link>
            <div className="relative">
              <CustomSelect
                value={selectedStatus}
                onValueChange={(value) =>
                  handleStatusChange(value as Order['order_status'])
                }
                disabled={isPending}
                options={statusOptions}
                placeholder={i18next.t('OrdersPage.selectStatus')}
                className="w-40"
              />
              {isPending && (
                <Loader2 className="pointer-events-none absolute end-2 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin" />
              )}
            </div>
          </div>
        );
      };

      return <ActionsCell />;
    },
  },
];

function useBreadcrumbSetup() {
  const { t } = useTranslation();
  const { setItems } = useBreadcrumbItems();
  useEffect(() => {
    setItems([
      { label: t('OrdersPage.orders'), href: '/orders', isCurrent: true },
    ]);
  }, [setItems, t]);
}
