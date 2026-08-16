import { useState } from "react";
import { Search, Copy, BarChart2, Check } from "lucide-react";

const mockLinks = [
  {
    id: 1,
    shortUrl: "snip.ly/aB3kP",
    longUrl: "https://amazon.in/some-very-long-product-url-that-goes-on-and-on",
    clicks: 245,
    created: "Created 2 days ago",
    isExpired: false,
  },
  {
    id: 2,
    shortUrl: "snip.ly/oldPromo",
    longUrl: "https://example.com/summer-sale-2023",
    clicks: 89,
    created: "Created 6 months ago",
    isExpired: true,
  },
];

export default function MyLinksList({
  initialLinks = mockLinks,
  onAnalyticsClick,
  onDeleteClick,
}) {
  const [links, setLinks] = useState(initialLinks);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(`https://${text}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id) => {
    setLinks(links.filter((item) => item.id !== id));
    if (onDeleteClick) onDeleteClick(id);
  };

  const filteredLinks = links.filter(
    (item) =>
      item.shortUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.longUrl.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search links..."
            className="w-full rounded-xl border border-slate-200/90 bg-white pl-9 pr-3.5 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 transition-all"
          />
        </div>
      </div>

      {/* Links List */}
      <div className="space-y-4">
        {filteredLinks.map((link) => {
          const isCopied = copiedId === link.id;

          return (
            <div
              key={link.id}
              className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:shadow-sm"
            >
              {/* Top Row: Short Link & Clicks Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={`https://${link.shortUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`font-bold text-base transition-colors ${
                      link.isExpired
                        ? "line-through text-slate-400"
                        : "text-[#7C3AED] hover:underline"
                    }`}
                  >
                    {link.shortUrl}
                  </a>

                  {/* Copy Inline Icon */}
                  {!link.isExpired && (
                    <button
                      type="button"
                      onClick={() => handleCopy(link.id, link.shortUrl)}
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
                  {link.isExpired && (
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
                {link.longUrl}
              </p>

              {/* Bottom Row: Created Date & Action Buttons */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="text-xs font-medium text-slate-400">
                  {link.created}
                </span>

                <div className="flex items-center gap-2">
                  {/* Copy Button (only if active) */}
                  {!link.isExpired && (
                    <button
                      type="button"
                      onClick={() => handleCopy(link.id, link.shortUrl)}
                      className="rounded-lg border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors focus:outline-none"
                    >
                      {isCopied ? "Copied" : "Copy"}
                    </button>
                  )}

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
                    onClick={() => handleDelete(link.id)}
                    className="rounded-lg border border-rose-200/90 bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 shadow-2xs hover:bg-rose-50 transition-colors focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredLinks.length === 0 && (
          <div className="py-10 text-center text-sm text-slate-400 font-medium bg-white rounded-2xl border border-slate-200/90">
            No links found
          </div>
        )}
      </div>

      {/* Load More Button */}
      <div className="pt-2 flex justify-center">
        <button
          type="button"
          className="rounded-xl border border-[#7C3AED] bg-white px-6 py-2 text-sm font-semibold text-[#7C3AED] shadow-2xs hover:bg-purple-50/60 active:scale-95 transition-all focus:outline-none"
        >
          Load More
        </button>
      </div>
    </div>
  );
}
