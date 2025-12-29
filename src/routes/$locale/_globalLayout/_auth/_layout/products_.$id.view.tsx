import { createFileRoute, useParams } from '@tanstack/react-router';
import { useEffect } from 'react';

import ProductView, {
  ProductNotFound,
  ProductViewSkeleton,
} from '@modules/products/components/product-view';
import { useProductByIdQuery } from '@modules/products/queries';
import { useTranslation } from 'react-i18next';
import { pageTitle } from '@/lib/utils';
import { useBreadcrumbItems } from '@/stores/breadcrumb';
import { useSidebarItems } from '@/stores/sidebar';

export const Route = createFileRoute(
  '/$locale/_globalLayout/_auth/_layout/products_/$id/view'
)({
  component: RouteComponent,
  onEnter() {
    useSidebarItems.getState().setActiveItem('products');
  },
  head() {
    return { meta: [{ title: pageTitle('Product Details') }] };
  },
});

function RouteComponent() {
  const { t } = useTranslation();
  const { id } = useParams({ from: Route.id });
  const { data, isLoading } = useProductByIdQuery(id);
  const product = data?.data.data;
  const { setItems } = useBreadcrumbItems();
  useEffect(() => {
    setItems([
      { label: t('Sidebar.products'), href: '/products' },
      {
        label: t('ProductDetailsPage.title'),
        isCurrent: true,
      },
    ]);
  }, [t, setItems]);
  if (isLoading) return <ProductViewSkeleton />;
  if (!product) return <ProductNotFound />;
  return <ProductView product={product} key={JSON.stringify(product)} />;
}
