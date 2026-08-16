import { Link2 } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#22252A] text-slate-300">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8 sm:px-8">
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Column 1: Brand & Description */}
          <div className="md:col-span-6 space-y-4">
            <NavLink to="/" className="flex items-center gap-2.5">
              <Link2 className="h-6 w-6 text-white stroke-[2.5]" />
              <span className="text-xl font-bold tracking-tight text-white">
                Snip.ly
              </span>
            </NavLink>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed font-normal">
              Simple. Fast. Powerful. The URL shortener built for modern teams
              and creators.
            </p>
          </div>

          {/* Column 3: Company */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-white uppercase">
              COMPANY
            </h3>

            <NavLink
              to="/aboutPage"
              className="text-slate-400 hover:text-white transition-colors font-medium"
            >
              About Us
            </NavLink>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-slate-700/60 my-8" />

        {/* Bottom Bar Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <p>© {currentYear} Snip.ly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
