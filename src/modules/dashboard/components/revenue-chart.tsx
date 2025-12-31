import { Card } from '@ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@ui/chart';
import { useTranslation } from 'react-i18next';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

type Props = {
  data: Array<{ month: string; revenue: number }>;
};
export function RevenueChart({ data }: Props) {
  const { t } = useTranslation();

  const chartConfig = {
    revenue: {
      label: t('Analytics.revenue'),
      color: 'var(--chart-1)',
    },
  };
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">
          {t('Analytics.revenueOverview')}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t('Analytics.monthlyRevenue')}
        </p>
      </div>

      <ChartContainer config={chartConfig} className="h-75 w-full">
        <AreaChart
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <defs>
            <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-revenue)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-revenue)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="revenue"
            type="monotone"
            fill="url(#fillRevenue)"
            fillOpacity={0.4}
            stroke="var(--color-revenue)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </Card>
  );
}
