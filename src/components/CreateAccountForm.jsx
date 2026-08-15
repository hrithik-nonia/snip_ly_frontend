import { useState } from "react";
import { Link2, ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function CreateAccountForm({ pathname }) {
  const [formData, setFormData] = useState({
    username: "hrithik123",
    email: "you@gmail.com",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    console.log(formData);
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-sm">
      {/* Top Logo Badge */}
      <div className="flex justify-center mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3E8FF] text-[#7C3AED]">
          <Link2 className="h-6 w-6 stroke-[2.5]" />
        </div>
      </div>

      {/* Heading & Subtitle */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          {pathname === "/loginPage" ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {pathname === "/loginPage"
            ? "Login to manage your links"
            : "Start shortening your links for free"}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        {pathname === "/loginPage" ? null : (
          <div className="space-y-1.5">
            <label
              htmlFor="username"
              className="block text-xs font-semibold text-slate-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full rounded-xl border border-slate-200/90 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 transition-all"
            />
            <p className="text-[11px] text-slate-400 font-medium">
              Only letters, numbers and underscore
            </p>
          </div>
        )}

        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-xs font-semibold text-slate-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@gmail.com"
            className="w-full rounded-xl border border-slate-200/90 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 transition-all"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-slate-700"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs font-semibold text-[#7C3AED] hover:underline focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full rounded-xl border border-purple-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 transition-all"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#7C3AED] py-3 px-4 text-sm font-semibold text-white shadow-md shadow-purple-500/20 hover:bg-[#6D28D9] active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30"
        >
          {isLoading ? (
            pathname === "/loginPage" ? (
              "Loging Account..."
            ) : (
              "Creating Account..."
            )
          ) : (
            <>
              <span>
                {pathname === "/loginPage" ? "Login" : "Create Account"}
              </span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </>
          )}
        </button>
      </form>

      {/* Switch to Login Footer */}
      <div className="text-center mt-6 text-sm text-slate-500 font-normal">
        Already have an account?
        <NavLink
          to={pathname === "/loginPage" ? "/registerPage" : "/loginPage"}
          className="font-semibold text-[#7C3AED] hover:underline focus:outline-none"
        >
          {pathname === "/loginPage" ? "Register" : "Login"}
        </NavLink>
      </div>
    </div>
  );
}
