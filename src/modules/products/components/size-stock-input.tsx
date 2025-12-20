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
      <div className="relative max-w-[120px] flex-1">
        <Input
          type="number"
          min="0"
          value={size.stock}
          onChange={(e) =>
            onStockChange(Math.max(0, parseInt(e.target.value) || 0))
          }
          className="pr-12 text-center font-medium"
          placeholder="0"
        />
        <span className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground">
          pcs
        </span>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
