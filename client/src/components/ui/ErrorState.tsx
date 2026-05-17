interface ErrorStateProps {
  title: string;
  description: string;
}

export const ErrorState = ({ title, description }: ErrorStateProps) => {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
      <h3 className="text-lg font-semibold text-rose-700">{title}</h3>
      <p className="mt-2 text-sm text-rose-600">{description}</p>
    </div>
  );
};