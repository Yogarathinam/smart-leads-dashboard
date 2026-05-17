import type { PropsWithChildren } from 'react';

interface BadgeProps extends PropsWithChildren {
  color?: 'gray' | 'blue' | 'green' | 'red' | 'amber';
}

const colorMap = {
  gray: 'bg-slate-100 text-slate-700',
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-emerald-100 text-emerald-700',
  red: 'bg-rose-100 text-rose-700',
  amber: 'bg-amber-100 text-amber-700',
};

export const Badge = ({ children, color = 'gray' }: BadgeProps) => {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${colorMap[color]}`}>
      {children}
    </span>
  );
};