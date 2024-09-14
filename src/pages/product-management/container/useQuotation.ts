import dayjs from 'dayjs';
import { useForm } from 'antd/es/form/Form';
import _ from 'lodash';
import useGetApi from '@/hooks/useGetApi';
import { PaginatedResponse } from '@/hooks/usePaginatedApi';
import useQueryString from '@/hooks/useQueryString';
import { IQuotation } from '@/types/quotations.type';
import { QUERY_STRING } from '@/utils/constants/query.constant';

interface IFormValues {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  supplierNames: string[] | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  locations: string[] | any;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

export default function useQuotation() {
  const [form] = useForm();
  const { setQuery, getQuery, removeQuery } = useQueryString();

  const pageNumber = getQuery(QUERY_STRING.PAGINATION.PAGE) ?? 1;
  const keyword = getQuery(QUERY_STRING.OTHER_PARAMS.SEARCH);
  const supplierNames = getQuery(
    QUERY_STRING.OTHER_PARAMS.FILTERS.SUPPLIER_NAMES
  );
  const locations = getQuery(QUERY_STRING.OTHER_PARAMS.FILTERS.LOCATIONS);
  const startDate = getQuery(QUERY_STRING.OTHER_PARAMS.FILTERS.START_DATE);
  const endDate = getQuery(QUERY_STRING.OTHER_PARAMS.FILTERS.END_DATE);

  const { data: emailContentResponse, isLoading } = useGetApi<
    PaginatedResponse<IQuotation>
  >({
    key: _.compact([
      'quotation',
      pageNumber,
      keyword,
      supplierNames,
      locations,
      startDate,
      endDate,
    ]),
    url: `/quotation`,
    query: {
      pageSize: 10,
      sortProperties: 'emailReceivedAt',
      descending: true,
      pageNumber,
      ...(keyword && { keyword }),
      ...(supplierNames && { supplierNames }),
      ...(locations && { locations }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    },
  });

  const debouncedSearch = _.debounce((value) => {
    setQuery({
      [QUERY_STRING.OTHER_PARAMS.SEARCH]: value || '',
      [QUERY_STRING.PAGINATION.PAGE]: '1',
    });
  }, 300);

  function onSubmit(values: IFormValues) {
    if (values?.supplierNames) {
      setQuery({
        [QUERY_STRING.OTHER_PARAMS.FILTERS.SUPPLIER_NAMES]:
          values?.supplierNames,
      });
    }

    if (values?.locations) {
      setQuery({
        [QUERY_STRING.OTHER_PARAMS.FILTERS.LOCATIONS]: values?.locations,
      });
    }

    if (values?.startDate || values?.endDate) {
      setQuery({
        [QUERY_STRING.OTHER_PARAMS.FILTERS.START_DATE]: String(
          values?.startDate
            ? values?.startDate.valueOf()
            : dayjs().startOf('day').valueOf()
        ),
      });
    }

    if (values?.endDate || values?.startDate) {
      setQuery({
        [QUERY_STRING.OTHER_PARAMS.FILTERS.END_DATE]: String(
          values?.endDate
            ? values?.endDate.valueOf()
            : dayjs().endOf('day').valueOf()
        ),
      });
    }
  }

  function onClear() {
    setQuery({
      [QUERY_STRING.OTHER_PARAMS.SEARCH]: '',
      [QUERY_STRING.PAGINATION.PAGE]: '1',
    });

    removeQuery([
      QUERY_STRING.OTHER_PARAMS.FILTERS.SUPPLIER_NAMES,
      QUERY_STRING.OTHER_PARAMS.FILTERS.LOCATIONS,
      QUERY_STRING.OTHER_PARAMS.FILTERS.START_DATE,
      QUERY_STRING.OTHER_PARAMS.FILTERS.END_DATE,
    ]);
    form.resetFields();
  }
  return {
    debouncedSearch,
    emailContentResponse,
    isLoading,
    form,
    onSubmit,
    onClear,
    supplierNames,
    locations,
    startDate,
    endDate,
  };
}
