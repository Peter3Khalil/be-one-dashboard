import { Link } from '@/i18n/routing';
import { formatDate, formatPrice } from '@/lib/utils';
import LocalizedText from '@components/localized-text';
import { useUpdateOrderStatus } from '@modules/orders/mutations';
import type { Order } from '@modules/orders/types';
import type { BadgeVariant } from '@ui/badge';
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import { Card, CardContent, CardHeader } from '@ui/card';
import CustomSelect from '@ui/custom-select';
import { Separator } from '@ui/separator';
import i18next from 'i18next';
import {
  CheckCircle,
  Eye,
  Loader2,
  Package,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function OrderCard({ order }: { order: Order }) {
  const { t } = useTranslation();
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus(
    order.order_id
  );
  const [selectedStatus, setSelectedStatus] = useState<Order['order_status']>(
    order.order_status
  );

  const handleStatusChange = (status: Order['order_status']) => {
    setSelectedStatus(status);
    updateStatus(status);
  };

  const statusOptions = [
    { label: t('OrdersPage.status.pending'), value: 'pending' },
    { label: t('OrdersPage.status.delivered'), value: 'delivered' },
    { label: t('OrdersPage.status.cancelled'), value: 'cancelled' },
    { label: t('OrdersPage.status.refunded'), value: 'refunded' },
  ];

  const statusConfig: Record<
    Order['order_status'],
    { variant: BadgeVariant; icon: React.ElementType; label: string }
  > = {
    pending: {
      variant: 'info-yellow',
      icon: Package,
      label: t('OrdersPage.status.pending'),
    },
    delivered: {
      variant: 'success',
      icon: CheckCircle,
      label: t('OrdersPage.status.delivered'),
    },
    cancelled: {
      variant: 'destructive',
      icon: XCircle,
      label: t('OrdersPage.status.cancelled'),
    },
    refunded: {
      variant: 'info-blue',
      icon: RotateCcw,
      label: t('OrdersPage.status.refunded'),
    },
  };

  const config = statusConfig[order.order_status];
  const StatusIcon = config.icon;

  const itemCount = order.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <Link
              to="/orders/$id/view"
              params={{ id: String(order.order_id) }}
              className="text-lg font-semibold underline-offset-2 duration-200 hover:text-primary hover:underline"
            >
              #{order.order_id}
            </Link>
            <p className="text-sm text-muted-foreground">
              {formatDate(order.order_date, i18next.language)}
            </p>
          </div>
          <Badge variant={config.variant}>
            <StatusIcon className="h-4 w-4" />
            {config.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Customer Info */}
        <div className="space-y-1">
          <p className="font-medium">
            <LocalizedText>{order.customer_name}</LocalizedText>
          </p>
          <a
            href={`mailto:${order.email}`}
            className="english text-sm text-muted-foreground underline-offset-2 hover:text-primary hover:underline"
          >
            {order.email}
          </a>
        </div>

        <Separator />

        {/* Order Details */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Package className="h-4 w-4" />
            {itemCount} {t('OrdersPage.items')}
          </div>
          <span className="font-semibold">
            {formatPrice(order.total_amount)}
          </span>
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <div className="relative">
            <CustomSelect
              value={selectedStatus}
              onValueChange={(value) =>
                handleStatusChange(value as Order['order_status'])
              }
              disabled={isPending}
              options={statusOptions}
              placeholder={t('OrdersPage.selectStatus')}
              className="w-full"
            />
            {isPending && (
              <Loader2 className="pointer-events-none absolute end-2 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin" />
            )}
          </div>
          <Link
            to="/orders/$id/view"
            params={{ id: String(order.order_id) }}
            className="w-full"
          >
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="h-4 w-4" />
              {t('Global.view')}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
