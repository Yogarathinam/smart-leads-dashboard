import { Button } from '../ui/Button';
import { LeadsFilters } from './LeadsFilters';
import { LeadsSearch } from './LeadsSearch';
import type { LeadSource, LeadStatus } from '../../features/leads/leads.types';

interface LeadsToolbarProps {
  search: string;
  status: LeadStatus | '';
  source: LeadSource | '';
  sort: 'latest' | 'oldest';
  onSearchChange: (value: string) => void;
  onStatusChange: (value: LeadStatus | '') => void;
  onSourceChange: (value: LeadSource | '') => void;
  onSortChange: (value: 'latest' | 'oldest') => void;
  onCreateClick: () => void;
  onExportClick: () => void;
  canExport: boolean;
  isExporting: boolean;
}

export const LeadsToolbar = ({
  search,
  status,
  source,
  sort,
  onSearchChange,
  onStatusChange,
  onSourceChange,
  onSortChange,
  onCreateClick,
  onExportClick,
  canExport,
  isExporting,
}: LeadsToolbarProps) => {
  return (
    <div className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="w-full md:max-w-md">
          <LeadsSearch value={search} onChange={onSearchChange} />
        </div>

        <div className="flex gap-3">
          {canExport ? (
            <Button variant="secondary" onClick={onExportClick} disabled={isExporting}>
              {isExporting ? 'Exporting...' : 'Export CSV'}
            </Button>
          ) : null}
          <Button onClick={onCreateClick}>Create Lead</Button>
        </div>
      </div>

      <LeadsFilters
        status={status}
        source={source}
        sort={sort}
        onStatusChange={onStatusChange}
        onSourceChange={onSourceChange}
        onSortChange={onSortChange}
      />
    </div>
  );
};