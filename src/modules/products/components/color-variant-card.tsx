import FileUploader from '@components/file-uploader';
import InputFormField from '@components/form-fields/input-form-field';
import { Package, Palette, X } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import SizeSelector from './size-selector';
import SizeStockInput from './size-stock-input';
import type { ProductFormSchema } from '../types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Props = {
  variantIndex: number;
  onRemove: () => void;
};

export default function ColorVariantCard({ variantIndex, onRemove }: Props) {
  const { control } = useFormContext<ProductFormSchema>();
  const {
    fields: sizes,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: `variants.${variantIndex}.sizes`,
  });

  const totalStock = sizes.reduce((sum, s) => sum + s.stock, 0);
  return (
    <Card className="shadow-medium animate-slide-in overflow-hidden border-border/60">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Palette className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Color Variant {variantIndex + 1}
              </span>
              <div className="ms-auto flex items-center gap-4">
                {totalStock > 0 && (
                  <Badge className="gap-1.5">
                    <Package className="h-3 w-3" />
                    {totalStock} total
                  </Badge>
                )}
                <Button
                  type="button"
                  variant="destructiveSoft"
                  size="icon-sm"
                  onClick={onRemove}
                >
                  <X />
                </Button>
              </div>
            </div>
            <InputFormField
              name={`variants.${variantIndex}.color`}
              control={control}
              placeholder="Enter color name (e.g., Red, Navy Blue)"
              className="w-full text-base font-medium"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <FileUploader />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Available Sizes
          </label>
          <SizeSelector
            selectedSizes={sizes.map((s) => s.value)}
            onToggleSize={(size) => {
              const index = sizes.findIndex((s) => s.value === size);
              if (index > -1) {
                removeSize(index);
              } else {
                appendSize({ value: size, stock: undefined as never });
              }
            }}
          />
        </div>

        {sizes.length > 0 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted-foreground">
              Stock per Size
            </label>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {sizes.map((size, sizeIndex) => (
                <SizeStockInput
                  key={size.value}
                  sizeIndex={sizeIndex}
                  variantIndex={variantIndex}
                  onRemove={() => removeSize(sizeIndex)}
                />
              ))}
            </div>
          </div>
        )}

        {sizes.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-border py-6 text-center">
            <p className="text-sm text-muted-foreground">
              Click on sizes above to add stock entries
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
