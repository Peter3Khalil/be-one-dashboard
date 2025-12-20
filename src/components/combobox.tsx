import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@ui/button';
import { Checkbox } from '@ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import { cn } from '@/lib/utils';

type Props = {
  items?: Array<{ value: string; label: string }>;
  label?: string;
  searchPlaceholder?: string;
  onSelect?: (values: Array<string>) => void;
  defaultValues?: Array<string>;
  className?: string;
};

const Combobox = ({
  items = [],
  label = 'Select items...',
  searchPlaceholder = 'Search items...',
  defaultValues = [],
  className,
  onSelect,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] =
    useState<Array<string>>(defaultValues);
  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className={cn(
            'w-62.5 justify-between text-muted-foreground',
            className
          )}
          role="combobox"
          variant="outline"
        >
          {label}
          <ChevronsUpDown className="ms-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-62.5 p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>No found.</CommandEmpty>
            <CommandGroup>
              {items.map(({ label, value }) => (
                <CommandItem
                  key={value}
                  onSelect={(currentValue) => {
                    const newSelectedValues = selectedValues.includes(
                      currentValue
                    )
                      ? selectedValues.filter((v) => v !== currentValue)
                      : [...selectedValues, currentValue];
                    setSelectedValues(newSelectedValues);
                    onSelect?.(newSelectedValues);
                  }}
                  value={value}
                >
                  <Checkbox
                    checked={selectedValues.includes(value)}
                    className="me-2"
                  />
                  {label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
