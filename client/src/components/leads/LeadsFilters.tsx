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
    <div className="grid gap-4 md:grid-cols-3">
      <Select
        label="Status"
        value={status}
        onChange={(event) => onStatusChange(event.target.value as LeadStatus | '')}
      >
        <option value="">All</option>
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="qualified">Qualified</option>
        <option value="lost">Lost</option>
      </Select>

      <Select
        label="Source"
        value={source}
        onChange={(event) => onSourceChange(event.target.value as LeadSource | '')}
      >
        <option value="">All</option>
        <option value="website">Website</option>
        <option value="instagram">Instagram</option>
        <option value="referral">Referral</option>
      </Select>

      <Select
        label="Sort"
        value={sort}
        onChange={(event) => onSortChange(event.target.value as 'latest' | 'oldest')}
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
      </Select>
    </div>
  );
};