import Combobox from '@components/combobox';
import InputFormField from '@components/form-fields/input-form-field';
import TextareaFormField from '@components/form-fields/textarea-form-field';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { Label } from '@ui/label';
import { Package2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { UseFormReturn } from 'react-hook-form';
import type { ProductFormSchema } from '../types';

type Props = {
  form: UseFormReturn<ProductFormSchema>;
};
const ProductDetailsForm = ({ form }: Props) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Package2 className="h-5 w-5 text-primary" />
          </div>
          {t('CreateProductPage.productDetails.sectionTitle')}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-x-2 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
        <InputFormField
          control={form.control}
          name="name"
          label={t('CreateProductPage.productDetails.productName')}
          placeholder={t('CreateProductPage.productDetails.productName')}
        />
        <InputFormField
          control={form.control}
          name="price"
          label={t('CreateProductPage.productDetails.price')}
          placeholder={t('CreateProductPage.productDetails.price')}
          type="number"
          min={1}
        />
        <div className="flex flex-col gap-1">
          <Label htmlFor="price" className="text-sm text-muted-foreground">
            {t('CreateProductPage.productDetails.category')}
          </Label>
          <Combobox
            className="w-full"
            label={t('CreateProductPage.selectCategory')}
            searchPlaceholder={t('ProductsPage.searchForCategoryPlaceholder')}
            defaultValues={
              (form.formState.defaultValues?.categories as never) || []
            }
            onSelect={(values) => {
              form.setValue('categories', values);
              form.trigger('categories');
            }}
            items={[
              {
                value: 'winter',
                label: 'Winter',
              },
              {
                value: 'summer',
                label: 'Summer',
              },
            ]}
          />
          <p className="text-sm text-destructive">
            {form.formState.errors.categories?.message}
          </p>
        </div>
        <div className="col-span-full flex flex-col gap-1">
          <TextareaFormField
            control={form.control}
            name="description"
            label={t('CreateProductPage.productDetails.description')}
            placeholder={t('CreateProductPage.productDetails.description')}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDetailsForm;
