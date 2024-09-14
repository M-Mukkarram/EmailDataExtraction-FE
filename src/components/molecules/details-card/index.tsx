import _ from 'lodash';
import { HTMLAttributes, ReactNode } from 'react';
import { Skeleton } from 'antd';

import { cn } from '@/utils/helpers/tailwind.helper';

import SPContainer from '@/components/atoms/sp-container';
import SPHeading from '@/components/atoms/sp-heading';
import SPSplitText from '@/components/atoms/sp-split-text';

export interface DetailCardProps {
  title?: string;
  details: Record<string, string | (() => ReactNode)>;
  className?: HTMLAttributes<HTMLDivElement>['className'];
  splitTextLeftTextclassName?: string;
  splitTextRightTextclassName?: string;
  ignoreStartCase?: boolean;
  horizontal?: boolean;
  loading?: boolean;
}

export interface MultiDetailsProps extends Omit<DetailCardProps, 'details'> {
  multiDetails: {
    title: string;
    details: DetailCardProps['details'];
  }[];
  loading?: boolean;
}

export default function DetailCard({
  title,
  horizontal = false,
  details,
  ignoreStartCase,
  className,
  splitTextLeftTextclassName,
  splitTextRightTextclassName,
  loading = false,
}: DetailCardProps) {
  return (
    <SPContainer className={cn('flex flex-col gap-2.5', className)}>
      {title && (
        <SPHeading variant="sm" className="!font-normal">
          {title}
        </SPHeading>
      )}
      <div
        className={cn('grid grid-cols-1 gap-x-10 gap-y-2.5 md:grid-cols-2', {
          'md:grid-cols-1': !horizontal,
        })}
      >
        {Object.entries(details).map(([key, value]) => (
          <SPSplitText
            leftTextclassName={splitTextLeftTextclassName}
            rightTextclassName={splitTextRightTextclassName}
            key={key}
            leftText={ignoreStartCase ? key : _.startCase(key)}
            rightText={
              loading ? (
                <Skeleton className="md:min-w-[200px]" />
              ) : typeof value === 'function' ? (
                value()
              ) : (
                value
              )
            }
          />
        ))}
      </div>
    </SPContainer>
  );
}

DetailCard.MultiDetails = function ({
  className,
  multiDetails,
  loading = false,
}: MultiDetailsProps) {
  return (
    <SPContainer className={cn('flex flex-col gap-2.5', className)}>
      {multiDetails.map((multiDetail, index) => (
        <div key={index} className="flex flex-col gap-2.5">
          <SPHeading variant="sm">{multiDetail.title}</SPHeading>
          <div className={cn('grid grid-cols-1 gap-x-10 gap-y-2.5')}>
            {Object.entries(multiDetail.details).map(([key, value]) => (
              <SPSplitText
                key={key}
                leftText={_.startCase(key)}
                leftTextclassName="min-w-[150px]"
                rightTextclassName="line-clamp-1"
                rightText={
                  loading ? (
                    <Skeleton className="md:min-w-[200px]" />
                  ) : typeof value === 'function' ? (
                    value()
                  ) : (
                    value
                  )
                }
              />
            ))}
          </div>
        </div>
      ))}
    </SPContainer>
  );
};
