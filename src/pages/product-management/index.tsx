/* eslint-disable @typescript-eslint/no-explicit-any */

import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

import { IQuotation } from '@/types/quotations.type';
import { QUERY_STRING } from '@/utils/constants/query.constant';
import { formatDate } from '@/utils/helpers/general.helper';

import DashboardPage from '@/components/layouts/dashboard-page';
import ControlBar from '@/components/molecules/control-bar';
import useQuotation from './container/useQuotation';
import useQueryString from '@/hooks/useQueryString';
import SPTable from '@/components/atoms/sp-table';
import SelectSearch from '@/components/molecules/select-search';
import SPButton from '@/components/atoms/sp-button';
import FormLabelInput from '@/components/molecules/form-label-input';
import QuotedProductsMenu from './components/QuotedProductsMenu';
import { RightArrowIcon } from '@/assets/svgs';

export default function ProductManagement() {
  const navigate = useNavigate();
  const { setQuery, removeQuery } = useQueryString();
  const {
    debouncedSearch,
    emailContentResponse,
    isLoading,
    form,
    onSubmit,
    onClear,
    supplierNames,
    locations,
  } = useQuotation();

  const columns = [
    {
      title: 'ID',
      render: (data: IQuotation) => {
        return <p>{data?.id ?? 'N/A'}</p>;
      },
    },
    {
      title: 'Quotation',
      render: (data: IQuotation) => {
        return <p>{data?.quotation ?? 'N/A'}</p>;
      },
    },
    // {
    //   title: 'Product Description',
    //   render: (data: IQuotation) => {
    //     return <p>{data?.productDescription ?? 'N/A'}</p>;
    //   },
    // },

    // {
    //   title: 'Availability',
    //   render: (data: IQuotation) => {
    //     return <p>{data?.availability ?? 'N/A'}</p>;
    //   },
    // },
    // {
    //   title: 'Available Quantity',
    //   render: (data: IQuotation) => {
    //     return <p>{data?.availableQuantity ?? 'N/A'}</p>;
    //   },
    // },

    // {
    //   title: 'Unit Price',
    //   render: (data: IQuotation) => {
    //     return <p>{data?.unitPrice ?? 'N/A'}</p>;
    //   },
    // },
    {
      title: 'Supplier Name',
      render: (data: IQuotation) => {
        return <p>{data?.supplierName ?? 'N/A'}</p>;
      },
    },
    {
      title: 'Location',
      render: (data: IQuotation) => {
        return <p>{data?.location ?? 'N/A'}</p>;
      },
    },
    {
      title: 'Email Received',
      render: (data: IQuotation) => {
        return (
          <p>
            {data?.emailReceivedAt ? formatDate(data?.emailReceivedAt) : 'N/A'}
          </p>
        );
      },
    },
    {
      title: 'Location',
      render: (data: IQuotation) => {
        return <p>{data?.location ?? 'N/A'}</p>;
      },
    },

    {
      title: '',
      render: (data: IQuotation) => (
        <QuotedProductsMenu quotationId={data?.id} />
      ),
    },

    {
      title: '',
      render: (data: IQuotation) => (
        <div
          className="cursor-pointer"
          onClick={() => {
            navigate(`/quotation/view/${data?.id}`, {
              state: {
                data: data,
              },
            });
          }}
        >
          <RightArrowIcon className="h-6 w-6" />
        </div>
      ),
    },
  ];

  return (
    <DashboardPage heading={'Quotations'} className="space-y-3">
      <ControlBar onSearch={(e) => debouncedSearch(e.target.value)} />

      <Form
        scrollToFirstError={{ behavior: 'smooth' }}
        form={form}
        onFinish={onSubmit}
      >
        <div className="flex flex-row items-center gap-x-2">
          <SelectSearch
            mode="tags"
            filterOption={false}
            maxTagCount={2}
            maxTagTextLength={10}
            name="supplierNames"
            key={_.uniqueId('supplier_names')}
            defaultValue={supplierNames}
            url="/quotation/all-available-suppliers"
            queryKey={['quotation', 'all-available-suppliers']}
            label=""
            placeholder="Supplier Names"
            allowClear
            onClear={() => {
              removeQuery([QUERY_STRING.OTHER_PARAMS.FILTERS.SUPPLIER_NAMES]);
            }}
          />

          <SelectSearch
            mode="tags"
            filterOption={false}
            maxTagCount={2}
            maxTagTextLength={10}
            name="locations"
            key={_.uniqueId('supplier_names')}
            defaultValue={locations}
            url="/quotation/all-available-locations"
            queryKey={['quotation', 'all-available-locations']}
            label=""
            placeholder="Locations"
            allowClear
            onClear={() => {
              removeQuery([QUERY_STRING.OTHER_PARAMS.FILTERS.LOCATIONS]);
            }}
          />

          <FormLabelInput.DatePicker
            // defaultValue={dayjs(startDate)}
            name="startDate"
            label=""
            placeholder={'Start Date'}
            allowClear={false}
          />

          <FormLabelInput.DatePicker
            // defaultValue={dayjs(endDate)}
            name="endDate"
            label=""
            placeholder={'Start Date'}
            allowClear={false}
          />
        </div>
        <div className="my-2 flex flex-row items-center justify-end gap-5 px-3">
          <SPButton type="primary" className="w-28" htmlType="submit">
            <p>Apply</p>
          </SPButton>
          <SPButton
            type="text"
            className="w-14"
            onClick={onClear}
            htmlType="button"
          >
            <p className="font-bold text-primary">Clear</p>
          </SPButton>
        </div>
      </Form>

      <SPTable
        dataSource={emailContentResponse?.data ?? []}
        columns={columns as any}
        rowKey={(record: IQuotation) => record?.id}
        // onRow={(record: IQuotation) => {
        //   return {
        //     onClick: () => {
        //       navigate(`/quotation/view/${record?.id}`, {
        //         state: {
        //           data: record,
        //         },
        //       });
        //     },
        //     className: cn({ 'cursor-pointer': true }),
        //   };
        // }}
        loading={isLoading}
        pagination={{
          total: emailContentResponse?.totalRecords,
        }}
        scroll={{ x: 300 }}
        onChange={(page) =>
          setQuery({
            [QUERY_STRING.PAGINATION.PAGE]: page.current?.toString() ?? '1',
          })
        }
        footer={() => (
          <p className="text-gray-400">
            Total {emailContentResponse?.totalRecords ?? 0} Items
          </p>
        )}
      />
    </DashboardPage>
  );
}
