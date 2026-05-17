import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = ({ label, error, className = '', ...props }: InputProps) => {
  return (
    <label className="flex w-full flex-col gap-1">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        className={`rounded-lg border border-slate-300 px-3 py-2 outline-none ring-0 transition focus:border-teal-600 ${className}`}
        {...props}
      />
      {error ? <span className="text-sm text-rose-600">{error}</span> : null}
    </label>
  );
};
