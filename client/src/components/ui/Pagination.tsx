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
    <div className="flex items-center gap-3">
      <Button
        variant="secondary"
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrevPage}
      >
        Previous
      </Button>

      <span className="text-sm text-zinc-600 dark:text-zinc-400">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="secondary"
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
      >
        Next
      </Button>
    </div>
  );
};