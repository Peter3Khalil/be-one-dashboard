import { pageTitle } from '@/lib/utils';
import { useBreadcrumbItems } from '@/stores/breadcrumb';
import { useSidebarItems } from '@/stores/sidebar';
import { OrdersChart } from '@modules/dashboard/components/orders-chart';
import { RevenueChart } from '@modules/dashboard/components/revenue-chart';
import { StatsCards } from '@modules/dashboard/components/stats-cards';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/$locale/_globalLayout/_auth/_layout/')({
  component: App,
  onEnter() {
    useSidebarItems.getState().setActiveItem('dashboard');
  },
  head() {
    return { meta: [{ title: pageTitle('Dashboard') }] };
  },
});

function App() {
  const { t } = useTranslation();
  useBreadcrumbSetup();
  const chartData = [
    { month: t('Global.monthNames.january.short'), revenue: 18600 },
    { month: t('Global.monthNames.february.short'), revenue: 30500 },
    { month: t('Global.monthNames.march.short'), revenue: 23700 },
    { month: t('Global.monthNames.april.short'), revenue: 42300 },
    { month: t('Global.monthNames.may.short'), revenue: 20900 },
    { month: t('Global.monthNames.june.short'), revenue: 34000 },
    { month: t('Global.monthNames.july.short'), revenue: 45000 },
    { month: t('Global.monthNames.august.short'), revenue: 38000 },
    { month: t('Global.monthNames.september.short'), revenue: 41000 },
    { month: t('Global.monthNames.october.short'), revenue: 50000 },
    { month: t('Global.monthNames.november.short'), revenue: 47000 },
    { month: t('Global.monthNames.december.short'), revenue: 52000 },
  ];
  const ordersChartData = [
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('Sidebar.dashboard')}
        </h1>
        <p className="text-muted-foreground">{t('Analytics.description')}</p>
      </div>

      <StatsCards
        totalRevenue={1000}
        totalOrders={50}
        totalProducts={200}
        totalCustomers={10}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueChart data={chartData} />
        <OrdersChart data={ordersChartData} />
      </div>
    </div>
  );
}

function useBreadcrumbSetup() {
  const { t } = useTranslation();
  const { setItems } = useBreadcrumbItems();
  useEffect(() => {
    setItems([{ label: t('Sidebar.dashboard'), isCurrent: true }]);
  }, [setItems, t]);
}
