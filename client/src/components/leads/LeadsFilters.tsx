import { Filter } from 'lucide-react';
import { Select } from '../ui/Select';
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
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
      <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
        <Filter className="h-4 w-4" />
        <span>Filters</span>
      </div>

      <div className="min-w-[160px]">
        <Select
          label="Status"
          value={status}
          onChange={(e) => onStatusChange(e.target.value as LeadStatus | '')}
        >
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="lost">Lost</option>
        </Select>
      </div>

      <div className="min-w-[160px]">
        <Select
          label="Source"
          value={source}
          onChange={(e) => onSourceChange(e.target.value as LeadSource | '')}
        >
          <option value="">All Sources</option>
          <option value="website">Website</option>
          <option value="instagram">Instagram</option>
          <option value="referral">Referral</option>
        </Select>
      </div>

      <div className="min-w-[160px]">
        <Select
          label="Sort"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as 'latest' | 'oldest')}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </Select>
      </div>
    </div>
  );
};