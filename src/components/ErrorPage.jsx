// built in imports
import { AlarmClock, Link2, HeartOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

// custom imports
import { CommonButton } from "./CommonComponents";

export default function ErrorPage({ pathname }) {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-[500px] w-full flex-col items-center justify-center p-6 text-center">
      {pathname === "/linkExpiry410Page" ? (
        <>
          {/* Top Alarm Clock Badge */}
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F5EEFF] text-[#7C3AED] mb-2 shadow-xs">
            <AlarmClock className="h-12 w-12 stroke-[2.2]" />
          </div>
        </>
      ) : (
        <>
          {/* Top Icons Row (Link & Broken Heart) */}
          <div className="flex items-center gap-3 mb-3">
            <Link2 className="h-10 w-10 text-[#7C3AED] stroke-[2.5]" />
            <HeartOff className="h-10 w-10 text-rose-600 stroke-[2.2]" />
          </div>
        </>
      )}

      {/* 410 Error Code */}
      <h1 className="text-6xl sm:text-7xl font-black text-[#D8B4FE] tracking-tight leading-none">
        {pathname === "/linkExpiry410Page" ? "410" : "404"}
      </h1>

      {/* Title */}
      <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
        {pathname === "/linkExpiry410Page" ? "Link Expired" : "Link Not Found"}
      </h2>

      {/* Subtitle */}
      <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xs sm:max-w-sm leading-relaxed">
        {pathname === "/linkExpiry410Page"
          ? "This link has expired and is no longer available."
          : "This short link doesn't exist. Double check the URL and try again."}
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
        {/* Go to Homepage Button */}
        <CommonButton
          isBgColor={true}
          title="Go to Homepage"
          isIcon={true}
          onclick={() => {
            if (window.history.length > 1) {
              window.history.back();
            } else {
              window.location.href = "https://snip-ly-frontend.vercel.app";
            }
          }}
        />

        {/* Create Your Own Link Button */}
        <CommonButton
          title="Create Your Own Link"
          isIcon={true}
          iconPositionLeft={false}
          onclick={() =>
            (window.location.href = "https://snip-ly-frontend.vercel.app")
          }
        />
      </div>
    </div>
  );
}
