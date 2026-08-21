import { BarChart2, User, Sun } from "lucide-react";

export default function AnalyticsStatsRow({ stats = {} }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 w-full">
      {/* Card 1: Total Clicks */}
      <div className="flex items-center gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all hover:shadow-md">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F3E8FF] text-[#7C3AED] shrink-0">
          <BarChart2 className="h-5 w-5 stroke-[2.5]" />
        </div>
        <div>
          <div className="text-2xl font-bold tracking-tight text-slate-900">
            {stats?.totalClicks}
          </div>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Total Clicks
          </p>
        </div>
      </div>

      {/* Card 2: Unique Visitors */}
      <div className="flex items-center gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all hover:shadow-md">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F3E8FF] text-[#7C3AED] shrink-0">
          <User className="h-5 w-5 stroke-[2.2]" />
        </div>
        <div>
          <div className="text-2xl font-bold tracking-tight text-slate-900">
            {stats?.uniqueVisitor}
          </div>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Unique Visitors
          </p>
        </div>
      </div>

      {/* Card 3: Today's Clicks */}
      <div className="flex items-center gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all hover:shadow-md">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F3E8FF] text-[#7C3AED] shrink-0">
          <Sun className="h-5 w-5 stroke-[2.2]" />
        </div>
        <div>
          <div className="text-2xl font-bold tracking-tight text-slate-900">
            {stats?.todaysClicks}
          </div>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Today's Clicks
          </p>
        </div>
      </div>
    </div>
  );
}
