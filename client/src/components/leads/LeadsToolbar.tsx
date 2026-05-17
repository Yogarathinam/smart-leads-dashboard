import { Download, Plus } from 'lucide-react';
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
    <div className="space-y-5 rounded-2xl bg-[#0a0c14]/80 border border-zinc-800/80 p-5 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Subtle top edge gradient highlight */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
      
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between relative z-10">
        <div className="w-full md:max-w-md">
          <LeadsSearch value={search} onChange={onSearchChange} />
        </div>

        <div className="flex flex-wrap gap-3">
          {canExport && (
            <button 
              onClick={onExportClick} 
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/80 rounded-lg transition-colors active:scale-95 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Exporting...' : 'Export CSV'}
            </button>
          )}
          <button 
            onClick={onCreateClick}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all active:scale-95 shadow-[0_0_15px_rgba(34,211,238,0.25)]"
          >
            <Plus className="w-4 h-4" />
            Create Lead
          </button>
        </div>
      </div>

      <div className="h-px w-full bg-zinc-800/50"></div>

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