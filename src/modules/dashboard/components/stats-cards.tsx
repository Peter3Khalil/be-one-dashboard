import { Card } from '@ui/card';
import { useTranslation } from 'react-i18next';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DollarSignIcon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

function StatCard({ title, value, change, icon }: StatCardProps) {
  const isPositive = change >= 0;
  const { t } = useTranslation();

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="mt-2 text-2xl font-bold">{value}</h3>
          <div className="mt-2 flex items-center gap-1">
            {isPositive ? (
              <ArrowUpIcon className="h-4 w-4 text-success" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 text-destructive" />
            )}
            <span
              className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}
            >
              {Math.abs(change)}%
            </span>
            <span className="text-xs text-muted-foreground">
              {t('Analytics.vsLastMonth')}
            </span>
          </div>
        </div>
        <div className="rounded-full bg-primary/10 p-3">{icon}</div>
      </div>
    </Card>
  );
}

export function StatsCards() {
  const { t } = useTranslation();

  const stats = [
    {
      title: t('Analytics.totalRevenue'),
      value: '$45,231',
      change: 12.5,
      icon: <DollarSignIcon className="h-6 w-6 text-primary" />,
    },
    {
      title: t('Analytics.totalOrders'),
      value: '1,234',
      change: 8.3,
      icon: <ShoppingCartIcon className="h-6 w-6 text-primary" />,
    },
    {
      title: t('Analytics.totalProducts'),
      value: '567',
      change: 2.4,
      icon: <PackageIcon className="h-6 w-6 text-primary" />,
    },
    {
      title: t('Analytics.totalCustomers'),
      value: '892',
      change: -1.2,
      icon: <UsersIcon className="h-6 w-6 text-primary" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
