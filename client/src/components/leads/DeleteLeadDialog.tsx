import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

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
    <Modal title="Delete lead" open={open} onClose={onClose}>
      <p className="mb-4 text-sm text-slate-600">
        Are you sure you want to delete this lead? This action cannot be undone.
      </p>
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => void onConfirm()} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </Modal>
  );
};