import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = ({ label, error, className = '', ...props }: InputProps) => {
  return (
    <label className="block space-y-1.5">
      <span className="block text-sm font-medium text-zinc-600 dark:text-zinc-300">
        {label}
      </span>

      <input
        {...props}
        className={`w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-zinc-800 dark:bg-[#09090B] dark:text-zinc-100 dark:placeholder:text-zinc-500 ${className}`}
      />

      {error ? <p className="text-xs text-rose-500 dark:text-rose-400">{error}</p> : null}
    </label>
  );
};