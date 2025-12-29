import { Card } from '@ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@ui/chart';
import { useTranslation } from 'react-i18next';
import { Cell, Pie, PieChart } from 'recharts';

const chartData = [
  { category: 'Electronics', value: 275, fill: 'var(--chart-1)' },
  { category: 'Clothing', value: 200, fill: 'var(--chart-2)' },
  { category: 'Home & Garden', value: 187, fill: 'var(--chart-3)' },
  { category: 'Sports', value: 173, fill: 'var(--chart-4)' },
  { category: 'Books', value: 90, fill: 'var(--chart-5)' },
];

const chartConfig = {
  value: {
    label: 'Products',
  },
  Electronics: {
    label: 'Electronics',
    color: 'var(--chart-1)',
  },
  Clothing: {
    label: 'Clothing',
    color: 'var(--chart-2)',
  },
  'Home & Garden': {
    label: 'Home & Garden',
    color: 'var(--chart-3)',
  },
  Sports: {
    label: 'Sports',
    color: 'var(--chart-4)',
  },
  Books: {
    label: 'Books',
    color: 'var(--chart-5)',
  },
};

export function ProductCategoriesChart() {
  const { t } = useTranslation();

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">
          {t('Analytics.productCategories')}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t('Analytics.distributionByCategory')}
        </p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <ChartContainer config={chartConfig} className="mx-auto h-75">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col gap-2">
          {chartData.map((item) => (
            <div key={item.category} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-sm text-muted-foreground">
                {item.category}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
