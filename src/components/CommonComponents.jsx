import { NavLink } from "react-router-dom";
import { Link2 } from "lucide-react";

// navbar logo
export function NavLogo() {
  return (
    <>
      <NavLink to="/" className="flex items-center gap-2">
        <Link2 className="h-6 w-6 text-[#7C3AED] stroke-[2.5]" />
        <span className="text-xl font-bold tracking-tight text-[#6D28D9] hover:text-[#550ec8] hover:[text-shadow:0_0_10px_rgba(109,40,217,0.5)] transition-all duration-300 ">
          Snip.ly
        </span>
      </NavLink>
    </>
  );
}
