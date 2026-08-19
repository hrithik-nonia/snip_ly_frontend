import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import urlApi from "../api/urlApi";
import { toast } from "sonner";
import LinkSuccessModal from "./LinkSuccessModal";

export default function ShortenUrlCard() {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [showSuccessLink, setShowSuccessLink] = useState(false);
  const [showSortedLink, setShowSortedLink] = useState("");

  // api call for url shorten end point
  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      urlApi.createUrlWithAlias(data.originalUrl, data.customAlias),
    onSuccess: (data) => {
      setShowSuccessLink(true);
      setShowSortedLink(data || "Link Successfully Created");
      console.log("Success:", data);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!longUrl.trim()) return;

    // mutation function call
    mutate({ originalUrl: longUrl, customAlias: customAlias });
  };

  return (
    <>
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
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-xl bg-[#7C3AED] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#6D28D9] active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 disabled:opacity-60"
            >
              <span>{isPending ? "Shortening..." : "Shorten"}</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </button>
          </div>
        </form>
      </div>

      {showSuccessLink && (
        <LinkSuccessModal
          isOpen={showSuccessLink}
          onClose={() => setShowSuccessLink(false)}
          linkData={showSortedLink}
        />
      )}
    </>
  );
}
