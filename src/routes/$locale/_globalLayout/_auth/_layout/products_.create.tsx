import { zodResolver } from '@hookform/resolvers/zod';
import ProductDetailsForm from '@modules/products/components/product-details-form';
import { VariantsForm } from '@modules/products/components/variants-form';
import { formSchema } from '@modules/products/form-schema';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@ui/button';
import { Form } from '@ui/form';
import { Package, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useCreateProduct, useUploadImages } from '@modules/products/mutations';
import { useCategoriesQuery } from '@modules/products/queries';
import type {
  CreateProductBody,
  ProductFormSchema,
  UploadImagesBody,
} from '@modules/products/types';
import { useSidebarItems } from '@/stores/sidebar';
import { useBreadcrumbItems } from '@/stores/breadcrumb';
import { cn, pageTitle } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from '@/i18n/routing';

export const Route = createFileRoute(
  '/$locale/_globalLayout/_auth/_layout/products_/create'
)({
  component: RouteComponent,
  onEnter() {
    useSidebarItems.getState().setActiveItem('products');
  },
  head() {
    return { meta: [{ title: pageTitle('Create Product') }] };
  },
});

const createFormSchema = formSchema.refine(
  ({ variants }) => {
    // Must be distinct colors
    const colors = variants.map((v) => v.color.toLowerCase());
    const uniqueColors = new Set(colors);
    return colors.length === uniqueColors.size;
  },
  {
    message: 'Variant colors must be distinct',
    path: ['variants'],
  }
);

function RouteComponent() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { mutateAsync, isPending: isCreating } = useCreateProduct();
  const { mutateAsync: uploadImages, isPending: isUploading } =
    useUploadImages();
  const isPending = isCreating || isUploading;
  const { data: categoriesData } = useCategoriesQuery();
  const categoryOptions = categoriesData?.data.data.map(({ name, id }) => ({
    label: name,
    value: String(id),
  }));
  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      variants: [],
    },
  });

  async function onSubmit(values: ProductFormSchema) {
    const { data } = await mutateAsync(prepareFormData(values));
    const productId = data.data.id;
    const imagesData = prepareProductImages({
      productId,
      variants: values.variants,
    });
    Promise.all(imagesData.map((imgData) => uploadImages(imgData))).then(() => {
      navigate({
        to: '/products/$id/view',
        params: { id: productId } as never,
      });
    });
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
  useBreadcrumbSetup();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('container space-y-6', { 'px-0': isMobile })}
      >
        <div className="flex items-center justify-between">
          <h1 className="heading">{t('CreateProductPage.title')}</h1>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              t('Global.saving')
            ) : (
              <>
                <Save /> {t('CreateProductPage.saveProductButton')}
              </>
            )}
          </Button>
        </div>
        <ProductDetailsForm form={form} categoryOptions={categoryOptions} />
        <VariantsForm form={form} />

        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Package className="h-4 w-4" />
            <span>
              {t('ProductDetailsPage.totalStocks')}:{' '}
              <strong className="text-foreground">
                {totalStock} {t('ProductDetailsPage.items')}
              </strong>
            </span>
          </div>
        </div>
      </form>
    </Form>
  );
}

function prepareFormData(data: ProductFormSchema): CreateProductBody {
  const variants: CreateProductBody['variants'] = [];
  data.variants.forEach(({ color, sizes }) => {
    sizes.forEach(({ value, stock }) => {
      variants.push({
        color,
        size: value,
        stock: Number(stock),
      });
    });
  });
  return {
    ...data,
    variants,
    categories: data.categories.map((cat) => Number(cat)),
  };
}

function prepareProductImages({
  productId,
  variants,
}: {
  productId: string;
  variants: ProductFormSchema['variants'];
}): Array<UploadImagesBody> {
  return variants.map(({ color, images }) => ({
    productId,
    color,
    images,
  }));
}

function useBreadcrumbSetup() {
  const { setItems } = useBreadcrumbItems();
  const { t } = useTranslation();
  useEffect(() => {
    setItems([
      {
        label: t('ProductsPage.products'),
        href: '/products',
        isCurrent: false,
      },
      { label: t('CreateProductPage.title'), isCurrent: true },
    ]);
  }, [setItems, t]);
}
