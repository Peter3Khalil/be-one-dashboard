import { OrdersChart } from '@modules/dashboard/components/orders-chart';
import { ProductCategoriesChart } from '@modules/dashboard/components/product-categories-chart';
import { RevenueChart } from '@modules/dashboard/components/revenue-chart';
import { StatsCards } from '@modules/dashboard/components/stats-cards';
import { pageTitle } from '@/lib/utils';
import { useBreadcrumbItems } from '@/stores/breadcrumb';
import { useSidebarItems } from '@/stores/sidebar';
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('Sidebar.dashboard')}
        </h1>
        <p className="text-muted-foreground">{t('Analytics.description')}</p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueChart />
        <OrdersChart />
      </div>

      <ProductCategoriesChart />
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
