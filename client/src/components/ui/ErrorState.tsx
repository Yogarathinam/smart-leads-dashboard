interface ErrorStateProps {
  title: string;
  description: string;
}

export const ErrorState = ({ title, description }: ErrorStateProps) => {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center dark:border-rose-900/50 dark:bg-rose-950/20">
      <h3 className="text-lg font-semibold text-rose-700 dark:text-rose-300">{title}</h3>
      <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">{description}</p>
    </div>
  );
};