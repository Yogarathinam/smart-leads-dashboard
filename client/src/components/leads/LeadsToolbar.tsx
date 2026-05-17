import { Download, Plus } from 'lucide-react';
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
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-[#0a0c14]/80">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <LeadsSearch value={search} onChange={onSearchChange} />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:justify-end">
          <LeadsFilters
            status={status}
            source={source}
            sort={sort}
            onStatusChange={onStatusChange}
            onSourceChange={onSourceChange}
            onSortChange={onSortChange}
          />

          {canExport ? (
            <Button
              type="button"
              variant="secondary"
              onClick={onExportClick}
              disabled={isExporting}
              className="inline-flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              {isExporting ? 'Exporting...' : 'Export CSV'}
            </Button>
          ) : null}

          <Button
            type="button"
            onClick={onCreateClick}
            className="inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Lead
          </Button>
        </div>
      </div>
    </div>
  );
};