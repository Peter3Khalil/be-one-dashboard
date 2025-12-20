import { cn } from '@/lib/utils';

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

interface SizeSelectorProps {
  selectedSizes: Array<string>;
  onToggleSize: (size: string) => void;
}

export default function SizeSelector({
  selectedSizes,
  onToggleSize,
}: SizeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {AVAILABLE_SIZES.map((size) => {
        const isSelected = selectedSizes.includes(size);
        return (
          <button
            key={size}
            type="button"
            onClick={() => onToggleSize(size)}
            className={cn(
              'h-9 rounded-lg px-4 text-sm font-medium transition-all duration-200',
              'border-2 hover:scale-105 active:scale-95',
              isSelected
                ? 'shadow-soft border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground'
            )}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
