import Loading from '@components/loading';
import EditProductForm from '@modules/products/components/edit-product-form';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import type { ProductFormSchema } from '@modules/products/types';
import { useSidebarItems } from '@/stores/sidebar';
import { useBreadcrumbItems } from '@/stores/breadcrumb';
import { pageTitle } from '@/lib/utils';

export const Route = createFileRoute(
  '/$locale/_globalLayout/_auth/_layout/products_/$id/edit'
)({
  component: RouteComponent,
  onEnter() {
    useBreadcrumbItems.getState().setItems([
      { label: 'Products', href: '/products' },
      {
        label: 'Edit Product',
        isCurrent: true,
      },
    ]);
    useSidebarItems.getState().setActiveItem('products');
  },
  head() {
    return { meta: [{ title: pageTitle('Edit Product') }] };
  },
});

function RouteComponent() {
  const [values, setValues] = useState<ProductFormSchema>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    new Promise<ProductFormSchema>((resolve) => {
      setIsLoading(true);
      setTimeout(() => {
        resolve({
          categories: ['summer'],
          variants: [
            {
              color: 'Red',
              sizes: [
                { value: 'S', stock: 10 },
                { value: 'M', stock: 15 },
                { value: 'L', stock: 20 },
              ],
              images: [],
            },
          ],
          description: '',
          name: 'T',
          price: 0,
        });
      }, 1000);
    }).then((data) => {
      setIsLoading(false);
      setValues(data);
    });
  }, []);
  return isLoading ? (
    <Loading className="h-full" />
  ) : (
    <EditProductForm key={JSON.stringify(values)} defaultValues={values} />
  );
}
