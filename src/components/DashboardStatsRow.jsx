import { Link2, BarChart2, CheckCircle2 } from "lucide-react";
import { formatCount } from "../utils/helperFunctions";

export default function DashboardStatsRow({ stats }) {
  if (!stats) return null;

  const totalLinks = formatCount(stats.total_links);
  const totalClicks = formatCount(stats.total_clicks);
  const activeLinks = formatCount(stats.active_links);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 w-full">
      {/* Card 1: Total Links */}
      <div className="flex items-center gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all hover:shadow-md">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F3E8FF] text-[#7C3AED] shrink-0">
          <Link2 className="h-5 w-5 stroke-[2.5]" />
        </div>
        <div>
          <div className="text-2xl font-bold tracking-tight text-slate-900">
            {totalLinks}
          </div>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Total Links
          </p>
        </div>
      </div>

      {/* Card 2: Total Clicks */}
      <div className="flex items-center gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all hover:shadow-md">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F3E8FF] text-[#7C3AED] shrink-0">
          <BarChart2 className="h-5 w-5 stroke-[2.5]" />
        </div>
        <div>
          <div className="text-2xl font-bold tracking-tight text-slate-900">
            {totalClicks}
          </div>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Total Clicks
          </p>
        </div>
      </div>

      {/* Card 3: Active Links */}
      <div className="flex items-center gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all hover:shadow-md">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100/70 text-emerald-600 shrink-0">
          <CheckCircle2 className="h-5 w-5 stroke-[2.5]" />
        </div>
        <div>
          <div className="text-2xl font-bold tracking-tight text-slate-900">
            {activeLinks}
          </div>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Active Links
          </p>
        </div>
      </div>
    </div>
  );
}
