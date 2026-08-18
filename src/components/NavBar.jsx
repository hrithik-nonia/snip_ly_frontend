// built in imports
import { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// custom imports
import { NavLogo } from "./CommonComponents";
import { isTokenValid } from "../utils/helperFunctions";
import LogoutConfirmModal from "./LogoutConfirmModal";
import authApi from "../api/authApi";
import { removeToken } from "../utils/helperFunctions";

export default function Navbar({ onLoginClick, onRegisterClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showlogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => isTokenValid());
  const navigate = useNavigate();

  // login hai ya nahi ye find karne ke liya
  // location.pathname change hoga tab isLoggedIn recalculate hoga
  useEffect(() => {
    const sync = () => setIsLoggedIn(isTokenValid());

    window.addEventListener("auth-change", sync);
    return () => window.removeEventListener("auth-change", sync);
  }, []);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: authApi.logout,

    onSuccess: (data) => {
      toast.success(data?.message || "Success!");
    },

    onError: (error) => {
      toast.error(error?.message);
    },
  });

  // handel logout
  const handleConfirmLogout = async () => {
    try {
      await mutateAsync(); // ✅ response ka wait karega
    } catch {
      // error toast onError mein already handle ho raha hai
    } finally {
      removeToken();
      localStorage.removeItem("user_data");
      navigate("/");
      setShowLogoutConfirmModal(false);
    }
  };

  // get user data from localstorage
  const userData = JSON.parse(localStorage.getItem("user_data"));

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Dashboard", to: "/dashBoardPage" },
    { name: "About", to: "/aboutPage" },
  ];

  const authLinks = [
    { name: "Login", to: "/loginPage" },
    { name: "Register", to: "/registerPage" },
  ];

  return (
    <>
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
              {!isLoggedIn ? (
                authLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-2 text-sm font-semibold ${link.name === "Login" ? "text-[#6D28D9] bg-[#DDD0FA] hover:bg-[#D4C2F8] border border-[#C4B5FD]/70 rounded-xl transition-colors" : "text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-xl shadow-sm hover:shadow-purple-500/25 transition-all"} focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                  >
                    {link.name}
                  </NavLink>
                ))
              ) : (
                <button
                  className="px-4 py-2 text-sm font-semibold bg-red-500/80 hover:bg-red-400 rounded-xl transition-colors text-white  shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 flex gap-1"
                  onClick={() => setShowLogoutConfirmModal(true)}
                >
                  <LogOut size={18} />
                  <span>Log Out</span>
                </button>
              )}
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

      {/* Logout Confirm Modal */}
      {showlogoutConfirmModal && (
        <LogoutConfirmModal
          isOpen={showlogoutConfirmModal}
          userEmail={userData.email}
          isLoading={isPending}
          onClose={() => setShowLogoutConfirmModal(false)}
          onConfirm={handleConfirmLogout}
        />
      )}
    </>
  );
}
