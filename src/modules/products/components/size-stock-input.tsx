import { X } from 'lucide-react';
import type { SizeStock } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Props = {
  size: SizeStock;
  onStockChange: (stock: number) => void;
  onRemove: () => void;
};

export default function SizeStockInput({
  size,
  onStockChange,
  onRemove,
}: Props) {
  return (
    <div className="animate-scale-in flex items-center gap-3">
      <div className="flex h-10 w-12 items-center justify-center rounded-lg bg-secondary text-sm font-semibold text-secondary-foreground">
        {size.value}
      </div>
      <div className="relative flex-1 md:max-w-[140px]">
        <Input
          type="number"
          min={0}
          value={size.stock === 0 ? '' : size.stock}
          onChange={(e) =>
            onStockChange(Math.max(0, parseInt(e.target.value) || 0))
          }
          className="pe-12 text-center font-medium"
          placeholder="stock"
        />
        <span className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground">
          pcs
        </span>
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
