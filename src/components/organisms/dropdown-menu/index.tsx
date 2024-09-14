/* eslint-disable @typescript-eslint/no-explicit-any */

import SPButton from '@/components/atoms/sp-button';
import SPContainer from '@/components/atoms/sp-container';
import ActionHeading from '@/components/molecules/action-heading';
import { cn } from '@/utils/helpers/tailwind.helper';
import { CloseOutlined } from '@ant-design/icons';
import { HTMLAttributes } from 'react';

export interface DropdownMenuProps<T> {
  heading?: string;
  className?: HTMLAttributes<HTMLDivElement>['className'];
  onClose?: () => void;
  data: T[];
  component: (props: T) => JSX.Element;
  headingActions?: any;
}

/**
 * A DropdownMenu component that renders a dropdown menu with customizable options.
 *
 * @template T - The type of data to be displayed in the dropdown menu.
 *
 * @param {DropdownMenuProps<T>} props - The properties for the DropdownMenu component.
 * @param {string} [props.heading] - The heading to be displayed at the top of the dropdown menu.
 * @param {HTMLAttributes<HTMLDivElement>['className']} [props.className] - The CSS class name for the dropdown menu container.
 * @param {() => void} [props.onClose] - A callback function to be executed when the close button is clicked.
 * @param {T[]} props.data - The data to be displayed in the dropdown menu.
 * @param {(props: T) => JSX.Element} props.component - A function that renders a single item in the dropdown menu.
 * @param {any} [props.headingActions] - Additional actions to be displayed in the heading.
 *
 * @returns {JSX.Element} - The rendered DropdownMenu component.
 */

export default function DropdownMenu<T>({
  onClose,
  data,
  heading,
  className,
  component,
  headingActions,
}: DropdownMenuProps<T>) {
  return (
    <SPContainer
      className={cn(
        'flex w-[500px] flex-1 flex-col gap-3 p-8 pt-2 shadow',
        className
      )}
    >
      <div className="self-end">
        {onClose && (
          <SPButton type="text" onClick={onClose}>
            <CloseOutlined className="text-xl" />
          </SPButton>
        )}
      </div>
      {heading && (
        <ActionHeading
          heading={heading}
          headingVariant="lg"
          actions={headingActions}
        />
      )}
      <div className="flex max-h-[400px] flex-col gap-3 overflow-y-auto">
        {data?.map((item) => component(item))}
      </div>
    </SPContainer>
  );
}
