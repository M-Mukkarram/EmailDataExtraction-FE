import SPContainer from '@/components/atoms/sp-container';
import SPLabel from '@/components/atoms/sp-label';
import { cn } from '@/utils/helpers/tailwind.helper';
import { HTMLAttributes } from 'react';

export interface StatsProps {
  label: string;
  value: string;
}

export interface StatsGroupProps {
  heading: string;
  stats: StatsProps[];
  className?: HTMLAttributes<HTMLDivElement>['className'];
}

export default function Stats({ label, value }: StatsProps) {
  return (
    <SPContainer className="grid grid-cols-1 p-8">
      <SPLabel className="font-medium text-secondary">{label}</SPLabel>
      <SPLabel className="text-lg font-bold text-primary">{value}</SPLabel>
    </SPContainer>
  );
}

/**
 * A component to display a group of statistics.
 *
 * @param heading - The heading of the group.
 * @param stats - An array of StatsProps objects representing the statistics to be displayed.
 * @param className - An optional CSS class name to apply to the container.
 *
 * @returns A React component that renders a group of statistics.
 */

Stats.Group = function StatsGroup({
  heading,
  stats,
  className,
}: StatsGroupProps) {
  return (
    <SPContainer
      className={cn(
        'grid grid-cols-1 gap-6 rounded-lg bg-white p-8 shadow-md',
        className
      )}
    >
      <SPLabel className="mb-4 text-2xl font-semibold text-primary">
        {heading}
      </SPLabel>
      <div className="grid grid-cols-1 gap-4 overflow-x-auto md:grid-cols-2 lg:grid-cols-3">
        {stats?.map((stat, index) => (
          <div className="min-w-max rounded-lg bg-gray-100 p-4" key={index}>
            <SPLabel className="mb-2 text-sm font-medium text-gray-500">
              {stat.label}
            </SPLabel>
            <SPLabel className="ttext-primary text-lg font-bold">
              {stat.value}
            </SPLabel>
          </div>
        ))}
      </div>
    </SPContainer>
  );
};
