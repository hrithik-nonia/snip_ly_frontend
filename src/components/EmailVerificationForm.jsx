// built in imports
import { useState, useRef, useEffect } from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// custom imports
import authApi from "../api/authApi";

export default function EmailVerificationForm() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(29);
  const inputRefs = useRef([]);

  // uselocation se email nikala
  const { state } = useLocation();
  const email = state?.email;

  // Resend countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Handle OTP digit change
  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^[0-9]$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace & Navigation keys
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle OTP Paste (e.g., pasting "123456")
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      inputRefs.current[5]?.focus();
    }
  };

  // navigate instant banaya
  const navigate = useNavigate();

  // tanstack query se data veja
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => authApi.otp(data),
    onSuccess: (data) => {
      toast.success(data?.message || "Success!");
      navigate("/loginPage");
    },
    onError: (error) => {
      const detail = error?.response?.data?.detail;

      let message = "Something went wrong";
      if (typeof detail === "string") {
        // simple string error
        message = detail;
      } else if (Array.isArray(detail)) {
        message = detail.map((err) => err.msg).join(", ");
      }
      toast.error(message);
    },
  });

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) return;
    mutate({ otp: fullOtp, email: email });
  };

  const isOtpComplete = otp.join("").length === 6;

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-sm">
      {/* Top Shield Icon Badge */}
      <div className="flex justify-center mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3E8FF] text-[#7C3AED]">
          <ShieldCheck className="h-6 w-6 stroke-[2.5]" />
        </div>
      </div>

      {/* Heading & Subtitle */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Verify Your Email
        </h2>
        <p className="mt-1.5 text-sm text-slate-500">
          We've sent a 6-digit verification code to
        </p>
        <span className="mt-0.5 block text-sm font-semibold text-[#7C3AED]">
          {email}
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 6-Digit Input Row */}
        <div
          className="flex justify-center gap-2 sm:gap-2.5"
          onPaste={handlePaste}
        >
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="h-12 w-11 sm:h-14 sm:w-12 rounded-xl border border-slate-200/90 bg-white text-center text-lg font-bold text-slate-900 shadow-xs focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 transition-all"
              required
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={!isOtpComplete || isPending}
          className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 ${
            !isOtpComplete || isPending
              ? "bg-purple-300 cursor-not-allowed shadow-none"
              : "bg-[#7C3AED] hover:bg-[#6D28D9] shadow-md shadow-purple-500/20 active:scale-[0.98]"
          }`}
        >
          {isPending ? (
            "Verifying..."
          ) : (
            <>
              <span>Verify & Continue</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
