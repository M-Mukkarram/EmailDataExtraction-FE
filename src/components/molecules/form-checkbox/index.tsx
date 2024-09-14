import SPCheckbox, { SPCheckboxProps } from '@/components/atoms/sp-checkbox';
import { Form, FormItemProps } from 'antd';

export interface FormCheckboxProps extends SPCheckboxProps {
  name: FormItemProps['name'];
  rules?: FormItemProps['rules'];
}

export default function FormCheckbox({
  name,
  rules,
  ...props
}: FormCheckboxProps) {
  return (
    <Form.Item name={name} valuePropName="checked" rules={rules}>
      <SPCheckbox {...props} />
    </Form.Item>
  );
}
