import { Search } from 'lucide-react';

interface LeadsSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const LeadsSearch = ({ value, onChange }: LeadsSearchProps) => {
  return (
    <div className="relative group w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-cyan-400 transition-colors">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search leads by name or email..."
        className="w-full bg-[#030407] border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner"
      />
    </div>
  );
};