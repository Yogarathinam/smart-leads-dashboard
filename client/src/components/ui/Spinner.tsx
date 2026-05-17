export const Spinner = () => {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
      <div className="relative flex items-center justify-center">
        {/* Subtle background track */}
        <div className="absolute h-10 w-10 rounded-full border-4 border-cyan-500/10" />
        {/* Glowing spinning indicator */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-transparent border-t-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]" />
      </div>
      <p className="text-[10px] font-medium tracking-widest text-cyan-500/70 uppercase animate-pulse">
        Initializing...
      </p>
    </div>
  );
};