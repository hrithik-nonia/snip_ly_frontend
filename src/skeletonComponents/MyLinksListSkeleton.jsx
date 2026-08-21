// MyLinksListSkeleton.jsx
export default function MyLinksListSkeleton({ count = 3 }) {
  return (
    <div className="w-full space-y-5">
      {/* Header Bar Skeleton */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-6 w-24 rounded-md bg-slate-200 animate-pulse" />
        <div className="h-8 w-52 rounded-xl bg-slate-200 animate-pulse" />
      </div>

      {/* Cards Skeleton */}
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200/90 bg-white p-5"
          >
            {/* Top Row */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="h-4 w-28 rounded-md bg-slate-200 animate-pulse" />
                <div className="h-3.5 w-3.5 rounded-full bg-slate-200 animate-pulse" />
              </div>
              <div className="h-6 w-20 rounded-md bg-slate-200 animate-pulse" />
            </div>

            {/* Long URL */}
            <div className="mt-2 h-3 w-3/5 rounded-md bg-slate-200 animate-pulse" />

            {/* Bottom Row */}
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
              <div className="h-3 w-24 rounded-md bg-slate-200 animate-pulse" />
              <div className="flex items-center gap-2">
                <div className="h-7 w-14 rounded-lg bg-slate-200 animate-pulse" />
                <div className="h-7 w-18 rounded-lg bg-slate-200 animate-pulse" />
                <div className="h-7 w-14 rounded-lg bg-slate-200 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Skeleton */}
      <div className="pt-2 flex justify-center">
        <div className="h-9 w-28 rounded-xl bg-slate-200 animate-pulse" />
      </div>
    </div>
  );
}
