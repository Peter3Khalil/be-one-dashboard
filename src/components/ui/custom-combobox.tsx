import LocalizedText from '@components/localized-text';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import {
  Combobox,
  ComboboxAnchor,
  ComboboxBadgeItem,
  ComboboxBadgeList,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxTrigger,
} from './combobox';
import { Label } from './label';

type Props = {
  options?: Array<{ label: string; value: string }>;
  label?: string;
  placeholder?: string;
  onValueChange?: (values: Array<string>) => void;
  values?: Array<string>;
  defaultValues?: Array<string>;
  noItemsFound?: string;
} & Omit<
  React.ComponentProps<typeof Combobox>,
  'onValueChange' | 'value' | 'defaultValue'
>;
const CustomCombobox = ({
  options = [],
  label = 'Items',
  placeholder,
  onValueChange,
  values,
  defaultValues,
  noItemsFound = 'No items found',
  ...props
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Array<string>>(
    defaultValues || values || []
  );
  return (
    <Combobox
      value={selectedOptions}
      defaultValue={defaultValues}
      onValueChange={(values) => {
        if (Array.isArray(values)) {
          onValueChange?.(values);
          setSelectedOptions(values);
        } else {
          onValueChange?.([values]);
          setSelectedOptions([values]);
        }
      }}
      open={isFocused}
      {...props}
    >
      <Label className="mb-2">{label}</Label>
      <ComboboxAnchor className="h-auto flex-wrap">
        <ComboboxBadgeList>
          {selectedOptions.map((item: string) => {
            const option = options.find((option) => option.value === item);
            if (!option) return null;

            return (
              <ComboboxBadgeItem key={item} value={item}>
                <LocalizedText>{option.label}</LocalizedText>
              </ComboboxBadgeItem>
            );
          })}
        </ComboboxBadgeList>
        <ComboboxInput
          placeholder={placeholder}
          className="h-auto min-w-20 flex-1 pe-6"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <ComboboxTrigger className="absolute end-2 top-3">
          <ChevronDown className="h-4 w-4" />
        </ComboboxTrigger>
      </ComboboxAnchor>
      <ComboboxContent className="max-h-[300px] overflow-x-hidden overflow-y-auto">
        <ComboboxEmpty>{noItemsFound}</ComboboxEmpty>
        {options.map(({ value, label }) => (
          <ComboboxItem key={value} value={value}>
            <LocalizedText>{label}</LocalizedText>
          </ComboboxItem>
        ))}
      </ComboboxContent>
    </Combobox>
  );
};

export default CustomCombobox;
