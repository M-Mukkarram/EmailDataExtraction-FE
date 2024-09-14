import SPHeading, { SPHeadingProps } from '@/components/atoms/sp-heading';
import { cn } from '@/utils/helpers/tailwind.helper';
import { LeftOutlined } from '@ant-design/icons';
import { HTMLAttributes, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export interface ActionHeadingProps {
  className?: HTMLAttributes<HTMLDivElement>['className'];
  heading: string;
  actions?: JSX.Element[] | ReactNode;
  leftChildren?: ReactNode;
  headingVariant?: SPHeadingProps['variant'];
  allowBack?: boolean;
  onBack?: () => void;
}

/**
 * A reusable component for displaying a heading with optional actions and back button.
 *
 * @param props - The props for the ActionHeading component.
 * @returns - A JSX element representing the ActionHeading component.
 */

export default function ActionHeading({
  actions,
  leftChildren,
  className,
  heading,
  headingVariant,
  allowBack,
  onBack,
}: ActionHeadingProps) {
  const navigate = useNavigate();

  function handleBack() {
    if (onBack) {
      return onBack();
    }
    navigate(-1);
  }

  function uuid() {
    return uuidv4();
  }
  return (
    <div
      className={cn(
        'flex items-center justify-between md:min-h-[38px]',
        className
      )}
    >
      {/* Left */}
      <div className="flex items-center gap-2">
        {allowBack && (
          <SPHeading className="cursor-pointer" onClick={handleBack}>
            <LeftOutlined />
          </SPHeading>
        )}
        <SPHeading variant={headingVariant}>{heading}</SPHeading>
        {leftChildren}
      </div>
      {/* Right */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {Array.isArray(actions)
          ? actions.map((action) => <div key={uuid()}>{action}</div>)
          : actions}
      </div>
    </div>
  );
}
