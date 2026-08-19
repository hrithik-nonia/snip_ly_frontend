import { Heart, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const currentYear = new Date().getFullYear();

  const offerings = [
    "Short links in seconds",
    "Click analytics with country and device data",
    "Custom alias for your links",
    "Fast redirect under 100ms",
  ];

  const techStack = ["FastAPI", "React", "MongoDB", "Redis"];

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col justify-between py-12 px-4 sm:px-6">
      {/* Main Content Container */}
      <main className="max-w-2xl mx-auto w-full text-center space-y-10">
        {/* Page Title & Subtitle */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            About Snip.ly
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-normal">
            A simple, fast and powerful URL shortener built for everyone.
          </p>
        </div>

        {/* Section 1: What is Snip.ly? */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xl font-bold text-slate-900">What is Snip.ly?</h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto font-normal">
            Snip.ly is a modern URL shortener that helps you create short, clean
            links and track their performance with powerful analytics. Whether
            you are sharing links on social media or running a marketing
            campaign, Snip.ly gives you the insights you need.
          </p>
        </section>

        <div className="border-t border-slate-100 max-w-lg mx-auto" />

        {/* Section 2: What we offer */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">What we offer</h2>
          <div className="inline-block text-left">
            <ul className="space-y-2.5 text-sm text-slate-600 font-medium">
              {offerings.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="border-t border-slate-100 max-w-lg mx-auto" />

        {/* Section 3: Built with */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Built with</h2>
          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
            {techStack.map((tech, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-slate-100/80 py-2.5 px-4 text-xs font-semibold text-slate-700 shadow-2xs"
              >
                {tech}
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-slate-100 max-w-lg mx-auto" />

        {/* Section 4: Developer */}
        <section className="space-y-3 pb-6">
          <h2 className="text-xl font-bold text-slate-900">Developer</h2>
          <p className="text-sm text-slate-600 font-medium flex items-center justify-center gap-1">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-rose-500 fill-rose-500 inline" />
            <span>by Hrithik</span>
          </p>

          <div className="pt-2">
            <a
              href="https://github.com/hrithik-nonia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors focus:outline-none"
            >
              <span>View on GitHub</span>
              <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
            </a>
          </div>
        </section>
      </main>

      {/* Footer Bar */}
      <footer className="max-w-7xl mx-auto w-full pt-6 border-t border-slate-100 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
        <p>© {currentYear} Snip.ly. Built with FastAPI + React</p>

        <div className="flex flex-wrap items-center gap-4 text-slate-500">
          <a href="#terms" className="hover:text-slate-800 transition-colors">
            Terms of Service
          </a>
          <a href="#privacy" className="hover:text-slate-800 transition-colors">
            Privacy Policy
          </a>
          <a href="#github" className="hover:text-slate-800 transition-colors">
            GitHub
          </a>
          <a href="#status" className="hover:text-slate-800 transition-colors">
            Status
          </a>
        </div>
      </footer>
    </div>
  );
}
