import { Button } from '@ui/button';
import { useEffect, useState } from 'react';

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
          <CustomCheckbox
            key={size}
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

const CustomCheckbox = ({
  children,
  onChecked,
  checked,
  defaultChecked,
}: {
  children: React.ReactNode;

  onChecked?: (checked: boolean) => void;
  checked?: boolean;
  defaultChecked?: boolean;
}) => {
  const [value, setValue] = useState(checked || defaultChecked || false);
  const toggleCheckbox = () => {
    setValue(!value);
    onChecked?.(!value);
  };
  useEffect(() => {
    if (typeof checked === 'boolean') {
      setValue(checked);
    }
  }, [checked]);
  return (
    <Button
      variant={value ? 'default' : 'secondary'}
      size="sm"
      className="rounded-md"
      onClick={toggleCheckbox}
      type="button"
    >
      {children}
    </Button>
  );
};
