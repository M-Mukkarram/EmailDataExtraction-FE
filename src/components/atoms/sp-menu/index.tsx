import { Menu, MenuProps } from 'antd';

export interface SPMenuProps extends MenuProps {}

/**
 * A custom Menu component that extends the functionality of the Ant Design Menu component.
 *
 * @remarks
 * This component is used to create a custom menu with additional features or custom styling.
 *
 * @extends MenuProps - The component extends the properties of the Ant Design Menu component.
 *
 * @example
 * ```typescriptreact
 * import { Menu } from 'antd';
 * import SPMenu from './SPMenu';
 *
 * function App() {
 *   return (
 *     <SPMenu mode="horizontal">
 *       <Menu.Item key="1">Nav 1</Menu.Item>
 *       <Menu.Item key="2">Nav 2</Menu.Item>
 *     </SPMenu>
 *   );
 * }
 * ```
 *
 * @param props - The properties of the SPMenu component.
 * @returns - A custom Menu component with the specified properties.
 */

export default function SPMenu({ ...props }: SPMenuProps) {
  return <Menu {...props} />;
}
