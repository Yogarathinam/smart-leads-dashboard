import type { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export const Select = ({ label, className = '', ...props }: SelectProps) => {
  return (
    <label className="flex w-full flex-col gap-1.5 relative group">
      <span className="text-xs font-medium text-zinc-400 transition-colors group-focus-within:text-cyan-400">
        {label}
      </span>
      <div className="relative">
        <select
          className={`w-full appearance-none rounded-lg bg-[#030407] border border-zinc-800 px-3 py-2.5 text-sm text-zinc-100 outline-none ring-0 transition-all focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 shadow-inner ${className}`}
          {...props}
        />
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-zinc-600 group-focus-within:text-cyan-500/50 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </label>
  );
};