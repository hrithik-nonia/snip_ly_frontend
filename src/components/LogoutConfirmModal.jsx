import { useEffect } from "react";
import { X, LogOut, User, Loader2 } from "lucide-react";

export default function LogoutConfirmModal({
  isOpen = false,
  onClose,
  onConfirm,
  userEmail = "user@example.com",
  isLoading = false,
}) {
  // Close modal on Escape key press (unless loading)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !isLoading && onClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Semi-transparent Dark Overlay / Backdrop */}
      <div
        onClick={() => {
          if (!isLoading && onClose) onClose();
        }}
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity duration-200 animate-in fade-in"
      />

      {/* Modal Surface Container */}
      <div className="relative w-[calc(100%-32px)] sm:w-full max-w-[420px] rounded-3xl bg-white p-6 sm:p-7 shadow-2xl shadow-slate-900/10 border border-slate-100 z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Close Button (X) */}
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          aria-label="Close logout dialog"
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:opacity-50"
        >
          <X className="h-4 w-4 stroke-[2.2]" />
        </button>

        {/* Top Center Logout Icon Badge */}
        <div className="flex justify-center mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600 ring-8 ring-rose-50/50">
            <LogOut className="h-5 w-5 stroke-[2.2] ml-0.5" />
          </div>
        </div>

        {/* Heading & Subtitle */}
        <div className="text-center space-y-1">
          <h2
            id="logout-modal-title"
            className="text-xl font-bold tracking-tight text-slate-900"
          >
            Logout from your account?
          </h2>
          <p className="text-sm text-slate-500 font-normal leading-relaxed">
            Are you sure you want to log out of your account?
          </p>
        </div>

        {/* User Account Info Card */}
        <div className="mt-5 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3.5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200/90 text-slate-500 shrink-0 shadow-2xs">
            <User className="h-4.5 w-4.5 stroke-[2]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Logged in as
            </p>
            <p className="text-sm font-semibold text-slate-800 truncate">
              {userEmail}
            </p>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="w-full rounded-xl border border-slate-200/90 bg-white py-2.5 px-4 text-sm font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>

          {/* Logout Confirm Button */}
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 py-2.5 px-4 text-sm font-semibold text-white shadow-md shadow-rose-600/20 hover:bg-rose-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-rose-500/30 transition-all disabled:opacity-75 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin stroke-[2.5]" />
                <span>Logging out...</span>
              </>
            ) : (
              <>
                <LogOut className="h-4 w-4 stroke-[2.2]" />
                <span>Logout</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
