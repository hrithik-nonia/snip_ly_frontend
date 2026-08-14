// built in imports
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

// custom imports
import { NavLogo } from "./CommonComponents";

export default function Navbar({ onLoginClick, onRegisterClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Dashboard", to: "/dashBoardPage" },
    { name: "Analytics", to: "/analyticsPage" },
    { name: "About", to: "/aboutPage" },
  ];

  const authLinks = [
    { name: "Login", to: "/loginPage" },
    { name: "Register", to: "/registerPage" },
  ];

  return (
    <header className="w-full bg-[#E9DFFC]/90 backdrop-blur-md border-b border-purple-200/60">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand Logo */}
          <NavLogo />

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#6D28D9] font-semibold"
                      : "text-slate-700 hover:text-[#6D28D9]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right: Auth Action Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {/* auth Button */}
            {authLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={`px-4 py-2 text-sm font-semibold ${link.name === "Login" ? "text-[#6D28D9] bg-[#DDD0FA] hover:bg-[#D4C2F8] border border-[#C4B5FD]/70 rounded-xl transition-colors" : "text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-xl shadow-sm hover:shadow-purple-500/25 transition-all"} focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#6D28D9] rounded-lg hover:bg-purple-200/50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-purple-200/50 bg-[#E9DFFC] px-4 pt-3 pb-5 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className="text-sm font-medium text-slate-700 hover:text-[#6D28D9] py-1.5 px-2 rounded-lg hover:bg-purple-200/50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="pt-2 border-t border-purple-200/60 flex flex-col gap-2">
            <button
              type="button"
              onClick={onLoginClick}
              className="w-full py-2.5 text-center text-sm font-semibold text-[#6D28D9] bg-[#DDD0FA] border border-[#C4B5FD]/70 rounded-xl"
            >
              Login
            </button>
            <button
              type="button"
              onClick={onRegisterClick}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[#7C3AED] rounded-xl shadow-sm"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
