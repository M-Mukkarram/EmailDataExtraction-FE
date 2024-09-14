import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import useQueryString from '@/hooks/useQueryString';
import { QUERY_STRING } from '@/utils/constants/query.constant';
import useGetApi from './useGetApi';

interface Props {
  key: string[];
  url: string;
  query?: { [key: string]: string | number | boolean };
  enabled?: boolean;
  options?: Omit<UseQueryOptions, 'queryKey'>;
  pagination?: { take?: number; limit?: number };
  setDefaultLimit?: boolean;
  setDefaultPage?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  count?: number;
  currentPage?: number;
  nextPage?: number;
  lastPage?: number;
  prevPage?: number;
  // Need to re-shift it

  pageSize?: number;
  totalPages?: number;
  pageNumber?: number;
  totalRecords?: number;
}

function usePaginatedApi<T>({
  key,
  url,
  enabled = true,
  options,
  query = {},
  pagination,
  setDefaultLimit = true,
  setDefaultPage = true,
}: Props): UseQueryResult<T> {
  const { getQuery } = useQueryString();

  const limit: string =
    pagination?.limit?.toString() ??
    query?.limit?.toString() ??
    getQuery(QUERY_STRING.PAGINATION.LIMIT) ??
    '10';
  const page: string =
    query?.page?.toString() ??
    pagination?.take?.toString() ??
    getQuery(QUERY_STRING.PAGINATION.PAGE) ??
    '1';

  let apiRoute = url;
  const queryKey = key;
  const queryObj = query;

  if (limit && setDefaultLimit) {
    queryObj.limit = limit;
    queryKey.push(JSON.stringify({ ...queryObj, limit }));
  }

  if (page && setDefaultPage) {
    queryObj.page = page;
    queryKey.push(JSON.stringify({ ...queryObj, page }));
  }
  const queryString = Object.keys(queryObj)
    .map((key) => `${key}=${queryObj[key]}`)
    .join('&');

  if (queryString) {
    apiRoute += `?${queryString}`;
  }

  return useGetApi<T>({
    key: queryKey,
    url: apiRoute,
    enabled,
    ...options,
  });
}

export default usePaginatedApi;
