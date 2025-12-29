import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import { cn } from '@/lib/utils';
import React, { useId } from 'react';
import type { FC } from 'react';

type CustomSelectProps = React.ComponentProps<typeof Select> &
  React.ComponentProps<typeof SelectContent> & {
    options: Array<{
      label: string;
      value: string;
    }>;
    placeholder: string;
    label?: string;
    className?: string;
  };
const CustomSelect: FC<CustomSelectProps> = ({
  options,
  placeholder,
  className,
  label,
  ...props
}) => {
  const id = useId();
  return (
    <div
      className={cn('flex flex-col gap-1', {
        contents: !label,
      })}
    >
      {label && (
        <label
          className="text-sm font-medium text-muted-foreground"
          htmlFor={id}
        >
          {label}
          {props.required && <span className="text-destructive">*</span>}
        </label>
      )}
      <Select {...props}>
        <SelectTrigger id={id} className={cn('bg-transparent', className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;
