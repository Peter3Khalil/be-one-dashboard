import FileUploader from '@components/file-uploader';
import InputFormField from '@components/form-fields/input-form-field';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@ui/accordion';
import { ChevronDownIcon, Package, Palette, X } from 'lucide-react';
import { useId } from 'react';
import { useFieldArray } from 'react-hook-form';
import SizeSelector from './size-selector';
import StockInputForm from './stock-input-form';
import type { UseFormReturn } from 'react-hook-form';
import type { ProductFormSchema } from '../types';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Props = {
  variantIndex: number;
  onRemove: () => void;
  form: UseFormReturn<ProductFormSchema>;
};

export default function ColorVariantForm({
  variantIndex,
  onRemove,
  form,
}: Props) {
  const {
    fields: sizes,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control: form.control,
    name: `variants.${variantIndex}.sizes`,
  });

  const totalStock = form
    .watch(`variants.${variantIndex}.sizes`)
    .reduce((sum, s) => sum + (isNaN(+s.stock) ? 0 : +s.stock), 0);
  const id = useId();
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={id}>
        <Card className="shadow-medium animate-slide-in overflow-hidden border-border/60 py-4">
          <CardHeader className="w-full">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <AccordionTrigger>
                    <ChevronDownIcon className="size-5 cursor-pointer text-muted-foreground" />
                  </AccordionTrigger>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Palette className="h-4 w-4 text-primary" />
                  </div>
                  <span
                    className={cn('text-sm font-medium text-muted-foreground', {
                      'text-destructive':
                        form.formState.errors.variants?.[variantIndex],
                    })}
                  >
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
              </div>
            </div>
          </CardHeader>
          <AccordionContent className="pb-0">
            <CardContent className="space-y-6">
              <InputFormField
                name={`variants.${variantIndex}.color`}
                control={form.control}
                placeholder="Enter color name (e.g., Red, Navy Blue)"
                className="w-full text-base font-medium"
              />
              <div className="space-y-2">
                {form.formState.errors.variants?.[variantIndex]?.images && (
                  <p className="text-destructive">
                    {
                      form.formState.errors.variants?.[variantIndex]?.images
                        ?.message
                    }
                  </p>
                )}
                <FileUploader
                  onImagesChange={(images) => {
                    form.setValue(
                      `variants.${variantIndex}.images`,
                      images.map((img) => img.file)
                    );
                    form.trigger(`variants.${variantIndex}.images`);
                  }}
                />
              </div>
              <div className="space-y-2">
                <label
                  className={cn(
                    'block text-sm font-medium text-muted-foreground',
                    {
                      'text-destructive':
                        form.formState.errors.variants?.[variantIndex]?.sizes,
                    }
                  )}
                >
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
                      form.clearErrors(`variants.${variantIndex}.sizes`);
                    }
                  }}
                />
                {form.formState.errors.variants?.[variantIndex]?.sizes && (
                  <p className="text-sm text-destructive">
                    {
                      form.formState.errors.variants?.[variantIndex]?.sizes
                        ?.message
                    }
                  </p>
                )}
              </div>

              {sizes.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-muted-foreground">
                    Stock per Size
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {sizes.map((size, sizeIndex) => (
                      <StockInputForm
                        key={size.value}
                        sizeIndex={sizeIndex}
                        variantIndex={variantIndex}
                        onRemove={() => removeSize(sizeIndex)}
                        form={form}
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
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
}
