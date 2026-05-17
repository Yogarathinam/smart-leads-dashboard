import type { PropsWithChildren } from 'react';

export const Card = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-[#0a0c14]/80 border border-zinc-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
      {/* Subtle top edge gradient highlight that activates on hover */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/0 group-hover:via-cyan-500/20 to-transparent transition-all duration-500"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};