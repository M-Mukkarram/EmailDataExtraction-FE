import { RuleObject } from 'antd/es/form';
import { Form, FormItemProps } from 'antd';
import InputMask from 'react-input-mask';

import SPInput, {
  SPInputNumber,
  SPInputProps,
} from '@/components/atoms/sp-input';
import SPLabel from '@/components/atoms/sp-label';
import SPSelect, { SPSelectProps } from '@/components/atoms/sp-select';
import SPTextArea, { SPTextAreaProps } from '@/components/atoms/sp-textarea';
import SPDatePicker, {
  SPDatePickerProps,
} from '@/components/atoms/sp-datepicker';
import SPTimePicker, {
  SPTimePickerProps,
} from '@/components/atoms/sp-timepicker';
import SPDateRangePicker, {
  SPDateRangePickerProps,
} from '@/components/atoms/sp-date-rangepicker';
import { cn } from '@/utils/helpers/tailwind.helper';

export interface FormLabelInputProps extends SPInputProps {
  label: string;
  rules?: FormItemProps['rules'];
  name: FormItemProps['name'];
  containerClassName?: string;
  formItemProps?: FormItemProps;
  highlight?: boolean;
  masked?: boolean;
  maskingPattern?: string | Array<string>;
}

export interface FormLabelInputSelectProps extends SPSelectProps {
  label: string;
  rules?: FormItemProps['rules'];
  name: FormItemProps['name'];
}

export interface FormLabelInputNumberProps extends SPInputNumber {
  label: string;
  rules?: FormItemProps['rules'];
  labelClassName?: string;
  name: FormItemProps['name'];
  lableTitle?: string;
}

export interface FormLabelDatePickerProps extends SPDatePickerProps {
  label: string;
  rules?: FormItemProps['rules'];
  name: FormItemProps['name'];
}

export interface FormLabelDateRangePickerProps extends SPDateRangePickerProps {
  label: string;
  rules?: FormItemProps['rules'];
  name: FormItemProps['name'];
}

export interface FormLabelTimePickerProps extends SPTimePickerProps {
  label: string;
  rules?: FormItemProps['rules'];
  name: FormItemProps['name'];
}

export interface FormLabelInputPasswordProps extends SPInputProps {
  label: string;
  rules?: FormItemProps['rules'];
  name: FormItemProps['name'];
}

export interface FormLabelInputTextAreaProps extends SPTextAreaProps {
  label: string;
  containerClassName?: string;
  rules?: FormItemProps['rules'];
  name: FormItemProps['name'];
  highlight?: boolean;
}
export default function FormLabelInput({
  name,
  rules,
  className,
  label,
  containerClassName,
  formItemProps,
  highlight = false,
  masked = false,
  maskingPattern,
  ...props
}: FormLabelInputProps) {
  const isRequired = rules && (rules as RuleObject[])?.some((i) => i.required);

  return (
    <div className={cn('flex flex-1 flex-col gap-2', containerClassName)}>
      <SPLabel showAsterik={isRequired} className="text-base text-[#444444]">
        {label}
      </SPLabel>
      <Form.Item name={name} rules={rules} {...formItemProps}>
        {masked ? (
          <InputMask
            className={cn(
              'border-light_grayv1  focus:ring-dark_shade box-border h-[50px] w-full max-w-full rounded-[6px] border border-solid px-5	font-light text-black/90 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-opacity-50',
              {
                'cursor-not-allowed bg-[#f5f5f5] text-[#b8c5da]':
                  props.disabled,
              }
            )}
            mask={
              Array.isArray(maskingPattern)
                ? maskingPattern[0]
                : maskingPattern ?? ''
            }
            disabled={props.disabled}
            // disableUnderline
            maskChar={null}
          ></InputMask>
        ) : (
          <SPInput
            className={cn('h-[50px] px-5', className, {
              'bg-white ring ring-red-400': highlight,
            })}
            {...props}
          />
        )}
      </Form.Item>
    </div>
  );
}

FormLabelInput.Password = ({
  name,
  rules,
  label,
  className,
  ...props
}: FormLabelInputPasswordProps) => {
  const isRequired = rules && (rules as RuleObject[])?.some((i) => i.required);
  return (
    <div className="flex flex-col gap-2">
      <SPLabel showAsterik={isRequired} className="text-base text-sp_gray">
        {label}
      </SPLabel>
      <Form.Item name={name} rules={rules}>
        <SPInput.Password className={cn('h-[50px]', className)} {...props} />
      </Form.Item>
    </div>
  );
};

