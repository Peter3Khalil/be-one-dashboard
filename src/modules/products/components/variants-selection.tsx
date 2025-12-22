import { Layers, Plus } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import ColorVariantCard from './color-variant-card';
import type { ProductFormSchema } from '../types';
import { Button } from '@/components/ui/button';

export function VariantsSection() {
  const { control } = useFormContext<ProductFormSchema>();
  const {
    fields: variants,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'variants',
  });
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Color Variants
            </h2>
            <p className="text-sm text-muted-foreground">
              Add colors and manage stock for each size
            </p>
          </div>
        </div>
      </div>

      {variants.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-border bg-card/50 py-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <Layers className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-1 text-base font-medium text-foreground">
            No color variants yet
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Add your first color variant to start managing stock
          </p>
          <Button
            type="button"
            variant="secondary"
            onClick={() => append({ color: '', sizes: [], images: [] })}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add First Color
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {variants.map((_, index) => (
            <ColorVariantCard
              key={index}
              variantIndex={index}
              onRemove={() => remove(index)}
            />
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() => append({ color: '', sizes: [], images: [] })}
            className="w-full"
            size="lg"
          >
            <Plus className="h-4 w-4" />
            Add Color
          </Button>
        </div>
      )}
    </div>
  );
}
