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
  return <div>{t('Sidebar.dashboard')}</div>;
}

function useBreadcrumbSetup() {
  const { t } = useTranslation();
  const { setItems } = useBreadcrumbItems();
  useEffect(() => {
    setItems([{ label: t('Sidebar.dashboard'), isCurrent: true }]);
  }, [setItems, t]);
}
