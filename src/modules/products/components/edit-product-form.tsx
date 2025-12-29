import { zodResolver } from '@hookform/resolvers/zod';
import { editFormSchema } from '@modules/products/form-schema';
import { Button } from '@ui/button';
import { Form } from '@ui/form';
import { Package, Save } from 'lucide-react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  useDeleteImages,
  useUpdateProductDetails,
  useUploadImages,
} from '../mutations';
import { useCategoriesQuery } from '../queries';
import EditProductDetailsForm from './edit-details-form';
import { EditVariantsForm } from './edit-variants-form';
import type { z } from 'zod';
import { cn, prepareProductImages } from '@/lib/utils';
import { useNavigate } from '@/i18n/routing';
import { useIsMobile } from '@/hooks/use-mobile';

type Props = {
  defaultValues?: z.infer<typeof editFormSchema>;
  productId: string;
};
const EditProductForm = ({ defaultValues, productId }: Props) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const deletedImagesIds = useRef<Array<string>>([]);
  const { data: categoriesData } = useCategoriesQuery();
  const navigate = useNavigate();
  const { deleteImages, isPending: isDeletingImages } = useDeleteImages();
  const { mutateAsync: uploadImages } = useUploadImages();
  const categoryOptions = categoriesData?.data.data.map(({ name, id }) => ({
    label: name,
    value: String(id),
  }));
  const { mutateAsync: updateProduct, isPending: isUpdatingProduct } =
    useUpdateProductDetails(productId);

  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      variants: [],
      ...defaultValues,
    },
  });

  async function onSubmit(values: z.infer<typeof editFormSchema>) {
    const { variants, categories, ...data } = values;

    const { status } = await updateProduct({
      ...data,
      categories: (categories || []).map((c) => Number(c)),
    });
    if (status !== 200) return;

    const imagesData = prepareProductImages({
      productId,
      variants: values.variants || [],
    });
    Promise.all(imagesData.map((imgData) => uploadImages(imgData))).then(() => {
      navigate({
        to: '/products/$id/view',
        params: { id: productId } as never,
      });
    });
    if (deletedImagesIds.current.length) {
      deleteImages(deletedImagesIds.current);
    }
    navigate({ to: '/products/$id/view', params: { id: productId } as never });
  }

  const totalStock = (form.getValues('variants') || []).reduce(
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
          <h1 className="heading">{t('EditProductPage.title')}</h1>
          <Button
            type="submit"
            disabled={isUpdatingProduct || isDeletingImages}
          >
            {isUpdatingProduct || isDeletingImages ? (
              t('Global.saving')
            ) : (
              <>
                <Save />
                {t('CreateProductPage.saveProductButton')}
              </>
            )}
          </Button>
        </div>
        <EditProductDetailsForm form={form} categoryOptions={categoryOptions} />
        <EditVariantsForm
          form={form}
          onRemoveImage={(imageId) => {
            deletedImagesIds.current.push(imageId);
          }}
        />

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
};

export default EditProductForm;
