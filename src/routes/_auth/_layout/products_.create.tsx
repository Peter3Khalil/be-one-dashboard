import { zodResolver } from '@hookform/resolvers/zod';
import ProductDetailsForm from '@modules/products/components/product-details-form';
import { VariantsSection } from '@modules/products/components/variants-selection';
import { formSchema } from '@modules/products/form-schema';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@ui/button';
import { Form } from '@ui/form';
import { Package, Save } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import type { ProductFormSchema } from '@modules/products/types';
import { useSidebarItems } from '@/stores/sidebar';
import { useBreadcrumbItems } from '@/stores/breadcrumb';
import { cn, pageTitle } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export const Route = createFileRoute('/_auth/_layout/products_/create')({
  component: RouteComponent,
  onEnter() {
    useBreadcrumbItems.getState().setItems([
      { label: 'Products', href: '/products' },
      {
        label: 'Create',
        href: '/products/create',
        isCurrent: true,
      },
    ]);
    useSidebarItems.getState().setActiveItem('products');
  },
  head() {
    return { meta: [{ title: pageTitle('Create Product') }] };
  },
});

function RouteComponent() {
  const isMobile = useIsMobile();

  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variants: [],
    },
  });

  function onSubmit(values: ProductFormSchema) {
    console.log(values);
  }

  const totalStock = form
    .getValues('variants')
    .reduce(
      (sum, v) =>
        sum +
        v.sizes.reduce(
          (s, size) => s + (isNaN(+size.stock) ? 0 : +size.stock),
          0
        ),
      0
    );
  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn('container space-y-6', { 'px-0': isMobile })}
        >
          <div className="flex items-center justify-between">
            <h1 className="heading">Create Product</h1>
            <Button type="submit">
              <Save /> Save Product
            </Button>
          </div>
          <ProductDetailsForm />
          <VariantsSection />

          <div className="flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Package className="h-4 w-4" />
              <span>
                Total Stock:{' '}
                <strong className="text-foreground">{totalStock} items</strong>
              </span>
            </div>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
}
