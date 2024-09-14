import _ from 'lodash';
import { QUERY_STRING } from '@/utils/constants/query.constant';
import useQueryString from './useQueryString';

type CallbackFunction = (fullQueryString: Record<string, string>) => void;

interface UseDebouncedSearchProps {
  dynamicQueryString: Record<string, string>;
  callback?: CallbackFunction;
}

export const useDebouncedSearch = () => {
  const { setQuery } = useQueryString();

  // Static base query string included in the hook
  const baseQueryString = {
    [QUERY_STRING.PAGINATION.PAGE]: '1',
  };

  const debouncedSearch = ({
    dynamicQueryString,
    callback,
  }: UseDebouncedSearchProps) => {
    _.debounce(() => {
      // Construct the full query string including both base and dynamic parts
      const fullQueryString = { ...baseQueryString, ...dynamicQueryString };
      console.log('Full search query:', fullQueryString);
      // Invoke the callback with the full query string
      callback?.(fullQueryString);

      setQuery(fullQueryString);
    }, 300);
  };

  return {
    onSearch: debouncedSearch,
  };
};
