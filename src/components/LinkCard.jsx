import { useState } from "react";
import { Copy, Check, Trash2, Calendar, Timer } from "lucide-react";

export default function LinkCard({
  link = {
    shortUrl: "snip.ly/aB3kP",
    originalUrl:
      "https://amazon.in/some-very-long-url-that-goes-on-and-on-and-on...",
    createdDate: "Created 2 days ago",
    expiresAt: "Expires: Never",
    status: "Active",
  },
  onDelete,
}) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${link.shortUrl}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm hover:shadow-md transition-all space-y-3">
      {/* Top Row: Short Link & Action Buttons */}
      <div className="flex items-center justify-between gap-4">
        {/* Short Link */}
        <a
          href={`https://${link.shortUrl}`}
          target="_blank"
          rel="noreferrer"
          className="text-lg font-bold tracking-tight text-[#7C3AED] hover:underline"
        >
          {link.shortUrl}
        </a>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-semibold shadow-2xs transition-all focus:outline-none ${
              isCopied
                ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                : "border-purple-300/80 bg-white hover:bg-purple-50/60 text-[#7C3AED]"
            }`}
          >
            {isCopied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[2.5]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 stroke-[2.2]" />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => onDelete && onDelete(link)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-300/80 bg-white px-3.5 py-1.5 text-xs font-semibold text-rose-600 shadow-2xs hover:bg-rose-50/60 transition-all focus:outline-none"
          >
            <Trash2 className="h-3.5 w-3.5 stroke-[2.2]" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Middle Row: Original URL */}
      <div className="flex items-center text-xs text-slate-500 font-medium overflow-hidden">
        <span className="font-bold text-slate-700 shrink-0 mr-1.5">
          Original:
        </span>
        <span className="truncate text-slate-400" title={link.originalUrl}>
          {link.originalUrl}
        </span>
      </div>

      {/* Bottom Meta Details Row */}
      <div className="pt-1 flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
        {/* Created Date */}
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-slate-500 stroke-[2]" />
          <span>{link.createdDate}</span>
        </div>

        {/* Expiration Date */}
        <div className="flex items-center gap-1.5">
          <Timer className="h-3.5 w-3.5 text-slate-500 stroke-[2]" />
          <span>{link.expiresAt}</span>
        </div>

        {/* Active Status Pill */}
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>{link.status}</span>
        </div>
      </div>
    </div>
  );
}
