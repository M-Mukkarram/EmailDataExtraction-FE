import { cn } from '@/utils/helpers/tailwind.helper';
import { HTMLAttributes } from 'react';

export interface SPLabelProps extends HTMLAttributes<HTMLDivElement> {
  showAsterik?: boolean;
}

/**
 * A reusable component for displaying labels in the application.
 *
 * @param props - The props for the SPLabel component.
 * @param props.children - The children elements to be rendered inside the label.
 * @param props.className - The CSS class name(s) to be applied to the label.
 * @param props.showAsterik - A flag indicating whether to show an asterisk after the label.
 * @param props.rest - Additional props to be spread onto the label element.
 *
 * @returns - A React element representing the SPLabel component.
 */

export default function SPLabel({
  children,
  className,
  ...props
}: SPLabelProps) {
  return (
    <div className={cn('select-none', className)} {...props}>
      {children}
    </div>
  );
}
