import { useState } from "react";
import { Link2, ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection({ onShorten }) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onShorten) onShorten(url);
    }, 700);
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-[#6D28D9] via-[#7C3AED] to-[#5B21B6] py-20 px-4 sm:px-6 sm:py-28 lg:py-32 text-center text-white overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto space-y-6 z-10">
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
          Shorten, Share & Track Your Links
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-purple-100/90 max-w-2xl mx-auto font-normal leading-relaxed">
          Create short links and track clicks with powerful analytics. Enhance
          your digital presence with lightning-fast redirection.
        </p>

        {/* URL Shortener Form */}
        <form
          onSubmit={handleSubmit}
          className="pt-4 flex flex-col items-center justify-center"
        >
          <div className="relative flex items-center w-full max-w-2xl rounded-2xl bg-white p-2 shadow-2xl shadow-purple-950/40 transition-all focus-within:ring-4 focus-within:ring-purple-300/40">
            {/* Input Icon */}
            <Link2 className="h-5 w-5 text-purple-400 ml-3 shrink-0 stroke-[2.2]" />

            {/* Input Field */}
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your long URL here..."
              required
              className="w-full bg-transparent px-3 py-2.5 text-sm sm:text-base text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />

            {/* Shorten Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200/80 px-5 py-3 text-sm sm:text-base font-semibold text-[#7C3AED] shadow-xs active:scale-[0.98] transition-all shrink-0 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:opacity-60"
            >
              <span>{isLoading ? "Shortening..." : "Shorten"}</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Micro-text below form */}
          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs sm:text-sm text-purple-200/90 font-medium">
            <Sparkles className="h-4 w-4 text-purple-200" />
            <span>No account needed to try • Free forever</span>
          </div>
        </form>
      </div>
    </section>
  );
}
