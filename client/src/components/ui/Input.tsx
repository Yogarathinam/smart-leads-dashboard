import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = ({ label, error, className = '', ...props }: InputProps) => {
  return (
    <label className="flex w-full flex-col gap-1.5 group">
      <span className={`text-xs font-medium transition-colors ${error ? 'text-rose-400' : 'text-zinc-400 group-focus-within:text-cyan-400'}`}>
        {label}
      </span>
      <input
        className={`rounded-lg bg-[#030407] border px-3 py-2.5 text-sm text-zinc-100 outline-none ring-0 transition-all placeholder-zinc-600 shadow-inner
          ${error 
            ? 'border-rose-500/50 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50' 
            : 'border-zinc-800 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50'
          } ${className}`}
        {...props}
      />
      {error ? (
        <span className="text-[11px] font-medium text-rose-400 mt-1">{error}</span>
      ) : null}
    </label>
  );
};