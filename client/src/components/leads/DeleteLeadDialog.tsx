import { AlertTriangle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface DeleteLeadDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<unknown>;
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
      <div className="space-y-5">
        <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/20">
          <div className="mt-0.5 rounded-full bg-rose-100 p-2 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
            <AlertTriangle className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300">
              Delete this lead?
            </h3>
            <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">
              Are you sure you want to delete this lead? All associated routing data and
              history will be permanently erased. This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={() => void onConfirm()}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Lead'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};