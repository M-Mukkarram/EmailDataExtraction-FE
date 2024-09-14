import SPButton, { SPButtonProps } from '@/components/atoms/sp-button';
import { cn } from '@/utils/helpers/tailwind.helper';

export interface IconButtonProps extends SPButtonProps {
  icon?: React.ReactNode;
}

export default function IconButton({
  type = 'default',
  icon,
  danger,
  className,
  children,
  ...props
}: IconButtonProps) {
  return (
    <SPButton
      {...props}
      type={type}
      className={cn(
        'flex h-auto min-w-28 items-center justify-center gap-1.5 rounded-[5px] border-[0.3px] py-2 font-bold shadow-none',
        {
          'border-none bg-primary text-white': type === 'primary',
          'py-1 font-normal': type === 'text',
          ' border-solid border-light_gray bg-white text-primary':
            type === 'default',
          'border-opacity-0 hover:border-[0.3px] hover:border-solid hover:!border-cinnabar':
            danger,
        },
        className
      )}
    >
      {icon}
      {children}
    </SPButton>
  );
}
