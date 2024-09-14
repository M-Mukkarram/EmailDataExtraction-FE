import { cn } from '@/utils/helpers/tailwind.helper';
import { Tooltip } from 'antd';
import { RenderFunction } from 'antd/es/_util/getRenderPropValue';
import { ReactNode } from 'react';

export interface SPTooltipProps {
  title?: ReactNode | RenderFunction;
  children: ReactNode;
  className?: string;
  disabledRouting?: boolean;
}

export default function SPTooltip({
  title = 'This feature is currently under development. We appreciate your patience as we work on improving it.',
  children,
  className,
  disabledRouting = false,
  ...props
}: SPTooltipProps) {
  const effectiveTitle = disabledRouting ? '' : title;
  return (
    <Tooltip
      className={cn('cursor-pointer', className)}
      title={effectiveTitle}
      {...props}
    >
      {children}
    </Tooltip>
  );
}
