import SPButton, { SPButtonProps } from '@/components/atoms/sp-button';
import { cn } from '@/utils/helpers/tailwind.helper';

export interface ActionButtonProps extends SPButtonProps {}

export default function ActionButton({
  className,
  ...props
}: ActionButtonProps) {
  return (
    <SPButton
      className={cn('flex h-auto min-w-[150px] justify-center py-3', className)}
      {...props}
    />
  );
}
