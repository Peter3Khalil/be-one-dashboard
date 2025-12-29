import { Card } from '@ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@ui/chart';
import { useTranslation } from 'react-i18next';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

export function OrdersChart() {
  const { t } = useTranslation();
  const chartData = [
    {
      month: t('Global.monthNames.january.short'),
      delivered: 186,
      pending: 80,
      cancelled: 20,
      refunded: 10,
    },
    {
      month: t('Global.monthNames.february.short'),
      delivered: 305,
      pending: 120,
      cancelled: 15,
      refunded: 5,
    },
    {
      month: t('Global.monthNames.march.short'),
      delivered: 237,
      pending: 90,
      cancelled: 25,
      refunded: 8,
    },
    {
      month: t('Global.monthNames.april.short'),
      delivered: 423,
      pending: 150,
      cancelled: 30,
      refunded: 12,
    },
    {
      month: t('Global.monthNames.may.short'),
      delivered: 209,
      pending: 100,
      cancelled: 18,
      refunded: 7,
    },
    {
      month: t('Global.monthNames.june.short'),
      delivered: 340,
      pending: 110,
      cancelled: 22,
      refunded: 200,
    },
  ];
  const chartConfig = {
    delivered: {
      label: t('OrdersPage.status.delivered'),
      color: 'var(--success)',
    },
    pending: {
      label: t('OrdersPage.status.pending'),
      color: 'var(--warning)',
    },
    refunded: {
      label: t('OrdersPage.status.refunded'),
      color: 'var(--destructive-soft)',
    },
    cancelled: {
      label: t('OrdersPage.status.cancelled'),
      color: 'var(--destructive)',
    },
  };

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{t('Analytics.ordersStatus')}</h3>
        <p className="text-sm text-muted-foreground">
          {t('Analytics.ordersByStatus')}
        </p>
      </div>
      <ChartContainer config={chartConfig} className="h-75 w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="delivered" fill="var(--color-delivered)" radius={4} />
          <Bar dataKey="pending" fill="var(--color-pending)" radius={4} />
          <Bar dataKey="cancelled" fill="var(--color-cancelled)" radius={4} />
          <Bar dataKey="refunded" fill="var(--color-refunded)" radius={4} />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
