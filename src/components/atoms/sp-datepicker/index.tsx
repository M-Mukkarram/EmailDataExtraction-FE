import { cn } from '@/utils/helpers/tailwind.helper';
import { DatePicker, DatePickerProps } from 'antd';

export interface SPDatePickerProps extends DatePickerProps {}

export default function SPDatePicker({
  className,
  ...props
}: SPDatePickerProps) {
  return <DatePicker className={cn(className)} {...props} />;
}
