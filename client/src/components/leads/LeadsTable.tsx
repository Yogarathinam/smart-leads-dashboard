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
  switch(status) {
    case 'qualified': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    case 'lost': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
    case 'contacted': return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
    default: return 'text-amber-400 bg-amber-400/10 border-amber-400/20'; // new
  }
};

export const LeadsTable = ({ leads, userRole, onEdit, onDelete }: LeadsTableProps) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-2xl bg-[#0a0c14]/80 border border-zinc-800/80 backdrop-blur-xl shadow-2xl">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-zinc-800/80 text-xs text-zinc-500 uppercase tracking-widest bg-zinc-900/30">
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Source</th>
              <th className="px-6 py-4 font-medium">Created At</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <motion.tr 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                key={lead.id} 
                className="border-b border-zinc-800/40 text-sm text-zinc-300 hover:bg-zinc-800/30 transition-colors group"
              >
                <td className="px-6 py-4 font-medium text-zinc-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-400 border border-zinc-700">
                    {lead.name.charAt(0)}
                  </div>
                  {lead.name}
                </td>
                <td className="px-6 py-4 text-zinc-400">{lead.email}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${getStatusStyle(lead.status)}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    <span className="capitalize">{lead.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700 capitalize">
                    {lead.source}
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-500 text-xs tracking-wide">
                  {formatDate(lead.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => navigate(`/leads/${lead.id}`)}
                      className="p-2 rounded-lg hover:bg-zinc-700 hover:text-cyan-400 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onEdit(lead)}
                      className="p-2 rounded-lg hover:bg-zinc-700 hover:text-emerald-400 transition-colors"
                      title="Edit Lead"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    {userRole === 'admin' && (
                      <button 
                        onClick={() => onDelete(lead)}
                        className="p-2 rounded-lg hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};