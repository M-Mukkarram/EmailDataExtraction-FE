import { DropDownProps, Dropdown } from 'antd';
import { cn } from '@/utils/helpers/tailwind.helper';

export interface SPDropdownProps extends DropDownProps {}

/**
 * A custom Dropdown component with additional props and styling.
 *
 * @remarks
 * This component wraps the Ant Design Dropdown component and provides additional props and styling.
 *
 * @param props - The props for the SPDropdown component.
 * @param props.className - The CSS class name for the Dropdown component.
 * @param props.children - The children elements to be rendered inside the Dropdown component.
 * @param props.otherProps - Any additional props that will be passed to the Ant Design Dropdown component.
 *
 * @returns - A React component that renders the custom Dropdown component.
 */

export default function SPDropdown({
  className,
  children,
  ...props
}: SPDropdownProps) {
  return (
    <Dropdown className={cn(className)} {...props}>
      {children}
    </Dropdown>
  );
}
