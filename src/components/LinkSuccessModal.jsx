import { useState, useEffect } from "react";
import {
  X,
  CheckCircle2,
  Copy,
  Check,
  Clock,
  ExternalLink,
} from "lucide-react";

/**
 * Format ISO date string into a clean readable date
 * e.g., "2026-08-24T12:57:15.583988+00:00" => "24 Aug 2026, 12:57 PM UTC"
 */
function formatExpirationDate(isoString) {
  if (!isoString) return "Never";
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;

    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate}, ${formattedTime} UTC`;
  } catch {
    return isoString;
  }
}

export default function LinkSuccessModal({
  isOpen = false,
  onClose,
  linkData = null,
}) {
  const [isCopied, setIsCopied] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && onClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset copied state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      /* eslint-disable */
      setIsCopied(false);
    }
  }, [isOpen]);

  if (!isOpen || !linkData) return null;

  const { short_url = "", original_url = "", expires_at = null } = linkData;

  // Handle Copy to Clipboard
  const handleCopy = async () => {
    if (!short_url) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(short_url);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = short_url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity duration-200 animate-in fade-in"
      />

      {/* Modal Card Surface */}
      <div className="relative w-[calc(100%-32px)] sm:w-full max-w-[480px] rounded-3xl bg-white p-6 sm:p-7 shadow-2xl shadow-purple-950/20 border border-slate-100 z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Section */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100/80 text-[#7C3AED] shrink-0">
              <CheckCircle2 className="h-6 w-6 stroke-[2.2]" />
            </div>
            <div>
              <h2
                id="modal-title"
                className="text-lg sm:text-xl font-bold tracking-tight text-slate-900"
              >
                Link Successfully Created
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                Your shortened link is ready to share.
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/20 shrink-0"
          >
            <X className="h-4 w-4 stroke-[2.2]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-6 space-y-4">
          {/* Priority 1: Short URL Container */}
          <div className="rounded-2xl border border-purple-200/80 bg-purple-50/50 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider text-[#7C3AED] uppercase">
                Your Short Link
              </span>

              {/* Active Status Badge */}
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Link is active</span>
              </div>
            </div>

            {/* Short URL Display & Copy Button */}
            <div className="flex items-center justify-between gap-3 pt-0.5">
              <a
                href={short_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg font-bold text-slate-900 hover:text-[#7C3AED] transition-colors break-all flex items-center gap-1.5 group"
              >
                <span>{short_url}</span>
                <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#7C3AED] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold shadow-xs transition-all shrink-0 focus:outline-none focus:ring-2 focus:ring-purple-500/30 ${
                  isCopied
                    ? "bg-emerald-600 text-white shadow-emerald-600/20"
                    : "bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-purple-500/25 active:scale-95"
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 stroke-[2.2]" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Priority 2: Original URL Section */}
          <div className="rounded-xl bg-slate-50 p-3.5 space-y-1">
            <span className="text-xs font-semibold text-slate-500">
              Original URL
            </span>
            <p
              title={original_url}
              className="text-xs text-slate-700 font-mono truncate font-normal"
            >
              {original_url}
            </p>
          </div>

          {/* Priority 3: Expiration Section */}
          <div className="flex items-center justify-between px-1 text-xs">
            <div className="flex items-center gap-1.5 text-slate-500 font-medium">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>Expires At</span>
            </div>
            <span className="font-semibold text-slate-700">
              {formatExpirationDate(expires_at)}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-7 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
          {/* Secondary Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl border border-slate-200/90 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-colors"
          >
            Close
          </button>

          {/* Primary Copy Link Button */}
          <button
            type="button"
            onClick={handleCopy}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500/30 ${
              isCopied
                ? "bg-emerald-600 shadow-emerald-600/20"
                : "bg-[#7C3AED] hover:bg-[#6D28D9] shadow-purple-500/25"
            }`}
          >
            {isCopied ? (
              <>
                <Check className="h-4 w-4 stroke-[2.5]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 stroke-[2.2]" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
