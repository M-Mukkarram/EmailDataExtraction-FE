import { cn } from '@/utils/helpers/tailwind.helper';
import { HTMLAttributes } from 'react';

export interface SPContainerProps extends HTMLAttributes<HTMLDivElement> {
  heading?: string;
  headingClassName?: HTMLAttributes<HTMLDivElement>['className'];
}

/**
 * A reusable container component with some predefined styles.
 *
 * @param props - The props for the SPContainer component.
 * @param props.children - The children elements to be rendered inside the container.
 * @param props.className - Additional CSS class names to be applied to the container.
 * @param props.heading - An optional heading to be displayed at the top of the container.
 * @param props.headingClassName - Additional CSS class names to be applied to the heading.
 *
 * @returns - A React component that renders a container with the specified styles and children.
 */

export default function SPContainer({
  children,
  className,
  ...props
}: SPContainerProps) {
  return (
    <div className={cn('rounded-[10px] bg-white p-5', className)} {...props}>
      {children}
    </div>
  );
}
