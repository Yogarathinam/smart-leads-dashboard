import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Spinner } from '../components/ui/Spinner';
import { ErrorState } from '../components/ui/ErrorState';
import { LeadDetailsCard } from '../components/leads/LeadDetailsCard';
import { useLead } from '../features/leads/leads.hooks';

const LeadDetailsPage = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useLead(id);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !data) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-cyan-400 transition-colors"
        >
          <span className="p-1 rounded-md bg-zinc-800/50 group-hover:bg-cyan-500/10 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </span>
          Back to Dashboard
        </button>
        <ErrorState
          title="Unable to load lead"
          description="The requested lead could not be fetched or does not exist in the database."
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Premium Back Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="group flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-cyan-400 transition-colors"
      >
        <span className="p-1 rounded-md bg-zinc-800/50 group-hover:bg-cyan-500/10 border border-zinc-800 group-hover:border-cyan-500/30 transition-all">
          <ArrowLeft className="w-4 h-4 group-active:-translate-x-1 transition-transform" />
        </span>
        Back to Dashboard
      </button>

      {/* Main Details Card */}
      <LeadDetailsCard lead={data} />
    </motion.div>
  );
};

export default LeadDetailsPage;