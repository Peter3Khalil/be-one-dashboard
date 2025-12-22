import Combobox from '@components/combobox';
import InputFormField from '@components/form-fields/input-form-field';
import TextareaFormField from '@components/form-fields/textarea-form-field';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { Label } from '@ui/label';
import { Package2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import type { ProductFormSchema } from '../types';

const ProductDetailsForm = () => {
  const form = useFormContext<ProductFormSchema>();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Package2 className="h-5 w-5 text-primary" />
          </div>
          Product Details
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-x-2 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
        <InputFormField
          control={form.control}
          name="name"
          label="Product Name"
          placeholder="Product Name"
        />
        <InputFormField
          control={form.control}
          name="price"
          label="Price"
          placeholder="Price"
          type="number"
          min={1}
        />
        <div className="flex flex-col gap-1">
          <Label htmlFor="price" className="text-sm text-muted-foreground">
            Category
          </Label>
          <Combobox
            className="w-full"
            label="Select category..."
            searchPlaceholder="Search categories..."
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
            label="Description"
            placeholder="Description"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDetailsForm;
