import type { PropsWithChildren } from 'react';

export const Card = ({ children }: PropsWithChildren) => {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-[#0a0c14]/80">
      {children}
    </div>
  );
};