import { Layers, Plus } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ColorVariantForm from './color-variant-form';
import type { UseFormReturn } from 'react-hook-form';
import type { ProductFormSchema } from '../types';
import { Button } from '@/components/ui/button';

type Props = {
  form: UseFormReturn<ProductFormSchema>;
};
export function VariantsForm({ form }: Props) {
  const {
    fields: variants,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: 'variants',
  });
  const { t } = useTranslation();
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {t('CreateProductPage.colorVariants.sectionTitle')}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t('CreateProductPage.colorVariants.sectionDescription')}
            </p>
            {form.formState.errors.variants?.root?.type === 'custom' && (
              <p className="text-sm text-destructive">
                {form.formState.errors.variants.root.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {variants.length === 0 ? (
        <NoColorVariants
          onAdd={() => append({ color: '', sizes: [], images: [] })}
        />
      ) : (
        <div className="space-y-4">
          {variants.map((_, index) => (
            <ColorVariantForm
              key={index}
              variantIndex={index}
              onRemove={() => remove(index)}
              form={form}
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
            {t('CreateProductPage.colorVariants.addVariant')}
          </Button>
        </div>
      )}
    </div>
  );
}

const NoColorVariants = ({ onAdd }: { onAdd: () => void }) => {
  const { t } = useTranslation();
  return (
    <div className="rounded-xl border-2 border-dashed border-border bg-card/50 py-12 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
        <Layers className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-1 text-base font-medium text-foreground">
        {t('CreateProductPage.colorVariants.emptyVariants.title')}
      </h3>
      <p className="mb-4 text-sm text-muted-foreground">
        {t('CreateProductPage.colorVariants.emptyVariants.description')}
      </p>
      <Button
        type="button"
        variant="secondary"
        onClick={onAdd}
        className="gap-2"
      >
        <Plus className="h-4 w-4" />
        {t('CreateProductPage.colorVariants.emptyVariants.addFirstVariant')}
      </Button>
    </div>
  );
};
