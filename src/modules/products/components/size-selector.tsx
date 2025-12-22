import CustomCheckbox from '@ui/custom-checkbox';
import { AVAILABLE_SIZES } from '@/constants';

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
          <CustomCheckbox
            key={size + isSelected}
            checked={isSelected}
            onChecked={() => onToggleSize(size)}
          >
            {size}
          </CustomCheckbox>
        );
      })}
    </div>
  );
}
