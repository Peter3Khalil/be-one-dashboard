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
} from '@ui/combobox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form';
import { ChevronDown } from 'lucide-react';
import { matchSorter } from 'match-sorter';
import { useState } from 'react';
import type { ComponentProps } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { cn } from '@/lib/utils';
import LocalizedText from '@components/localized-text';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  options: Array<{ label: string; value: string }>;
  label?: string;
  placeholder?: string;
  className?: string;
  multiple?: boolean;
  noFoundText?: string;
};

export const ComboboxFormField = <T extends FieldValues>({
  control,
  name,
  options: myOptions,
  label = 'Options',
  placeholder = 'Select item...',
  className,
  multiple = false,
  noFoundText = 'No options found.',
}: Props<T>) => {
  function onFilter(options: Array<string>, inputValue: string) {
    const selectedOptions = myOptions.filter(({ value }) =>
      options.includes(value)
    );
    return matchSorter(selectedOptions, inputValue, {
      keys: ['label', 'value'],
      threshold: matchSorter.rankings.MATCHES,
    }).map(({ value }) => value);
  }
  if (multiple) {
    return (
      <ComboboxMultipleFormField
        control={control}
        name={name}
        options={myOptions}
        label={label}
        onFilter={onFilter}
        placeholder={placeholder}
      />
    );
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Combobox
            value={field.value}
            onValueChange={field.onChange}
            className={cn('w-[400px]', className)}
            onFilter={onFilter}
          >
            <FormControl>
              <ComboboxAnchor>
                <ComboboxInput placeholder={placeholder} />
                <ComboboxTrigger>
                  <ChevronDown className="h-4 w-4" />
                </ComboboxTrigger>
              </ComboboxAnchor>
            </FormControl>
            <ComboboxContent className="max-h-[300px] overflow-x-hidden overflow-y-auto">
              <ComboboxEmpty>{noFoundText}</ComboboxEmpty>
              {myOptions.map(({ value, label }) => (
                <ComboboxItem key={value} value={value}>
                  <LocalizedText>{label}</LocalizedText>
                </ComboboxItem>
              ))}
            </ComboboxContent>
          </Combobox>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type ComboboxFormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  options: Array<{ label: string; value: string }>;
  label?: string;
  placeholder?: string;
  className?: string;
  onFilter: ComponentProps<typeof Combobox>['onFilter'];
  noFoundText?: string;
};

const ComboboxMultipleFormField = <T extends FieldValues>({
  control,
  name,
  options: myOptions,
  label = 'Options',
  placeholder = 'Select item...',
  onFilter,
  noFoundText = 'No options found.',
}: ComboboxFormFieldProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Combobox
            value={field.value}
            onValueChange={field.onChange}
            onFilter={onFilter}
            open={isFocused}
            multiple
          >
            <FormLabel className="mb-2">{label}</FormLabel>
            <ComboboxAnchor className="h-auto flex-wrap">
              <ComboboxBadgeList>
                {field.value?.map((item: string) => {
                  const option = myOptions.find(
                    (option) => option.value === item
                  );
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
              <ComboboxEmpty>{noFoundText}</ComboboxEmpty>
              {myOptions.map(({ value, label }) => (
                <ComboboxItem key={value} value={value}>
                  {label}
                </ComboboxItem>
              ))}
            </ComboboxContent>
          </Combobox>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
