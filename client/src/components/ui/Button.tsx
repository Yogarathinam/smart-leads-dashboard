import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Variant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  variant?: Variant;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-cyan-400 text-zinc-900 hover:bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]',
  secondary: 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 border border-zinc-700/80',
  danger: 'bg-rose-500/90 text-white hover:bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]',
};

export const Button = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};