import { FormControl, FormField, FormItem, FormMessage } from '@ui/form';
import { Label } from '@ui/label';
import { Textarea } from '@ui/textarea';
import type { Control, FieldValues, Path } from 'react-hook-form';

type TextareaFormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
} & React.ComponentProps<typeof Textarea>;
const TextareaFormField = <T extends FieldValues>({
  control,
  name,
  label,
  ...props
}: TextareaFormFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-1 flex-col gap-2 space-y-0">
          {label && <Label>{label}</Label>}
          <FormControl>
            <Textarea {...props} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextareaFormField;
