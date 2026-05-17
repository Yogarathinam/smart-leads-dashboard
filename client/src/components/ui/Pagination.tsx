import { Button } from './Button';

interface PaginationProps {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  page,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="mt-6 flex items-center justify-between gap-4">
      <Button
        variant="secondary"
        disabled={!hasPrevPage}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>

      <p className="text-sm text-slate-600">
        Page {page} of {totalPages}
      </p>

      <Button
        variant="secondary"
        disabled={!hasNextPage}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
};