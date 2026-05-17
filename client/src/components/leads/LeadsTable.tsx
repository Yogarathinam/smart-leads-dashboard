import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Edit2, Trash2, Shield } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import type { Lead } from '../../features/leads/leads.types';
import type { UserRole } from '../../features/auth/auth.types';

interface LeadsTableProps {
  leads: Lead[];
  userRole?: UserRole;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'qualified':
      return 'border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400';
    case 'lost':
      return 'border border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-400';
    case 'contacted':
      return 'border border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-400';
    default:
      return 'border border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-400';
  }
};

export const LeadsTable = ({ leads, userRole, onEdit, onDelete }: LeadsTableProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-[#0a0c14]/80"
    >
      <div className="hidden md:block">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
          <thead className="bg-zinc-50 dark:bg-zinc-900/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Source
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Created At
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 text-sm font-semibold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {lead.name}
                      </p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">{lead.email}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusStyle(
                      lead.status
                    )}`}
                  >
                    {lead.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-sm capitalize text-zinc-700 dark:text-zinc-300">
                    {lead.source}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                  {formatDate(lead.createdAt)}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/leads/${lead.id}`)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300 bg-white text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                      aria-label="View lead"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit(lead)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300 bg-white text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                      aria-label="Edit lead"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>

                    {userRole === 'admin' ? (
                      <button
                        type="button"
                        onClick={() => onDelete(lead)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-rose-200 bg-rose-50 text-rose-600 transition hover:bg-rose-100 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-400 dark:hover:bg-rose-950/40"
                        aria-label="Delete lead"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    ) : (
                      <span className="inline-flex h-9 items-center gap-1 rounded-lg border border-zinc-200 px-3 text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                        <Shield className="h-3.5 w-3.5" />
                        Admin
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 p-4 md:hidden">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {lead.name}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{lead.email}</p>
              </div>

              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusStyle(
                  lead.status
                )}`}
              >
                {lead.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-zinc-500 dark:text-zinc-400">Source</p>
                <p className="capitalize text-zinc-800 dark:text-zinc-200">{lead.source}</p>
              </div>
              <div>
                <p className="text-zinc-500 dark:text-zinc-400">Created</p>
                <p className="text-zinc-800 dark:text-zinc-200">{formatDate(lead.createdAt)}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => navigate(`/leads/${lead.id}`)}
                className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
              >
                View
              </button>

              <button
                type="button"
                onClick={() => onEdit(lead)}
                className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
              >
                Edit
              </button>

              {userRole === 'admin' ? (
                <button
                  type="button"
                  onClick={() => onDelete(lead)}
                  className="flex-1 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-400"
                >
                  Delete
                </button>
              ) : (
                <div className="flex flex-1 items-center justify-center rounded-lg border border-zinc-200 px-3 py-2 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                  Admin
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};