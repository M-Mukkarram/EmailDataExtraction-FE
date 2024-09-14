import { cn } from '@/utils/helpers/tailwind.helper';
import { Button, ButtonProps } from 'antd';

export interface SPButtonProps extends ButtonProps {}

/**
 * A custom button component with additional styling and props.
 *
 * @remarks
 * This component is a wrapper around the Ant Design Button component,
 * providing additional styling and props.
 *
 * @example
 * ```tsx
 * <SPButton type="primary">Submit</SPButton>
 * ```
 *
 * @param props - The props for the SPButton component.
 * @param props.children - The children elements to be rendered inside the button.
 * @param props.className - The CSS class name(s) to be applied to the button.
 * @param props.rest - The rest of the props to be passed to the Ant Design Button component.
 *
 * @returns - A React component that renders a custom button with the specified props.
 */

export default function SPButton({
  children,
  className,
  ...props
}: SPButtonProps) {
  return (
    <Button
      className={cn('flex items-center justify-center shadow-none', className)}
      {...props}
    >
      {children}
    </Button>
  );
}
