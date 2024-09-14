import { FilterOutlined } from '@ant-design/icons';
import { HTMLAttributes } from 'react';
import { cn } from '@/utils/helpers/tailwind.helper';
import { QUERY_STRING } from '@/utils/constants/query.constant';
import SPTooltip from '@/components/atoms/sp-tooltip';
import SPInput from '@/components/atoms/sp-input';
import useQueryString from '@/hooks/useQueryString';

export interface ControlBarProps {
  className?: HTMLAttributes<HTMLDivElement>['className'];
  onSearch?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  onFilter?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  withFilter?: boolean;
  rightItems?: JSX.Element[];
  defaultSearchValue?: string;
}

export default function ControlBar({
  onFilter,
  onSearch,
  rightItems,
  className,
  defaultSearchValue,
}: ControlBarProps) {
  const { getQuery } = useQueryString();
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-2.5 md:grid-cols-2  md:justify-items-end',
        className
      )}
    >
      {onSearch && (
        <SPInput.Search
          defaultValue={
            defaultSearchValue ??
            getQuery(QUERY_STRING.OTHER_PARAMS.SEARCH) ??
            ''
          }
          onChange={onSearch}
          className="rounded-md py-3 md:w-80 md:justify-self-start"
          placeholder="Search"
        />
      )}

      {onFilter && (
        <SPTooltip>
          <SPInput
            disabled
            className="rounded-md py-3 md:w-56"
            placeholder="Filter"
            onChange={onFilter}
            suffix={<FilterOutlined />}
          />
        </SPTooltip>
      )}

      {rightItems && (
        <div className="flex gap-2">
          {rightItems.map((rightItem) => rightItem)}
        </div>
      )}
    </div>
  );
}
