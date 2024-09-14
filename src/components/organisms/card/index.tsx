import SPContainer from '@/components/atoms/sp-container';
import { SPHeadingProps } from '@/components/atoms/sp-heading';
import ActionHeading from '@/components/molecules/action-heading';
import { cn } from '@/utils/helpers/tailwind.helper';
import { ChangeEvent, HTMLAttributes } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  containerclassName?: string;
  heading?: string;
  headingClassName?: HTMLAttributes<HTMLDivElement>['className'];
  headingActions?: JSX.Element[];
  headingVariant?: SPHeadingProps['variant'];
  withControls?: boolean;
  onSearch?: (search: ChangeEvent) => void;
  onFilter?: (filter: ChangeEvent) => void;
}

/**
 * A reusable Card component that wraps its children in a container with specified styles.
 * It can also display a heading with optional actions.
 *
 * @param containerclassName - Additional CSS classes to apply to the container.
 * @param heading - The text to display as the heading.
 * @param headingClassName - Additional CSS classes to apply to the heading.
 * @param headingActions - JSX elements to display as actions in the heading.
 * @param headingVariant - The variant of the heading (e.g., h1, h2, etc.).
 * @param children - The content to display inside the card.
 * @returns - A Card component with the specified properties.
 */

export default function Card({
  containerclassName,
  heading,
  headingClassName,
  headingActions,
  headingVariant,
  children,
}: CardProps) {
  return (
    <SPContainer
      className={cn('m-2 flex flex-col gap-5 shadow-md', containerclassName)}
    >
      {heading && (
        <ActionHeading
          heading={heading}
          headingVariant={headingVariant}
          className={headingClassName}
          actions={headingActions}
        />
      )}
      {children}
    </SPContainer>
  );
}
