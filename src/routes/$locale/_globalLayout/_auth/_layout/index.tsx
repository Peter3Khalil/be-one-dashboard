import { MONTH_NAMES } from '@/constants';
import { pageTitle } from '@/lib/utils';
import { useBreadcrumbItems } from '@/stores/breadcrumb';
import { useSidebarItems } from '@/stores/sidebar';
import { OrdersChart } from '@modules/dashboard/components/orders-chart';
import { RevenueChart } from '@modules/dashboard/components/revenue-chart';
import { StatsCards } from '@modules/dashboard/components/stats-cards';
import { useStatsQuery } from '@modules/dashboard/queries';
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
  const { data: statsQuery } = useStatsQuery();
  const revenueChartData =
    statsQuery?.data.revenueOverView?.map(({ month, revenue }) => ({
      month: t(`Global.monthNames.${MONTH_NAMES[month - 1]}.short`),
      revenue,
    })) || [];

  const ordersChartData =
    statsQuery?.data.ordersOverview?.map(({ month, ...rest }) => ({
      month: t(`Global.monthNames.${MONTH_NAMES[month - 1]}.short`),
      ...rest,
    })) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('Sidebar.dashboard')}
        </h1>
        <p className="text-muted-foreground">{t('Analytics.description')}</p>
      </div>

      <StatsCards
        totalRevenue={Number(statsQuery?.data.totalRevenue) || 0}
        totalOrders={Number(statsQuery?.data.totalOrders) || 0}
        totalProducts={Number(statsQuery?.data.totalProducts) || 0}
        totalCustomers={Number(statsQuery?.data.totalCustomers) || 0}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueChart data={revenueChartData} />
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