FormLabelInput.Select = ({
  name,
  rules,
  label,
  className,
  ...props
}: FormLabelInputSelectProps) => {
  const isRequired = rules && (rules as RuleObject[])?.some((i) => i.required);
  return (
    <div className={cn('flex flex-1 flex-col gap-2', className)}>
      {label && (
        <SPLabel showAsterik={isRequired} className="text-base text-sp_gray">
          {label}
        </SPLabel>
      )}
      <Form.Item name={name} rules={rules}>
        <SPSelect
          className={cn('h-[50px] text-text_secondary', className)}
          {...props}
        />
      </Form.Item>
    </div>
  );
};

FormLabelInput.TextArea = ({
  label,
  name,
  containerClassName,
  rules,
  highlight = false,
  ...props
}: FormLabelInputTextAreaProps) => {
  const isRequired = rules && (rules as RuleObject[])?.some((i) => i.required);
  return (
    <div className={cn('flex flex-1 flex-col gap-2', containerClassName)}>
      <SPLabel showAsterik={isRequired} className="text-base text-sp_gray">
        {label}
      </SPLabel>
      <Form.Item name={name} rules={rules}>
        <SPTextArea
          className={cn(props.className, { 'ring ring-red-400': highlight })}
          {...props}
        />
      </Form.Item>
    </div>
  );
};

FormLabelInput.Number = ({
  name,
  rules,
  label,
  className,
  labelClassName,
  lableTitle,
  ...props
}: FormLabelInputNumberProps) => {
  const isRequired = rules && (rules as RuleObject[])?.some((i) => i.required);
  return (
    <div className="flex flex-1 flex-col gap-2">
      <SPLabel
        title={lableTitle}
        showAsterik={isRequired}
        className={cn('text-base text-sp_gray', labelClassName)}
      >
        {label}
      </SPLabel>
      <Form.Item name={name} rules={rules}>
        <SPInput.Number
          className={cn('h-[50px]', className)}
          precision={2}
          {...props}
          controls={false}
        />
      </Form.Item>
    </div>
  );
};

FormLabelInput.DatePicker = ({
  name,
  rules,
  label,
  ...props
}: FormLabelDatePickerProps) => {
  const isRequired = rules && (rules as RuleObject[])?.some((i) => i.required);
  return (
    <div className="flex flex-1 flex-col gap-2">
      <SPLabel showAsterik={isRequired} className="text-base text-sp_gray">
        {label}
      </SPLabel>
      <Form.Item name={name} rules={rules} className="w-full">
        <SPDatePicker typeof="dayjs" className="h-[50px] w-full" {...props} />
      </Form.Item>
    </div>
  );
};

FormLabelInput.DateRangePicker = ({
  name,
  rules,
  label,
  ...props
}: FormLabelDateRangePickerProps) => {
  const isRequired = rules && (rules as RuleObject[])?.some((i) => i.required);
  return (
    <div className="flex flex-1 flex-col gap-2">
      {label && <SPLabel showAsterik={isRequired}>{label}</SPLabel>}
      <Form.Item name={name} rules={rules} className="w-full">
        <SPDateRangePicker className="h-[50px] w-full" {...props} />
      </Form.Item>
    </div>
  );
};

FormLabelInput.TimePicker = ({
  name,
  rules,
  label,
  ...props
}: FormLabelTimePickerProps) => {
  const isRequired = rules && (rules as RuleObject[])?.some((i) => i.required);
  return (
    <div className="flex flex-1 flex-col gap-2">
      <SPLabel showAsterik={isRequired} className="text-base text-sp_gray">
        {label}
      </SPLabel>
      <Form.Item name={name} rules={rules} className="w-full">
        <SPTimePicker
          needConfirm={false}
          use12Hours
          className="h-[50px] w-full"
          {...props}
        />
      </Form.Item>
    </div>
  );
};

export function RequiredAsterik({
  showAsterik,
}: {
  showAsterik: boolean | undefined;
}) {
  if (!showAsterik) return null;

  return <span className="text-cinnabar">*</span>;
}
