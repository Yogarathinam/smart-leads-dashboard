import type { PropsWithChildren } from 'react';

interface BadgeProps extends PropsWithChildren {
  color?: 'gray' | 'blue' | 'green' | 'red' | 'amber';
}

const colorMap = {
  gray: 'bg-zinc-800/50 text-zinc-300 border-zinc-700/50',
  blue: 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20 shadow-[0_0_10px_rgba(34,211,238,0.1)]',
  green: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20 shadow-[0_0_10px_rgba(52,211,153,0.1)]',
  red: 'bg-rose-400/10 text-rose-400 border-rose-400/20 shadow-[0_0_10px_rgba(251,113,133,0.1)]',
  amber: 'bg-amber-400/10 text-amber-400 border-amber-400/20 shadow-[0_0_10px_rgba(251,191,36,0.1)]',
};

export const Badge = ({ children, color = 'gray' }: BadgeProps) => {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${colorMap[color]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75 shadow-[0_0_5px_currentColor]"></span>
      {children}
    </span>
  );
};