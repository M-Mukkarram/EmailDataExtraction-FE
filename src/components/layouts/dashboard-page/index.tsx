import ActionHeading from '@/components/molecules/action-heading';
import { cn } from '@/utils/helpers/tailwind.helper';
import { HTMLAttributes, ReactNode } from 'react';

interface DashboardPageProps extends HTMLAttributes<HTMLDivElement> {
  heading: string;
  headingClass?: HTMLAttributes<HTMLDivElement>['className'];
  actions?: JSX.Element[] | ReactNode;
  allowBack?: boolean;
  leftActionChildren?: ReactNode;
  onBack?: () => void;
}
export default function DashboardPage({
  allowBack = false,
  className,
  headingClass,
  leftActionChildren,
  heading,
  actions,
  children,
  onBack,
  ...props
}: DashboardPageProps) {
  return (
    <div
      className={cn(
        'flex h-[calc(100vh-64px)] flex-1 flex-col overflow-auto p-5',
        className
      )}
      {...props}
    >
      <ActionHeading
        heading={heading}
        className={headingClass}
        actions={actions}
        onBack={onBack}
        leftChildren={leftActionChildren}
        allowBack={allowBack}
      />
      {children}
    </div>
  );
}
