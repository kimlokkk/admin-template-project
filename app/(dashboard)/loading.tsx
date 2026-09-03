export default function DashboardLoading() {
  return (
    <div className="animate-pulse space-y-6" aria-label="Loading page">
      <div className="space-y-3">
        <div className="h-4 w-20 rounded bg-muted" />
        <div className="h-8 w-48 rounded bg-muted" />
        <div className="h-4 w-80 max-w-full rounded bg-muted" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-36 rounded-xl border bg-card" />
        ))}
      </div>
      <div className="h-96 rounded-xl border bg-card" />
    </div>
  );
}
