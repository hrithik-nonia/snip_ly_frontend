import { useState } from "react";
import { Search, Copy, BarChart2, Check } from "lucide-react";

export default function MyLinksList({
  onAnalyticsClick,
  links = [],
  setLimit,
  BASEURL,
  totalLinks,
  search,
  setSearch,
}) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  console.log(links);

  const handleLoadMoreBtn = () => {
    setLimit((prev) => prev + 5);
  };

  return (
    <div className="w-full space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          My Links
        </h2>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            placeholder="Search by alias..."
            className="w-full rounded-xl border border-slate-200/90 bg-white pl-9 pr-3.5 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 transition-all"
          />
        </div>
      </div>

      {/* Links List */}
      <div className="space-y-4">
        {links.map((link) => {
          const isCopied = copiedId === link._id;

          return (
            <div
              key={link._id}
              className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:shadow-sm"
            >
              {/* Top Row: Short Link & Clicks Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={`${BASEURL}/${link.short_code}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`font-bold text-base transition-colors ${
                      !link.is_active
                        ? "line-through text-slate-400"
                        : "text-[#7C3AED] hover:underline"
                    }`}
                  >
                    {BASEURL}/{link.short_code}
                  </a>

                  {/* Copy Inline Icon */}
                  {link.is_active && (
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(link._id, `${BASEURL}/${link.short_code}`)
                      }
                      className="text-slate-400 hover:text-slate-600 transition-colors"
                      title="Copy Link"
                    >
                      {isCopied ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  )}

                  {/* Expired Badge */}
                  {!link.is_active && (
                    <span className="rounded-md bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-700">
                      Expired
                    </span>
                  )}
                </div>

                {/* Clicks Badge */}
                <div className="flex items-center gap-1.5 rounded-md bg-slate-100/80 px-2.5 py-1 text-xs font-semibold text-slate-600 shrink-0">
                  <BarChart2 className="h-3.5 w-3.5 text-slate-500" />
                  <span>{link.clicks} clicks</span>
                </div>
              </div>

              {/* Middle Row: Long URL */}
              <p className="mt-1 text-xs font-medium text-slate-400 truncate max-w-full">
                {link.original_url}
              </p>

              {/* Bottom Row: Created Date & Action Buttons */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="text-xs font-medium text-slate-400">
                  {new Date(link.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>

                <div className="flex items-center gap-2">
                  {/* Analytics Button */}
                  <button
                    type="button"
                    onClick={() => onAnalyticsClick && onAnalyticsClick(link)}
                    className="rounded-lg border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors focus:outline-none"
                  >
                    Analytics
                  </button>

                  {/* Delete Button */}
                  <button
                    type="button"
                    className="rounded-lg border border-rose-200/90 bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 shadow-2xs hover:bg-rose-50 transition-colors focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {links.length === 0 && (
          <div className="py-10 text-center text-sm text-slate-400 font-medium bg-white rounded-2xl border border-slate-200/90">
            No links found
          </div>
        )}
      </div>

      {/* Load More Button */}
      <div className="pt-2 flex justify-center">
        <button
          type="button"
          disabled={links.length >= totalLinks}
          className="rounded-xl border border-[#7C3AED] bg-white px-6 py-2 text-sm font-semibold text-[#7C3AED] shadow-2xs hover:bg-purple-50/60 active:scale-95 transition-all focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={handleLoadMoreBtn}
        >
          {links.length >= totalLinks ? "All links loaded" : "Load More"}
        </button>
      </div>
    </div>
  );
}
