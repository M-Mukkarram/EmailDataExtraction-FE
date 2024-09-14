/* eslint-disable @typescript-eslint/no-explicit-any */

import { Menu } from 'antd';
import SPButton from '@/components/atoms/sp-button';
import SPDropdown from '@/components/atoms/sp-dropdown';
import SPMenu from '@/components/atoms/sp-menu';
import SPTable from '@/components/atoms/sp-table';
import useGetApi from '@/hooks/useGetApi';
import { IQuotationDetails } from '@/types/quotations.type';

export default function QuotedProductsMenu({
  quotationId,
}: {
  quotationId: number;
}) {
  const { data: quotationDetails, isLoading } = useGetApi<IQuotationDetails>({
    key: ['quotation', quotationId!],
    url: `/quotation/${quotationId}`,
  });

  const menu = (
    <SPMenu>
      <Menu.Item>
        <SPTable
          columns={columns}
          dataSource={quotationDetails?.quotedProducts ?? []}
          pagination={false}
          size="small"
        />
      </Menu.Item>
    </SPMenu>
  );

  return (
    <SPDropdown overlay={menu} trigger={['click']}>
      <SPButton loading={isLoading}>See Quoted Products</SPButton>
    </SPDropdown>
  );
}

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  {
    title: 'Product',
    render: (data: any) => {
      return <p>{data?.product ?? 'N/A'}</p>;
    },
  },
  {
    title: 'Product Description',
    render: (data: any) => {
      return <p>{data?.productDescription ?? 'N/A'}</p>;
    },
  },
  {
    title: 'Availability',
    render: (data: any) => {
      return <p>{data?.availability ?? 'N/A'}</p>;
    },
  },
  {
    title: 'Available Quantity',
    render: (data: any) => {
      return <p>{data?.availableQuantity ?? 'N/A'}</p>;
    },
  },

  {
    title: 'Unit Price',
    render: (data: any) => {
      return <p>{data?.unitPrice ?? 'N/A'}</p>;
    },
  },
  {
    title: 'Freight Permitted',
    render: (data: any) => {
      return <p>{Boolean(data?.isFreightPermitted) ?? 'N/A'}</p>;
    },
  },
];
