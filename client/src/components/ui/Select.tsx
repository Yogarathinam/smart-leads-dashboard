import type { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export const Select = ({ label, className = '', ...props }: SelectProps) => {
  return (
    <label className="flex w-full flex-col gap-1">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <select
        className={`rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-600 ${className}`}
        {...props}
      />
    </label>
  );
};