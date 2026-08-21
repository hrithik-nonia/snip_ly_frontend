export default function LinkCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm space-y-3">
      {/* Top Row */}
      <div className="flex items-center justify-between gap-4">
        <div className="h-6 w-36 rounded-md bg-slate-200 animate-pulse" />
        <div className="flex items-center gap-2">
          <div className="h-8 w-20 rounded-xl bg-slate-200 animate-pulse" />
          <div className="h-8 w-20 rounded-xl bg-slate-200 animate-pulse" />
        </div>
      </div>

      {/* Middle Row */}
      <div className="flex items-center gap-2">
        <div className="h-3 w-14 rounded-md bg-slate-200 animate-pulse shrink-0" />
        <div className="h-3 w-64 rounded-md bg-slate-200 animate-pulse" />
      </div>

      {/* Bottom Row */}
      <div className="pt-1 flex items-center gap-4">
        <div className="h-4 w-24 rounded-md bg-slate-200 animate-pulse" />
        <div className="h-4 w-24 rounded-md bg-slate-200 animate-pulse" />
        <div className="h-5 w-16 rounded-full bg-slate-200 animate-pulse" />
      </div>
    </div>
  );
}
