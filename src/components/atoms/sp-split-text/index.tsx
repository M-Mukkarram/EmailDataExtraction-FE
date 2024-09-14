import { cn } from '@/utils/helpers/tailwind.helper';
import { HTMLAttributes, ReactNode } from 'react';

export interface SplitTextProps {
  leftText: string;
  rightText: string | ReactNode;
  leftTextclassName?: string;
  rightTextclassName?: string;
  className?: HTMLAttributes<HTMLDivElement>['className'];
}

export default function SPSplitText({
  leftText,
  rightText,
  leftTextclassName,
  rightTextclassName,
  className,
}: SplitTextProps) {
  return (
    <div className={cn('flex flex-1 justify-between gap-x-3', className)}>
      <p
        className={cn('text-sm font-medium text-secondary', leftTextclassName)}
      >
        {leftText}
      </p>
      <p
        className={cn(
          'break-words break-all text-sm text-text_secondary',
          rightTextclassName
        )}
      >
        {rightText}
      </p>
    </div>
  );
}
