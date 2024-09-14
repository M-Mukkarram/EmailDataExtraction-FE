import { Input, InputNumber, InputNumberProps, InputProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { cn } from '@/utils/helpers/tailwind.helper';

export interface SPInputProps extends InputProps {}
export interface SPInputNumber extends InputNumberProps {}

export default function SPInput({ className, ...props }: SPInputProps) {
  return <Input className={cn(className)} {...props} />;
}

SPInput.Password = ({ ...props }: SPInputProps) => {
  return <Input.Password {...props} />;
};

SPInput.Search = ({ className, ...props }: InputProps) => {
  return (
    <Input className={cn(className)} {...props} suffix={<SearchOutlined />} />
  );
};

SPInput.Number = ({ className, suffix, ...props }: SPInputNumber) => {
  return (
    <InputNumber
      className={cn(
        '!w-full !flex-1 [&_.ant-input-number-input]:h-[50px] [&_.ant-input-number-input]:px-5',
        className,
        {
          '[&_.ant-input-number-input]:!pl-[10px] [&_.ant-input-number-input]:!pr-[30px]':
            suffix,
        }
      )}
      suffix={suffix}
      {...props}
    />
  );
};
