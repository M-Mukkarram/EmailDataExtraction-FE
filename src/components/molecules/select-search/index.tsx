import { useState } from 'react';
import usePaginatedApi from '@/hooks/usePaginatedApi';
import { debounce } from 'lodash';

import FormLabelInput from '../form-label-input';
import { FormLabelInputSelectProps } from '../form-label-input';
import SPLabel from '@/components/atoms/sp-label';
import { Skeleton } from 'antd';
import LabelInput from '../label-input';

export interface SelectSearchProps extends FormLabelInputSelectProps {
  queryKey: string[];
  query?: { [key: string]: string | number | boolean };
  url: string;
  enabled?: boolean;
  includeAllFields?: boolean;
  labelKey?: { join: string[] } | string[];
  valueKey?: string;
  showSkeleton?: boolean;
  controlled?: boolean;
  removeParam?: string;
  showOnlyWhenDataIsAvailble?: boolean;
}

const SelectSearch = ({
  labelKey,
  includeAllFields,
  query,
  valueKey = 'id',
  queryKey,
  url,
  showSkeleton = false,
  disabled,
  showOnlyWhenDataIsAvailble = false,
  onClear: onSearchClear,
  enabled = true,
  controlled = true,
  ...props
}: SelectSearchProps) => {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const { data, isLoading } = usePaginatedApi<{ data: [] }>({
    key: [...queryKey],
    url: url,
    query: {
      ...(searchValue && { search: searchValue }),
      ...query,
      page: 0,
      limit: 2000,
    },
    options: {
      enabled: !!enabled,
    },
  });

  const selectOptions = data?.data
    ? data.data.map((item) => {
        let label = '';

        if (Array.isArray(labelKey)) {
          // Handle nested keys
          label = labelKey.reduce((acc: string | undefined, key: string) => {
            if (acc && typeof acc === 'object') {
              return acc[key];
            }
            return item[key];
          }, item);
        } else if (typeof labelKey === 'object' && 'join' in labelKey) {
          // Handle join keys
          label = labelKey.join
            .map((key) => item[key])
            .filter(Boolean)
            .join(' ');
        } else if (!labelKey) {
          // Handle single string key
          label = item || '';
        }

        return {
          ...(includeAllFields ? item : {}),
          label,
          value: !labelKey ? label : item[valueKey],
        };
      })
    : [];

  const handleSearch = debounce(async (value: string) => {
    setSearchValue(value);
  }, 500);

  if (isLoading && showSkeleton) {
    return (
      <>
        <SPLabel className="text-base text-sp_gray">{props.label}</SPLabel>
        <Skeleton.Input className="!h-[50px] !w-full !min-w-0" />
      </>
    );
  }

  if (
    showOnlyWhenDataIsAvailble &&
    ((data?.data && data?.data?.length < 1) || isLoading)
  )
    return;

  return controlled ? (
    <FormLabelInput.Select
      showSearch
      loading={isLoading}
      filterOption={false}
      onSearch={handleSearch}
      options={selectOptions}
      onClear={() => {
        setSearchValue(null);
        onSearchClear?.();
      }}
      disabled={!enabled || disabled}
      {...props}
    />
  ) : (
    <LabelInput.Select
      showSearch
      loading={isLoading}
      filterOption={false}
      onSearch={handleSearch}
      options={selectOptions}
      disabled={!enabled || disabled}
      {...props}
    />
  );
};

export default SelectSearch;
