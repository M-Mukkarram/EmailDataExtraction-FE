import { cn } from '@/utils/helpers/tailwind.helper';
import { HTMLAttributes } from 'react';

export interface SPHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  variant?: '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
}

/**
 * A reusable heading component with customizable styles and variants.
 *
 * @param props - The props for the SPHeading component.
 * @param props.className - Additional CSS classes to apply to the heading.
 * @param props.children - The content of the heading.
 * @param props.variant - The variant of the heading (default is 'xl').
 * @param props.rest - Additional props to pass to the heading element.
 *
 * @returns - A React component representing the heading.
 */

export default function SPHeading({
  className,
  children,
  variant = 'xl',
  ...props
}: SPHeadingProps) {
  return (
    <h1
      className={cn('text-xl text-heading', className, {
        'text-base font-medium': variant === 'xs',
        'text-lg font-medium': variant === 'sm',
        'text-xl font-medium': variant === 'md',
        'text-lg font-semibold': variant === 'lg',
        'text-2xl font-bold': variant === '2xl',
      })}
      {...props}
    >
      {children}
    </h1>
  );
}
