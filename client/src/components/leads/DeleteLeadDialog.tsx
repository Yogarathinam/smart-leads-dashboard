import { Modal } from '../ui/Modal';
import { AlertTriangle } from 'lucide-react';

interface DeleteLeadDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

export const DeleteLeadDialog = ({
  open,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteLeadDialogProps) => {
  return (
    <Modal title="" open={open} onClose={onClose}>
      <div className="flex flex-col items-center text-center p-4">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6 text-rose-500" />
        </div>
        <h3 className="text-xl font-semibold text-zinc-100 mb-2">Delete this lead?</h3>
        <p className="text-sm text-zinc-400 mb-8">
          Are you sure you want to delete this lead? All associated routing data and history will be permanently erased. This action cannot be undone.
        </p>
        
        <div className="flex w-full gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-2.5 px-4 text-sm font-medium text-zinc-300 bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => void onConfirm()} 
            disabled={isDeleting}
            className="flex-1 py-2.5 px-4 text-sm font-medium text-white bg-rose-500/90 hover:bg-rose-500 rounded-lg shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all disabled:opacity-50 active:scale-[0.98]"
          >
            {isDeleting ? 'Deleting...' : 'Delete Lead'}
          </button>
        </div>
      </div>
    </Modal>
  );
};