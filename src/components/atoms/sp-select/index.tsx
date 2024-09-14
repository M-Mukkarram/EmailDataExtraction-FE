import { SelectProps, Select } from 'antd';
import { cn } from '@/utils/helpers/tailwind.helper';

export interface SPSelectProps extends SelectProps {}

export default function SPSelect({ className, ...props }: SPSelectProps) {
  return <Select className={cn('!h-[50px]', className)} {...props} />;
}

SPSelect.Option = Select.Option;
