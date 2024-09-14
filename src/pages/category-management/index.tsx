/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import SPTable from '@/components/atoms/sp-table';
import DashboardPage from '@/components/layouts/dashboard-page';
import SPButton from '@/components/atoms/sp-button';
import useGetApi from '@/hooks/useGetApi';
import { API_ROUTES } from '@/utils/constants/api-route.constant';
import useQueryString from '@/hooks/useQueryString';
import { QUERY_STRING } from '@/utils/constants/query.constant';

export default function CategoryManagement() {
  const { setQuery } = useQueryString();
  const { data: categoryResponse, isLoading } = useGetApi<any>({
    key: [['category']],
    url: API_ROUTES.productCategory.createOrRead,
  });

  return (
    <DashboardPage
      heading="Product Categories"
      className="space-y-5"
      actions={[
        <Link to="./create" relative="path">
          <SPButton type="primary" className="h-auto py-2 font-bold">
            <PlusOutlined /> Create Product Category
          </SPButton>
        </Link>,
      ]}
    >
      <SPTable
        dataSource={(categoryResponse?.data as any) ?? []}
        columns={columns}
        rowKey={(record) => record?.id}
        loading={isLoading}
        pagination={{
          total: categoryResponse?.totalRecords,
        }}
        scroll={{ x: 300 }}
        onChange={(page) =>
          setQuery({
            [QUERY_STRING.PAGINATION.PAGE]: page.current?.toString() ?? '1',
          })
        }
        footer={() => (
          <p className="text-gray-400">
            Total {categoryResponse?.totalRecords ?? 0} Items
          </p>
        )}
      />
    </DashboardPage>
  );
}

const columns = [
  {
    title: 'ID',
    dataIndex: ['id'],
  },
  {
    title: 'Name',
    dataIndex: ['name'],
  },
  {
    title: 'Category Description',
    width: 300,
    dataIndex: ['description'],
  },

  {
    title: 'Sub Categories',
    render: (data: any) => {
      return (
        <p>
          {data?.subCategories.length > 0
            ? (data?.subCategories &&
                data?.subCategories.map((i: any) => i?.name).join(', ')) ??
              'N/A'
            : 'N/A'}
        </p>
      );
    },
  },

  {
    title: 'Active',
    render: (data: any) => {
      return <p>{data?.isActive ? 'Yes' : 'No'}</p>;
    },
  },

  // {
  //   title: '',
  //   render: () => (
  //     <Link to={`./view/${6}`}>
  //       <RightArrowIcon className="h-6 w-6" />
  //     </Link>
  //   ),
  // },
];
