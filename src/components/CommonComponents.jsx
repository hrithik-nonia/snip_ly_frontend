import { NavLink } from "react-router-dom";
import { Link2 } from "lucide-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

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

// common button
export function CommonButton({
  title,
  isBgColor = false,
  isIcon = false,
  iconPositionLeft = true,
  onclick,
}) {
  return (
    <>
      <button
        type="button"
        className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl ${isBgColor ? "bg-[#7C3AED] text-white hover:bg-[#6D28D9] focus:ring-[#7C3AED]/30" : "border border-purple-200/90 bg-white text-[#7C3AED] hover:bg-purple-50/60 focus:ring-[#7C3AED]/20"}  px-6 py-3 text-sm font-semibold shadow-md shadow-purple-500/20 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 `}
        onClick={() => onclick}
      >
        {isIcon ? (
          iconPositionLeft ? (
            <>
              <ArrowLeft className="h-4 w-4 stroke-[2.5]" />
              <span>{title}</span>
            </>
          ) : (
            <>
              <span>{title}</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </>
          )
        ) : (
          <span>{title}</span>
        )}
      </button>
    </>
  );
}
