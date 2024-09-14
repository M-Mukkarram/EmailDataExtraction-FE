import Sider, { SiderProps } from 'antd/es/layout/Sider';

export interface SPSiderProps extends SiderProps {}

/**
 * A custom Sider component for a Single Page Application (SPA).
 * This component wraps the Ant Design Sider component and adds additional functionality.
 *
 * @param props - The properties for the SPSider component.
 * @param props.children - The child elements to be rendered inside the Sider.
 * @param props.otherProps - Any additional properties to be passed to the Ant Design Sider component.
 *
 * @returns - A React component that renders the custom Sider.
 */

export default function SPSider({ children, ...props }: SPSiderProps) {
  return <Sider {...props}>{children}</Sider>;
}
