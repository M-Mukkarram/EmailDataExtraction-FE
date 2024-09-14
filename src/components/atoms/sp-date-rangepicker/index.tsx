import { cn } from '@/utils/helpers/tailwind.helper';
import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';

export interface SPDateRangePickerProps extends RangePickerProps {}

const { RangePicker } = DatePicker;

export default function SPDateRangePicker({ ...props }) {
  return <RangePicker className={cn(props?.className)} {...props} />;
}
