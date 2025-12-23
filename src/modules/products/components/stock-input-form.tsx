import InputFormField from '@components/form-fields/input-form-field';
import { X } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import type { ProductFormSchema } from '../types';
import { Button } from '@/components/ui/button';

type Props = {
  sizeIndex: number;
  variantIndex: number;
  onRemove: () => void;
  form: UseFormReturn<ProductFormSchema>;
};

export default function StockInputForm({
  sizeIndex,
  variantIndex,
  onRemove,
  form,
}: Props) {
  return (
    <div className="animate-scale-in flex items-start gap-3">
      <div className="flex h-10 w-12 items-center justify-center rounded-lg bg-secondary text-sm font-semibold text-secondary-foreground">
        {form.watch(`variants.${variantIndex}.sizes.${sizeIndex}.value`)}
      </div>
      <div className="relative flex-1 md:max-w-[140px]">
        <InputFormField
          type="number"
          control={form.control}
          name={`variants.${variantIndex}.sizes.${sizeIndex}.stock`}
          className="font-medium"
          placeholder="stock"
        />
      </div>
      <Button
        type="button"
        variant="destructiveSoft"
        className="bg-transparent text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        size="icon-sm"
        onClick={onRemove}
      >
        <X />
      </Button>
    </div>
  );
}
