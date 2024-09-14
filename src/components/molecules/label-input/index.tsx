import SPInput, {
  SPInputNumber,
  SPInputProps,
} from '@/components/atoms/sp-input';
import SPLabel, { SPLabelProps } from '@/components/atoms/sp-label';
import SPSelect, { SPSelectProps } from '@/components/atoms/sp-select';
import SPDatePicker, {
  SPDatePickerProps,
} from '@/components/atoms/sp-datepicker';
import SPTextArea from '@/components/atoms/sp-textarea';
import { TextAreaProps } from 'antd/es/input';
import SPDateRangePicker, {
  SPDateRangePickerProps,
} from '@/components/atoms/sp-date-rangepicker';
import { cn } from '@/utils/helpers/tailwind.helper';

export interface LabelInputProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  labelProps?: SPLabelProps;
  inputProps?: SPInputProps;
  disabled?: boolean;
}

export interface LabelInputSelectProps extends SPSelectProps {
  label: string;
  labelProps?: SPLabelProps;
  inputProps?: SPInputProps;
}

export interface LabelInputDatePickerProps extends SPDatePickerProps {
  label: string;
  labelProps?: SPLabelProps;
  inputProps?: SPInputProps;
  allowClear?: boolean;
}

export interface LabelInputDateRangePickerProps extends SPDateRangePickerProps {
  label: string;
  labelProps?: SPLabelProps;
  inputProps?: SPInputProps;
  allowClear?: boolean;
}

export interface LabelTextAreaProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  labelProps?: SPLabelProps;
  textAreaProps?: TextAreaProps;
}

export interface LabelInputNumberProps {
  label: string;
  labelProps?: SPLabelProps;
  inputProps?: SPInputNumber;
  className?: string;
}

export default function LabelInput({
  label,
  labelProps,
  inputProps,
  className,
  disabled,
  ...props
}: LabelInputProps) {
  return (
    <div className={cn('flex flex-1 flex-col gap-2', className)} {...props}>
      <SPLabel
        className={cn('text-base text-[#444444]', labelProps?.className, {
          'text-sp_gray': disabled,
        })}
        {...labelProps}
      >
        {label}
      </SPLabel>
      <SPInput
        className={cn(
          'h-[50px] px-5 text-text_secondary',
          inputProps?.className
        )}
        disabled={disabled}
        {...inputProps}
      />
    </div>
  );
}

LabelInput.Password = ({
  label,
  labelProps,
  inputProps,
  className,
  ...props
}: LabelInputProps) => {
  return (
    <div className={cn('flex flex-1 flex-col gap-2', className)} {...props}>
      <SPLabel
        className={cn('text-base text-[#444444]', labelProps?.className)}
        {...labelProps}
      >
        {label}
      </SPLabel>
      <SPInput.Password
        className={cn(
          'h-[50px] px-5 text-text_secondary',
          inputProps?.className
        )}
        {...inputProps}
      />
    </div>
  );
};

LabelInput.Select = ({
  label,
  labelProps,
  options,
  className,
  placeholder,
  ...props
}: LabelInputSelectProps) => {
  return (
    <div className={cn('flex flex-1 flex-col gap-2', className)}>
      <SPLabel
        className={cn('text-base text-[#444444]', labelProps?.className)}
        {...labelProps}
      >
        {label}
      </SPLabel>
      <SPSelect
        className={cn('h-auto [&_.ant-select-selector]:h-12 ')}
        options={options}
        {...props}
        placeholder={placeholder}
        style={{
          color: 'yellow',
        }}
      />
    </div>
  );
};

LabelInput.Textarea = ({
  label,
  labelProps,
  textAreaProps,
  className,
}: LabelTextAreaProps) => {
  return (
    <div className={cn('flex flex-1 flex-col gap-2', className)}>
      <SPLabel
        className={cn('text-base text-[#444444]', labelProps?.className)}
        {...labelProps}
      >
        {label}
      </SPLabel>
      <SPTextArea className="h-auto" {...textAreaProps} />
    </div>
  );
};

LabelInput.DatePicker = ({
  label,
  labelProps,
  inputProps,
  className,
  allowClear = false,
  ...props
}: LabelInputDatePickerProps) => {
  return (
    <div className={cn('flex flex-1 flex-col gap-2', className)}>
      <SPLabel
        className={cn('text-base text-[#444444]', labelProps?.className)}
        {...labelProps}
      >
        {label}
      </SPLabel>
      <SPDatePicker
        className={cn('py-3.5 text-text_secondary', inputProps?.className)}
        allowClear={allowClear}
        {...props}
      />
    </div>
  );
};

LabelInput.DateRangePicker = ({
  label,
  labelProps,
  inputProps,
  className,
  allowClear = false,
  ...props
}: LabelInputDateRangePickerProps) => {
  return (
    <div className={cn('flex flex-1 flex-col gap-2', className)}>
      <SPLabel
        className={cn('text-base text-[#444444]', labelProps?.className)}
        {...labelProps}
      >
        {label}
      </SPLabel>
      <SPDateRangePicker
        className={cn('py-3.5 text-text_secondary', inputProps?.className)}
        allowClear={allowClear}
        {...props}
      />
    </div>
  );
};

LabelInput.Number = ({
  label,
  labelProps,
  className,
  inputProps,
}: LabelInputNumberProps) => {
  return (
    <div className={cn('flex flex-1 flex-col gap-2', className)}>
      <SPLabel
        className={cn('text-base text-[#444444]', labelProps?.className)}
        {...labelProps}
      >
        {label}
      </SPLabel>
      <SPInput.Number
        className={cn('py-3.5 text-text_secondary', inputProps?.className)}
        {...inputProps}
        precision={2}
        controls={false}
      />
    </div>
  );
};
