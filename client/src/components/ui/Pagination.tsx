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
    <div className="mt-6 flex items-center justify-between gap-4 bg-[#0a0c14]/40 p-2 rounded-xl border border-zinc-800/50">
      <Button
        variant="secondary"
        disabled={!hasPrevPage}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-zinc-500">Page</span>
        <span className="px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-sm font-medium text-zinc-200 shadow-inner">
          {page}
        </span>
        <span className="text-sm font-medium text-zinc-500">of {totalPages}</span>
      </div>

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