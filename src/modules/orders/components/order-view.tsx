import { useNavigate } from '@/i18n/routing';
import { useRouter } from '@tanstack/react-router';
import { Badge } from '@ui/badge';
import type { BadgeVariant } from '@ui/badge';
import type { buttonVariants } from '@ui/button';
import { Button } from '@ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ui/card';
import { Skeleton } from '@ui/skeleton';
import type { VariantProps } from 'class-variance-authority';
import {
  ArrowLeft,
  CheckCircle,
  Loader2,
  Mail,
  MapPin,
  Package,
  Phone,
  RotateCcw,
  ShoppingBag,
  User,
  XCircle,
} from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUpdateOrderStatus } from '../mutations';
import type { Order } from '../types';
import { formatPrice } from '@/lib/utils';

type Props = {
  order: Order;
};

const OrderView: FC<Props> = ({ order }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [pendingStatus, setPendingStatus] = useState<
    Order['order_status'] | null
  >(null);

  const {
    order_id,
    order_status,
    total_amount,
    customer_name,
    email,
    phone,
    address,
    city,
    region,
    postal_code,
    country,
    items,
  } = order;

  const statusConfig: Record<
    Order['order_status'],
    {
      badgeVariant: BadgeVariant;
      buttonVariant: VariantProps<typeof buttonVariants>['variant'];
      icon: FC<React.SVGProps<SVGSVGElement>>;
      label: string;
    }
  > = {
    pending: {
      badgeVariant: 'info-yellow',
      buttonVariant: 'secondary',
      icon: Package,
      label: t('OrdersPage.status.pending'),
    },
    delivered: {
      badgeVariant: 'success',
      buttonVariant: 'success',
      icon: CheckCircle,
      label: t('OrdersPage.status.delivered'),
    },
    cancelled: {
      badgeVariant: 'destructive',
      buttonVariant: 'destructive',
      icon: XCircle,
      label: t('OrdersPage.status.cancelled'),
    },
    refunded: {
      badgeVariant: 'info-blue',
      buttonVariant: 'destructiveSoft',
      icon: RotateCcw,
      label: t('OrdersPage.status.refunded'),
    },
  };

  const config = statusConfig[order_status];
  const StatusIcon = config.icon;

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const { mutate: updateStatus, isPending } = useUpdateOrderStatus(order_id);

  const statusOptions = [
    { label: t('OrdersPage.status.pending'), value: 'pending' as const },
    { label: t('OrdersPage.status.delivered'), value: 'delivered' as const },
    { label: t('OrdersPage.status.cancelled'), value: 'cancelled' as const },
    { label: t('OrdersPage.status.refunded'), value: 'refunded' as const },
  ].filter((option) => option.value !== order_status);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.history.back()}
            variant="outline"
            size="icon"
            className="rounded-full text-muted-foreground rtl:rotate-180"
          >
            <ArrowLeft />
          </Button>
          <h1 className="heading">
            {t('OrderDetailsPage.orderNumber', { number: order_id })}
          </h1>
          <Badge variant={config.badgeVariant}>
            <StatusIcon />
            {config.label}
          </Badge>
        </div>
        <div className="flex flex-col text-end">
          <strong className="heading">{formatPrice(total_amount)}</strong>
          <span className="text-sm text-muted-foreground">
            <b>{totalQuantity}</b> {t('OrderDetailsPage.items')}
          </span>
        </div>
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <Card className="gap-4">
            <CardHeader className="gap-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <User className="size-5 text-primary" />
                </div>
                {t('OrderDetailsPage.customerInformation')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="size-4 text-muted-foreground" />
                <span className="font-medium">{customer_name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-4 text-muted-foreground" />
                <a
                  href={`mailto:${email}`}
                  className="text-primary hover:underline"
                >
                  {email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 text-muted-foreground" />
                <a
                  href={`tel:${phone}`}
                  className="text-primary hover:underline"
                >
                  {phone}
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="gap-4">
            <CardHeader className="gap-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <MapPin className="size-5 text-primary" />
                </div>
                {t('OrderDetailsPage.shippingAddress')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="space-y-1">
                <p>{address}</p>
                <p>
                  {city}, {region} {postal_code}
                </p>
                <p>{country}</p>
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Card className="gap-4">
            <CardHeader className="gap-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <ShoppingBag className="size-5 text-primary" />
                </div>
                {t('OrderDetailsPage.orderItems')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 rounded-xl border bg-accent/40 p-4"
                >
                  <div className="size-20 overflow-hidden rounded-lg bg-background">
                    {item.item_image ? (
                      <img
                        src={item.item_image}
                        alt={item.product_name}
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center">
                        <Package className="size-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{item.product_name}</h4>
                        <div className="flex gap-2 text-sm text-muted-foreground">
                          <span className="capitalize">
                            {t('OrderDetailsPage.size')}: {item.size}
                          </span>
                          <span>•</span>
                          <span className="capitalize">
                            {t('OrderDetailsPage.color')}: {item.color}
                          </span>
                        </div>
                      </div>
                      <span className="font-medium">
                        {formatPrice(item.line_total)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {formatPrice(item.unit_price)} × {item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between border-t pt-4">
                <span className="text-lg font-medium">
                  {t('OrderDetailsPage.total')}
                </span>
                <span className="text-lg font-bold">
                  {formatPrice(total_amount)}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {t('OrderDetailsPage.updateStatus')}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              {statusOptions.map((option) => {
                const Icon = statusConfig[option.value].icon;
                const variant = statusConfig[option.value].buttonVariant;
                const isThisButtonPending =
                  isPending && pendingStatus === option.value;
                return (
                  <Button
                    key={option.value}
                    onClick={() => {
                      setPendingStatus(option.value);
                      updateStatus(option.value);
                    }}
                    disabled={isPending}
                    variant={variant}
                  >
                    {isThisButtonPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                    {option.label}
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const OrderViewSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <Card className="gap-4">
            <CardHeader className="gap-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <Skeleton className="size-10 rounded-xl" />
                <Skeleton className="h-6 w-48" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </CardContent>
          </Card>
          <Card className="gap-4">
            <CardHeader className="gap-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <Skeleton className="size-10 rounded-xl" />
                <Skeleton className="h-6 w-40" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </div>
        <Card className="gap-4">
          <CardHeader className="gap-4">
            <CardTitle className="flex items-center gap-3 text-lg">
              <Skeleton className="size-10 rounded-xl" />
              <Skeleton className="h-6 w-32" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex gap-4 rounded-xl border bg-accent/40 p-4"
              >
                <Skeleton className="size-20 rounded-lg" />
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between border-t pt-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const OrderNotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-destructive/10">
            <Package className="size-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">
            {t('OrderDetailsPage.orderNotFound')}
          </CardTitle>
          <CardDescription>
            {t('OrderDetailsPage.orderNotFoundDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-2">
          <Button
            onClick={() =>
              navigate({
                to: '/orders',
              })
            }
            variant="outline"
          >
            {t('OrderDetailsPage.viewOrders')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderView;
