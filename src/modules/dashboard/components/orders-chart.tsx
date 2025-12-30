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

type Props = {
  data: Array<{
    month: string;
    delivered: number;
    pending: number;
    cancelled: number;
    refunded: number;
  }>;
};
export function OrdersChart({ data }: Props) {
  const { t } = useTranslation();

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
        <BarChart accessibilityLayer data={data}>
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
