import { Package, Palette, X } from 'lucide-react';
import FileUploader from '@components/file-uploader';
import SizeSelector from './size-selector';
import SizeStockInput from './size-stock-input';
import type { ColorVariant } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type Props = {
  variant: ColorVariant;
  index: number;
  onUpdate: (variant: ColorVariant) => void;
  onRemove: () => void;
};

export default function ColorVariantCard({
  variant,
  index,
  onUpdate,
  onRemove,
}: Props) {
  const handleColorChange = (color: string) => {
    onUpdate({ ...variant, color });
  };

  const handleToggleSize = (size: string) => {
    const existingSize = variant.sizes.find((s) => s.value === size);
    if (existingSize) {
      onUpdate({
        ...variant,
        sizes: variant.sizes.filter((s) => s.value !== size),
      });
    } else {
      onUpdate({
        ...variant,
        sizes: [...variant.sizes, { value: size, stock: 0 }],
      });
    }
  };

  const handleStockChange = (sizeValue: string, stock: number) => {
    onUpdate({
      ...variant,
      sizes: variant.sizes.map((s) =>
        s.value === sizeValue ? { ...s, stock } : s
      ),
    });
  };

  const handleRemoveSize = (sizeValue: string) => {
    onUpdate({
      ...variant,
      sizes: variant.sizes.filter((s) => s.value !== sizeValue),
    });
  };

  const totalStock = variant.sizes.reduce((sum, s) => sum + s.stock, 0);
  const selectedSizes = variant.sizes.map((s) => s.value);

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
                Color Variant {index + 1}
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
            <Input
              value={variant.color}
              onChange={(e) => handleColorChange(e.target.value)}
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
            selectedSizes={selectedSizes}
            onToggleSize={handleToggleSize}
          />
        </div>

        {variant.sizes.length > 0 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted-foreground">
              Stock per Size
            </label>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {variant.sizes.map((size) => (
                <SizeStockInput
                  key={size.value}
                  size={size}
                  onStockChange={(stock) =>
                    handleStockChange(size.value, stock)
                  }
                  onRemove={() => handleRemoveSize(size.value)}
                />
              ))}
            </div>
          </div>
        )}

        {variant.sizes.length === 0 && (
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
