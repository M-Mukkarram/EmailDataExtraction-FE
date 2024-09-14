import { Switch, SwitchProps } from 'antd';

export interface SPSwitchProps extends SwitchProps {
  children?: React.ReactNode;
}

/**
 * A custom Switch component with additional props and type definition.
 *
 * @param props - The props for the SPSwitch component.
 * @param props.children - The children to be rendered inside the Switch.
 * @param props.otherProps - Other props that the Switch component accepts.
 *
 * @returns - A Switch component with the provided props.
 *
 * @example
 * ```
 * <SPSwitch checked={true} onChange={handleSwitchChange}>
 *   Custom Switch
 * </SPSwitch>
 * ```
 */

export default function SPSwitch({ children, ...props }: SPSwitchProps) {
  return <Switch {...props}>{children}</Switch>;
}
