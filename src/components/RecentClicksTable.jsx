import { parseUserAgent, readableDate } from "../utils/helperFunctions";

export default function RecentClicksTable({ recentClicks = [] }) {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm overflow-hidden space-y-4">
      {/* Title */}
      <h3 className="text-xl font-bold tracking-tight text-slate-900">
        Recent Clicks
      </h3>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm text-slate-700">
          {/* Table Header */}
          <thead className="border-b border-slate-100 text-xs font-semibold text-slate-500">
            <tr>
              <th scope="col" className="py-3 px-4 font-semibold">
                Time
              </th>
              <th scope="col" className="py-3 px-4 font-semibold">
                Country
              </th>
              <th scope="col" className="py-3 px-4 font-semibold">
                Referer
              </th>
              <th scope="col" className="py-3 px-4 font-semibold">
                Browser
              </th>
            </tr>
          </thead>

          {/* Table Body with Zebra Striping */}
          <tbody className="divide-y divide-slate-100/60">
            {recentClicks.map((row, idx) => (
              <tr
                key={idx}
                className={`transition-colors hover:bg-slate-100/50 ${
                  idx % 2 === 1 ? "bg-slate-50/70" : "bg-white"
                }`}
              >
                <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                  {readableDate(row.clicked_at)}
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                  {row.country}
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                  {row.referer}
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                  {parseUserAgent(row.user_agent)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
