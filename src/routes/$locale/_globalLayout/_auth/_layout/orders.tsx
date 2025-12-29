import { pageTitle } from '@/lib/utils';
import { useBreadcrumbItems } from '@/stores/breadcrumb';
import { useSidebarItems } from '@/stores/sidebar';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute(
  '/$locale/_globalLayout/_auth/_layout/orders'
)({
  component: RouteComponent,
  onEnter() {
    useSidebarItems.getState().setActiveItem('orders');
  },
  head() {
    return { meta: [{ title: pageTitle('Orders') }] };
  },
});

function RouteComponent() {
  const { t } = useTranslation();
  useBreadcrumbSetup();
  return <div>{t('Sidebar.orders')}</div>;
}

function useBreadcrumbSetup() {
  const { t } = useTranslation();
  const { setItems } = useBreadcrumbItems();
  useEffect(() => {
    setItems([{ label: t('Sidebar.orders'), isCurrent: true }]);
  }, [setItems, t]);
}
