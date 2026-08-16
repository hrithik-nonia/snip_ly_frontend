import { useState } from "react";
import { ArrowRight, CheckCircle2, Copy, Check } from "lucide-react";

export default function ShortenUrlCard({ onShortenSuccess }) {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState("snip.ly/aB3kP");
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!longUrl.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Generate mock shortened link or use custom alias
      const generated = customAlias.trim()
        ? `snip.ly/${customAlias.trim()}`
        : "snip.ly/aB3kP";

      setShortenedUrl(generated);
      if (onShortenSuccess) {
        onShortenSuccess({
          longUrl,
          customAlias,
          expiryDate,
          shortenedUrl: generated,
        });
      }
    }, 600);
  };

  const handleCopy = () => {
    if (!shortenedUrl) return;
    navigator.clipboard.writeText(`https://${shortenedUrl}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm">
      {/* Title */}
      <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-5">
        Shorten a New URL
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Long URL Input */}
        <div>
          <input
            type="url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Paste your long URL here..."
            required
            className="w-full rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 transition-all"
          />
        </div>

        {/* Row 2: Custom Alias & Expiry Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Custom Alias */}
          <div>
            <input
              type="text"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              placeholder="Custom alias (optional)"
              className="w-full rounded-xl border border-slate-200/90 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 transition-all"
            />
          </div>

          {/* Expiry Date Picker */}
          <div className="relative">
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200/90 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 transition-all"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-1">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-xl bg-[#7C3AED] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#6D28D9] active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 disabled:opacity-60"
          >
            <span>{isLoading ? "Shortening..." : "Shorten"}</span>
            <ArrowRight className="h-4 w-4 stroke-[2.5]" />
          </button>
        </div>
      </form>

      {/* Success Result Banner */}
      {shortenedUrl && (
        <div className="mt-5 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 animate-in fade-in duration-200">
          {/* Left: Green Checkmark & Link */}
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 fill-emerald-100 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-emerald-800">
                Your link is ready:
              </p>
              <a
                href={`https://${shortenedUrl}`}
                target="_blank"
                rel="noreferrer"
                className="text-base font-bold text-[#7C3AED] hover:underline"
              >
                {shortenedUrl}
              </a>
            </div>
          </div>

          {/* Right: Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-emerald-700 shadow-xs hover:bg-emerald-100/60 active:scale-95 transition-all focus:outline-none"
          >
            {isCopied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-emerald-600" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
