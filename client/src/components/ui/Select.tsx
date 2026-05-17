import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export const Select = ({ label, className = '', children, ...props }: SelectProps) => {
  return (
    <label className="block space-y-1.5">
      <span className="block text-sm font-medium text-zinc-600 dark:text-zinc-300">
        {label}
      </span>

      <div className="relative">
        <select
          {...props}
          className={`w-full appearance-none rounded-xl border border-zinc-300 bg-white px-4 py-3 pr-10 text-sm text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-zinc-800 dark:bg-[#09090B] dark:text-zinc-100 ${className}`}
        >
          {children}
        </select>

        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
      </div>
    </label>
  );
};