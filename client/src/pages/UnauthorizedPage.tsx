const UnauthorizedPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Unauthorized</h1>
        <p className="mt-2 text-slate-600">
          You do not have permission to access this page.
        </p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;