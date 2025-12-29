import InputFormField from '@components/form-fields/input-form-field';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';
import type { editFormSchema } from '../form-schema';
import { Button } from '@/components/ui/button';

type Props = {
  sizeIndex: number;
  variantIndex: number;
  onRemove: () => void;
  form: UseFormReturn<z.infer<typeof editFormSchema>>;
};

export default function EditStockInputForm({
  sizeIndex,
  variantIndex,
  onRemove,
  form,
}: Props) {
  const { t } = useTranslation();
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
          placeholder={t('ProductDetailsPage.stock')}
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
