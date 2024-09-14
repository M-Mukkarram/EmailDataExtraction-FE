import { cn } from '@/utils/helpers/tailwind.helper';
import { Layout, LayoutProps } from 'antd';

export interface SPHeaderProps extends LayoutProps {}

/**
 * A functional component representing the header of a specific layout.
 *
 * @remarks
 * This component is designed to be used within the Ant Design Layout component.
 * It accepts all the properties of the Ant Design Layout.Header component.
 *
 * @param props - The properties of the SPHeader component.
 * @param props.className - The CSS class name to be applied to the Ant Design Layout.Header component.
 * @param props.[...props] - Any additional properties to be spread onto the Ant Design Layout.Header component.
 *
 * @returns - A functional component representing the header of a specific layout.
 *
 * @example
 * ```tsx
 * import { Layout } from 'antd';
 * import SPHeader from './SPHeader';
 *
 * function MyComponent() {
 *   return (
 *     <Layout>
 *       <SPHeader className="my-header-class" />
 *     </Layout>
 *   );
 * }
 * ```
 */

export default function SPHeader({ className, ...props }: SPHeaderProps) {
  const { Header } = Layout;

  return <Header className={cn(className)} {...props} />;
}
