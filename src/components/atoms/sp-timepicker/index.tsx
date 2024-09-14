import { TimePicker, TimePickerProps } from 'antd';

export interface SPTimePickerProps extends TimePickerProps {}

export default function SPTimePicker({ ...props }: SPTimePickerProps) {
  return <TimePicker {...props} minuteStep={15} use12Hours />;
}
