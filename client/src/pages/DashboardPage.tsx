import { useMemo, useState } from 'react';
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
import type { CreateLeadPayload, Lead, LeadSource, LeadStatus } from '../features/leads/leads.types';
import { useAuthStore } from '../features/auth/auth.store';

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

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !data) {
    return (
      <ErrorState
        title="Unable to load leads"
        description="Please try again. Something went wrong while fetching leads."
      />
    );
  }

  return (
    <div className="space-y-6">
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
        <EmptyState
          title="No leads found"
          description="Create a lead or adjust your filters to see results."
        />
      ) : (
        <>
          <LeadsTable
            leads={data.items}
            userRole={user?.role}
            onEdit={(lead) => setEditingLead(lead)}
            onDelete={(lead) => setDeletingLead(lead)}
          />
          <Pagination
            page={data.pagination.page}
            totalPages={data.pagination.totalPages}
            hasNextPage={data.pagination.hasNextPage}
            hasPrevPage={data.pagination.hasPrevPage}
            onPageChange={setPage}
          />
        </>
      )}

      <LeadModal
        title="Create lead"
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
  );
};

export default DashboardPage;