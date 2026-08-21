export default function DashboardStatsRowSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 w-full">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-2xl border border-slate-200/90 bg-white p-5"
        >
          {/* Icon circle skeleton */}
          <div className="h-12 w-12 rounded-full bg-slate-200 animate-pulse shrink-0" />

          <div className="flex flex-col gap-2 flex-1">
            {/* Number skeleton */}
            <div className="h-7 w-3/5 rounded-md bg-slate-200 animate-pulse" />
            {/* Label skeleton */}
            <div className="h-3 w-2/5 rounded-md bg-slate-200 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
