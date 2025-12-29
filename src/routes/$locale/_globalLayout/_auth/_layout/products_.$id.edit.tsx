import Loading from '@components/loading';
import EditProductForm from '@modules/products/components/edit-product-form';
import { useProductByIdQuery } from '@modules/products/queries';
import { createFileRoute, useParams } from '@tanstack/react-router';
import { ProductNotFound } from '@modules/products/components/product-view';
import type { ProductFormSchema, ProductType } from '@modules/products/types';
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
  const { id } = useParams({ from: Route.id });
  const { data, isLoading } = useProductByIdQuery(id);
  const product = data?.data.data;
  if (isLoading) return <Loading className="h-full" />;
  return !product ? (
    <ProductNotFound />
  ) : (
    <EditProductForm
      key={JSON.stringify(product)}
      defaultValues={prepareDefaultValues(product)}
      productId={product.id}
    />
  );
}

function prepareDefaultValues(product: ProductType): ProductFormSchema {
  const colorsMap = new Map<
    string,
    { sizes: Array<{ value: string; stock: number }>; variantId: string }
  >();
  product.variants.forEach(({ color, size, stock, id }) => {
    if (!colorsMap.has(color)) {
      colorsMap.set(color, { sizes: [{ value: size, stock }], variantId: id });
    } else {
      colorsMap.get(color)?.sizes.push({ value: size, stock });
    }
  });
  const variants: ProductFormSchema['variants'] = Array.from(
    colorsMap.entries()
  ).map(([color, { sizes, variantId }]) => ({
    color,
    sizes,
    images: product.images
      ? product.images[color].map(({ urls, id }) => ({
          id,
          url: urls.original,
        }))
      : [],
    id: String(variantId),
  }));
  return {
    name: product.name,
    price: product.price,
    description: product.description || '',
    categories: product.categories.map((cat) => String(cat.id)),
    variants,
  };
}
