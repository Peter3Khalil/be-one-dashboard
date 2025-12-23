import { zodResolver } from '@hookform/resolvers/zod';
import ProductDetailsForm from '@modules/products/components/product-details-form';
import { VariantsForm } from '@modules/products/components/variants-form';
import { formSchema } from '@modules/products/form-schema';
import { Button } from '@ui/button';
import { Form } from '@ui/form';
import { Package, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { ProductFormSchema } from '@modules/products/types';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type Props = {
  defaultValues?: ProductFormSchema;
};
const EditProductForm = ({ defaultValues }: Props) => {
  const isMobile = useIsMobile();

  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variants: [],
      ...defaultValues,
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('container space-y-6', { 'px-0': isMobile })}
      >
        <div className="flex items-center justify-between">
          <h1 className="heading">Edit Product</h1>
          <Button type="submit">
            <Save /> Save Changes
          </Button>
        </div>
        <ProductDetailsForm form={form} />
        <VariantsForm form={form} />

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
  );
};

export default EditProductForm;
