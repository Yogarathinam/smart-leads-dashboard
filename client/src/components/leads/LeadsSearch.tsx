import { Search } from 'lucide-react';

interface LeadsSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const LeadsSearch = ({ value, onChange }: LeadsSearchProps) => {
  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name or email..."
        className="w-full rounded-xl border border-zinc-300 bg-white py-3 pl-10 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-zinc-800 dark:bg-[#09090B] dark:text-zinc-100 dark:placeholder:text-zinc-500"
      />
    </div>
  );
};