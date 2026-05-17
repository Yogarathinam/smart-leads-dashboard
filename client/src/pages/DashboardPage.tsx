import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, BarChart3, TrendingUp } from 'lucide-react';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { Pagination } from '../components/ui/Pagination';
import { LeadsToolbar } from '../components/leads/LeadsToolbar';
import { LeadsTable } from '../components/leads/LeadsTable';
import { LeadModal } from '../components/leads/LeadModal';
import { DeleteLeadDialog } from '../components/leads/DeleteLeadDialog';
import { useDebounce } from '../hooks/useDebounce';
import {
  useCreateLead,
  useDeleteLead,
  useExportLeadsCsv,
  useLeads,
  useUpdateLead,
} from '../features/leads/leads.hooks';
import { downloadBlob } from '../utils/download';
import type {
  CreateLeadPayload,
  Lead,
  LeadSource,
  LeadStatus,
} from '../features/leads/leads.types';
import { useAuthStore } from '../features/auth/auth.store';

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  trend: string;
  up: boolean;
  delay: number;
}

const StatCard = ({ icon: Icon, label, value, trend, up, delay }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.45, ease: 'easeOut' }}
    className="group relative flex min-h-[148px] flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-[#0a0c14]/80 dark:hover:border-zinc-700/80"
  >
    <div className="absolute -right-3 -top-3 opacity-[0.04] transition-opacity group-hover:opacity-[0.08]">
      <Icon className="h-20 w-20 text-cyan-500 dark:text-cyan-400" />
    </div>

    <div className="relative z-10 flex items-center gap-2">
      <Icon className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
        {label}
      </span>
    </div>

    <div className="relative z-10 mt-6 flex items-end justify-between gap-4">
      <h3 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">
        {value}
      </h3>

      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
          up
            ? 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400'
            : 'bg-rose-500/10 text-rose-600 dark:bg-rose-400/10 dark:text-rose-400'
        }`}
      >
        {trend}
      </span>
    </div>
  </motion.div>
);

const DashboardPage = () => {
  const { user } = useAuthStore();

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<LeadStatus | ''>('');
  const [source, setSource] = useState<LeadSource | ''>('');
  const [sort, setSort] = useState<'latest' | 'oldest'>('latest');
  const [searchInput, setSearchInput] = useState('');
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const debouncedSearch = useDebounce(searchInput, 400);

  const filters = useMemo(
    () => ({
      page,
      ...(status ? { status } : {}),
      ...(source ? { source } : {}),
      ...(debouncedSearch ? { search: debouncedSearch } : {}),
      sort,
    }),
    [page, status, source, debouncedSearch, sort]
  );

  const { data, isLoading, isError } = useLeads(filters);
  const createLeadMutation = useCreateLead();
  const updateLeadMutation = useUpdateLead();
  const deleteLeadMutation = useDeleteLead();
  const exportCsvMutation = useExportLeadsCsv();

  const stats = useMemo(() => {
    if (!data) return { total: 0, qualified: 0, contacted: 0, lost: 0 };

    const pagination = data.pagination as { total?: number; totalItems?: number };
    const total = pagination.total ?? pagination.totalItems ?? 0;
    const qualified = data.items.filter((lead) => lead.status === 'qualified').length;
    const contacted = data.items.filter((lead) => lead.status === 'contacted').length;
    const lost = data.items.filter((lead) => lead.status === 'lost').length;

    return {
      total,
      qualified,
      contacted,
      lost,
    };
  }, [data]);

  const handleCreateLead = async (payload: CreateLeadPayload) => {
    await createLeadMutation.mutateAsync(payload);
    setIsCreateOpen(false);
  };

  const handleUpdateLead = async (payload: CreateLeadPayload) => {
    if (!editingLead) return;

    await updateLeadMutation.mutateAsync({
      leadId: editingLead.id,
      payload,
    });

    setEditingLead(null);
  };

  const handleDeleteLead = async () => {
    if (!deletingLead) return;

    await deleteLeadMutation.mutateAsync(deletingLead.id);
    setDeletingLead(null);
  };

  const handleExportCsv = async () => {
    const blob = await exportCsvMutation.mutateAsync({
      ...(status ? { status } : {}),
      ...(source ? { source } : {}),
      ...(debouncedSearch ? { search: debouncedSearch } : {}),
      sort,
    });

    downloadBlob(blob, 'leads.csv');
  };

  if (isLoading) return <Spinner />;

  if (isError || !data) {
    return (
      <ErrorState
        title="Unable to load leads"
        description="Please try again. Something went wrong while fetching leads."
      />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pb-12 font-sans text-zinc-900 selection:bg-cyan-500/20 dark:bg-[#030407] dark:text-zinc-100 dark:selection:bg-cyan-500/30">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-1"
        >
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
            Pipeline Intelligence
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Monitor lead flow, track progress, and manage your pipeline in real time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={Users}
            label="Total Leads"
            value={stats.total}
            trend={`${data.items.length} shown`}
            up
            delay={0.1}
          />
          <StatCard
            icon={Activity}
            label="Contacted"
            value={stats.contacted}
            trend="Live status"
            up
            delay={0.2}
          />
          <StatCard
            icon={BarChart3}
            label="Qualified"
            value={stats.qualified}
            trend="High intent"
            up
            delay={0.3}
          />
          <StatCard
            icon={TrendingUp}
            label="Lost"
            value={stats.lost}
            trend="Needs follow-up"
            up={false}
            delay={0.4}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <LeadsToolbar
            search={searchInput}
            status={status}
            source={source}
            sort={sort}
            onSearchChange={(value) => {
              setSearchInput(value);
              setPage(1);
            }}
            onStatusChange={(value) => {
              setStatus(value);
              setPage(1);
            }}
            onSourceChange={(value) => {
              setSource(value);
              setPage(1);
            }}
            onSortChange={(value) => {
              setSort(value);
              setPage(1);
            }}
            onCreateClick={() => setIsCreateOpen(true)}
            onExportClick={() => void handleExportCsv()}
            canExport={user?.role === 'admin'}
            isExporting={exportCsvMutation.isPending}
          />

          {data.items.length === 0 ? (
            <div className="rounded-2xl border border-zinc-200 bg-white p-12 shadow-sm dark:border-zinc-800/80 dark:bg-[#0a0c14]">
              <EmptyState
                title="No leads found"
                description="Create a lead or adjust your filters to see results."
              />
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <LeadsTable
                leads={data.items}
                userRole={user?.role}
                onEdit={(lead) => setEditingLead(lead)}
                onDelete={(lead) => setDeletingLead(lead)}
              />

              <div className="flex justify-end pt-2">
                <Pagination
                  page={data.pagination.page}
                  totalPages={data.pagination.totalPages}
                  hasNextPage={data.pagination.hasNextPage}
                  hasPrevPage={data.pagination.hasPrevPage}
                  onPageChange={setPage}
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        <LeadModal
          title="Create new lead"
          open={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          isSubmitting={createLeadMutation.isPending}
          onSubmit={handleCreateLead}
        />

        <LeadModal
          title="Edit lead"
          open={Boolean(editingLead)}
          onClose={() => setEditingLead(null)}
          initialValues={editingLead}
          isSubmitting={updateLeadMutation.isPending}
          onSubmit={handleUpdateLead}
        />

        <DeleteLeadDialog
          open={Boolean(deletingLead)}
          onClose={() => setDeletingLead(null)}
          onConfirm={handleDeleteLead}
          isDeleting={deleteLeadMutation.isPending}
        />
      </div>
    </div>
  );
};

export default DashboardPage;