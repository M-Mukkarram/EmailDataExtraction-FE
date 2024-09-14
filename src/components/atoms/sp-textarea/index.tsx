import { cn } from '@/utils/helpers/tailwind.helper';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';

export interface SPTextAreaProps extends TextAreaProps {}

const { TextArea } = Input;

export default function SPTextArea({ className, ...props }: SPTextAreaProps) {
  return <TextArea className={cn(className)} {...props} />;
}
