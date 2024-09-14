import { cn } from '@/utils/helpers/tailwind.helper';
import { Checkbox, CheckboxProps } from 'antd';

export interface SPCheckboxProps extends CheckboxProps {}

export default function SPCheckbox({
  children,
  className,
  ...props
}: SPCheckboxProps) {
  return (
    <Checkbox className={cn(className)} {...props}>
      {children}
    </Checkbox>
  );
}
