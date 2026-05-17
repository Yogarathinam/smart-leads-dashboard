import { Modal } from '../ui/Modal';
import { LeadForm } from './LeadForm';
import type { CreateLeadPayload, Lead } from '../../features/leads/leads.types';

interface LeadModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  initialValues?: Lead | null;
  isSubmitting: boolean;
  onSubmit: (payload: CreateLeadPayload) => Promise<void>;
}

export const LeadModal = ({
  title,
  open,
  onClose,
  initialValues,
  isSubmitting,
  onSubmit,
}: LeadModalProps) => {
  return (
    <Modal title={title} open={open} onClose={onClose}>
      <LeadForm initialValues={initialValues} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </Modal>
  );
};