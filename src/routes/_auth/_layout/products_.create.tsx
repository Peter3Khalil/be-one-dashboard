import ProductDetailsForm from '@modules/products/components/product-details-form';
import { VariantsSection } from '@modules/products/components/variants-selection';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@ui/button';
import { Package, Save } from 'lucide-react';
import { useState } from 'react';
import type { ColorVariant, ProductFormData } from '@modules/products/types';
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
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    description: '',
    variants: [],
  });

  const handleAddVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, { color: '', sizes: [] }],
    }));
  };

  const handleUpdateVariant = (index: number, variant: ColorVariant) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v, i) => (i === index ? variant : v)),
    }));
  };

  const handleRemoveVariant = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedVariants = formData.variants
      .filter((v) => v.color.trim() !== '' && v.sizes.length > 0)
      .map((v) => ({
        color: v.color,
        sizes: v.sizes.map((s) => ({
          value: s.value,
          stock: s.stock,
        })),
      }));

    console.log('Product Data:', {
      name: formData.name,
      price: formData.price,
      description: formData.description,
      variants: cleanedVariants,
    });
  };

  const totalStock = formData.variants.reduce(
    (sum, v) => sum + v.sizes.reduce((s, size) => s + size.stock, 0),
    0
  );
  return (
    <form
      onSubmit={handleSubmit}
      className={cn('container space-y-6', { 'px-0': isMobile })}
    >
      <div className="flex items-center justify-between">
        <h1 className="heading">Create Product</h1>
        <Button type="submit">
          <Save /> Save Product
        </Button>
      </div>
      <ProductDetailsForm />
      <VariantsSection
        variants={formData.variants}
        onAddVariant={handleAddVariant}
        onUpdateVariant={handleUpdateVariant}
        onRemoveVariant={handleRemoveVariant}
      />

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
  );
}
