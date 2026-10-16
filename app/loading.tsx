export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      className="min-h-[65vh] bg-slate-50 px-6 py-24 md:py-32"
    >
      <span className="sr-only">Loading page…</span>
      <div
        aria-hidden="true"
        className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 motion-safe:animate-pulse"
      >
        <div className="space-y-5">
          <div className="h-4 w-28 rounded bg-blue-100" />
          <div className="h-10 w-full rounded bg-slate-200" />
          <div className="h-10 w-3/4 rounded bg-slate-200" />
          <div className="h-5 w-full rounded bg-slate-200" />
          <div className="h-5 w-4/5 rounded bg-slate-200" />
          <div className="h-12 w-44 rounded-full bg-blue-100" />
        </div>
        <div className="aspect-[4/3] rounded-2xl bg-slate-200" />
      </div>
    </div>
  );
}
