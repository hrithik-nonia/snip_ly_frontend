import { useState, useContext } from "react";
import { Copy, Check, Trash2, Calendar, Timer, RefreshCw } from "lucide-react";
import { UserContext } from "../context/appContext";
import { readableDate } from "../utils/helperFunctions";

export default function LinkCard({ linkData = {}, onDeleteClick, isDeleting }) {
  const [isCopied, setIsCopied] = useState(false);
  const { baseUrl } = useContext(UserContext);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${baseUrl}/${linkData.shortCode}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm hover:shadow-md transition-all space-y-3">
      {/* Top Row: Short Link & Action Buttons */}
      <div className="flex items-center justify-between gap-4">
        {/* Short Link */}
        <a
          href={`${baseUrl}/${linkData.shortCode}`}
          target="_blank"
          rel="noreferrer"
          className="text-lg font-bold tracking-tight text-[#7C3AED] hover:underline"
        >
          {`${baseUrl}/${linkData?.shortCode}`}
        </a>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {!linkData?.isExpired ? (
            <>
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
            </>
          ) : (
            <>
              {/* Regenerate Button */}
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
                    <RefreshCw className="h-3.5 w-3.5 text-emerald-600 stroke-[2.5]" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 stroke-[2.2]" />
                    <span>Re Generate</span>
                  </>
                )}
              </button>
            </>
          )}

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => onDeleteClick && onDeleteClick(linkData?.shortCode)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-300/80 bg-white px-3.5 py-1.5 text-xs font-semibold text-rose-600 shadow-2xs hover:bg-rose-50/60 transition-all focus:outline-none"
          >
            {!isDeleting ? (
              <>
                <Trash2 className="h-3.5 w-3.5 stroke-[2.2]" />
                <span>Delete</span>
              </>
            ) : (
              <span>isDeleting...</span>
            )}
          </button>
        </div>
      </div>

      {/* Middle Row: Original URL */}
      <div className="flex items-center text-xs text-slate-500 font-medium overflow-hidden">
        <span className="font-bold text-slate-700 shrink-0 mr-1.5">
          Original:
        </span>
        <span className="truncate text-slate-400" title={linkData?.originalUrl}>
          {linkData?.originalUrl}
        </span>
      </div>

      {/* Bottom Meta Details Row */}
      <div className="pt-1 flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
        {/* Created Date */}
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-slate-500 stroke-[2]" />
          <span>{readableDate(linkData?.createdAt)}</span>
        </div>

        {/* Expiration Date */}
        <div className="flex items-center gap-1.5">
          <Timer className="h-3.5 w-3.5 text-slate-500 stroke-[2]" />
          <span>{readableDate(linkData?.expireAt)}</span>
        </div>

        {/* Active Status Pill */}
        <div
          className={`flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${!linkData?.isExpired ? "text-emerald-700 bg-emerald-50 border-emerald-200/50" : "text-red-700 bg-red-50 border-red-200/50"} text-emerald-700`}
        >
          {/* {linkData} */}
          <span
            className={`h-1.5 w-1.5 rounded-full ${!linkData?.isExpired ? "bg-emerald-500" : "bg-red-500"}`}
          />

          <span>{!linkData?.isExpired ? "Active" : "Expire"}</span>
        </div>
      </div>
    </div>
  );
}
