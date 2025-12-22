import { useEffect, useState } from 'react';
import { Button } from './button';

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

export default CustomCheckbox;
