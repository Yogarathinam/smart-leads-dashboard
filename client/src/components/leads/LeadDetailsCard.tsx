import { motion } from 'framer-motion';
import { Mail, Calendar, Target, Hash } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import type { Lead } from '../../features/leads/leads.types';

interface LeadDetailsCardProps {
  lead: Lead;
}

const getStatusStyle = (status: string) => {
  switch(status) {
    case 'qualified': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    case 'lost': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
    case 'contacted': return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
    default: return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
  }
};

export const LeadDetailsCard = ({ lead }: LeadDetailsCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="bg-[#0a0c14]/80 border border-zinc-800/80 rounded-2xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl"
    >
      {/* Decorative gradient orb */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-8">
        {/* Header section */}
        <div className="flex justify-between items-start">
          <div className="flex gap-4 items-center">
            <div className="w-14 h-14 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xl font-semibold text-zinc-300">
              {lead.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-zinc-100 tracking-tight">{lead.name}</h2>
              <div className="flex items-center gap-2 mt-1 text-sm text-zinc-400">
                <Mail className="w-3.5 h-3.5" />
                <span>{lead.email}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusStyle(lead.status)}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              <span className="capitalize">{lead.status}</span>
            </span>
          </div>
        </div>

        <div className="h-px w-full bg-zinc-800/50"></div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-3 items-center p-4 rounded-xl bg-[#030407] border border-zinc-800/50">
            <Target className="w-5 h-5 text-zinc-500" />
            <div>
              <p className="text-[10px] uppercase tracking-widest font-medium text-zinc-500">Acquisition Source</p>
              <p className="text-sm font-medium text-zinc-200 mt-0.5 capitalize">{lead.source}</p>
            </div>
          </div>
          
          <div className="flex gap-3 items-center p-4 rounded-xl bg-[#030407] border border-zinc-800/50">
            <Hash className="w-5 h-5 text-zinc-500" />
            <div>
              <p className="text-[10px] uppercase tracking-widest font-medium text-zinc-500">Record ID</p>
              <p className="text-sm font-medium text-zinc-200 mt-0.5 font-mono">{lead.id}</p>
            </div>
          </div>

          <div className="flex gap-3 items-center p-4 rounded-xl bg-[#030407] border border-zinc-800/50">
            <Calendar className="w-5 h-5 text-zinc-500" />
            <div>
              <p className="text-[10px] uppercase tracking-widest font-medium text-zinc-500">Created Timestamp</p>
              <p className="text-sm font-medium text-zinc-200 mt-0.5">{formatDate(lead.createdAt)}</p>
            </div>
          </div>

          <div className="flex gap-3 items-center p-4 rounded-xl bg-[#030407] border border-zinc-800/50">
            <Calendar className="w-5 h-5 text-zinc-500" />
            <div>
              <p className="text-[10px] uppercase tracking-widest font-medium text-zinc-500">Last Updated</p>
              <p className="text-sm font-medium text-zinc-200 mt-0.5">{formatDate(lead.updatedAt)}</p>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};