import { Link, useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import _ from 'lodash';

import SPButton from '@/components/atoms/sp-button';
import DashboardPage from '@/components/layouts/dashboard-page';
import SPTable from '@/components/atoms/sp-table';
import useQueryString from '@/hooks/useQueryString';
import useGetApi from '@/hooks/useGetApi';

import { API_ROUTES } from '@/utils/constants/api-route.constant';
import { PaginatedResponse } from '@/hooks/usePaginatedApi';
import { ISupplier } from '@/types/supplier.type';
import { QUERY_STRING } from '@/utils/constants/query.constant';
import { cn } from '@/utils/helpers/tailwind.helper';

export default function SupplierManagement() {
  const navigate = useNavigate();
  const { setQuery, getQuery } = useQueryString();

  const pageNumber = getQuery(QUERY_STRING.PAGINATION.PAGE) ?? 1;

  const { data: supplierResponse, isLoading } = useGetApi<
    PaginatedResponse<ISupplier>
  >({
    key: _.compact(['supplier', pageNumber]),
    url: API_ROUTES.supplier.createOrRead,
    query: {
      pageSize: 10,
      descending: true,
      pageNumber,
    },
  });

  return (
    <DashboardPage
      heading="Supplier"
      className="space-y-5"
      actions={[
        <Link to="./create" relative="path">
          <SPButton type="primary" className="h-auto py-2 font-bold">
            <PlusOutlined /> Create Supplier
          </SPButton>
        </Link>,
      ]}
    >
      <SPTable
        dataSource={supplierResponse?.data ?? []}
        columns={columns}
        rowKey={(record) => record?.id}
        loading={isLoading}
        pagination={{
          total: supplierResponse?.totalRecords,
        }}
        scroll={{ x: 300 }}
        onRow={(record: ISupplier) => {
          return {
            onClick: () => {
              navigate(`/supplier-management/view/${record?.id}`);
            },
            className: cn({ 'cursor-pointer': true }),
          };
        }}
        onChange={(page) =>
          setQuery({
            [QUERY_STRING.PAGINATION.PAGE]: page.current?.toString() ?? '1',
          })
        }
        footer={() => (
          <p className="text-gray-400">
            Total {supplierResponse?.totalRecords ?? 0} Items
          </p>
        )}
      />
    </DashboardPage>
  );
}

const columns = [
  {
    title: 'ID',
    render: (data: ISupplier) => {
      return <p>{data?.id ?? 'N/A'}</p>;
    },
  },

  {
    title: 'Name',
    render: (data: ISupplier) => {
      return <p>{data?.name ?? 'N/A'}</p>;
    },
  },

  {
    title: 'Details',
    render: (data: ISupplier) => {
      return <p>{data?.details ?? 'N/A'}</p>;
    },
  },
  {
    title: 'Primary Email Address',
    render: (data: ISupplier) => {
      return <p>{data?.emails?.[0]?.email ?? 'N/A'}</p>;
    },
  },
  {
    title: 'Number of Addresses',
    render: (data: ISupplier) => {
      return <p>{data?.addresses.length ?? 'N/A'}</p>;
    },
  },
];
