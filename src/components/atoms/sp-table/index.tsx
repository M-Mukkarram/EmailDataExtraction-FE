import useQueryString from '@/hooks/useQueryString';
import { cn } from '@/utils/helpers/tailwind.helper';
import { Table, TableProps } from 'antd';

export interface SPTableProps extends TableProps {}

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

export default function SPTable({
  children,
  scroll,
  className,
  ...props
}: SPTableProps) {
  const { getQuery } = useQueryString();

  return (
    <Table
      className={cn(
        'font-normal [&_td]:!text-text_secondary [&_th]:!font-medium [&_th]:!text-secondary',
        className
      )}
      {...props}
      pagination={{
        showSizeChanger: false,
        current: Number(getQuery('_page') ?? 1),
        ...props.pagination,
      }}
      scroll={{ ...scroll, x: scroll?.x ?? 300 }}
    >
      {' '}
      {children}
    </Table>
  );
}
