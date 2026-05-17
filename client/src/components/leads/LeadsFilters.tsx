import { Filter } from 'lucide-react';
import type { LeadSource, LeadStatus } from '../../features/leads/leads.types';

interface LeadsFiltersProps {
  status: LeadStatus | '';
  source: LeadSource | '';
  sort: 'latest' | 'oldest';
  onStatusChange: (value: LeadStatus | '') => void;
  onSourceChange: (value: LeadSource | '') => void;
  onSortChange: (value: 'latest' | 'oldest') => void;
}

export const LeadsFilters = ({
  status,
  source,
  sort,
  onStatusChange,
  onSourceChange,
  onSortChange,
}: LeadsFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center w-full relative z-10">
      <div className="flex items-center gap-2 text-zinc-500 px-1 hidden md:flex">
        <Filter className="w-4 h-4" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
        {/* Status Filter */}
        <div className="relative">
          <select
            value={status}
            onChange={(event) => onStatusChange(event.target.value as LeadStatus | '')}
            className="w-full bg-[#030407] border border-zinc-800 rounded-lg py-2 pl-3 pr-8 text-sm text-zinc-300 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 appearance-none transition-colors"
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="lost">Lost</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-zinc-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>

        {/* Source Filter */}
        <div className="relative">
          <select
            value={source}
            onChange={(event) => onSourceChange(event.target.value as LeadSource | '')}
            className="w-full bg-[#030407] border border-zinc-800 rounded-lg py-2 pl-3 pr-8 text-sm text-zinc-300 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 appearance-none transition-colors"
          >
            <option value="">All Sources</option>
            <option value="website">Website</option>
            <option value="instagram">Instagram</option>
            <option value="referral">Referral</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-zinc-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>

        {/* Sort Filter */}
        <div className="relative">
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value as 'latest' | 'oldest')}
            className="w-full bg-[#030407] border border-zinc-800 rounded-lg py-2 pl-3 pr-8 text-sm text-zinc-300 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 appearance-none transition-colors"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-zinc-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>
    </div>
  );
};