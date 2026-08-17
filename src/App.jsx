// built in imports
import { lazy, Suspense } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Lenis from "lenis";
import { useEffect } from "react";
import { Toaster } from "sonner";

// custom imports
const LandingPage = lazy(() => import("./pages/LandingPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LinkExpiry410Page = lazy(() => import("./pages/LinkExpiry410Page"));
const DashBoardPage = lazy(() => import("./pages/DashBoardPage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const OtpPage = lazy(() => import("./pages/OtpPage"));

import Navbar from "./components/NavBar";

// function for saterate login and register from other routes
export function OtherRoutes() {
  return (
    <>
      <Navbar />

      {/* auth routes ke awalaba sara routes yanha  */}
      <main>
        <Outlet />
      </main>
    </>
  );
}

function App() {
  // apply lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  return (
    <>
      <Toaster position="top-center" />
      <Suspense fallback={<h1>Loading.....</h1>}>
        <Routes>
          <Route path="/" element={<OtherRoutes />}>
            <Route index element={<LandingPage />} />
            <Route path="/dashBoardPage" element={<DashBoardPage />} />
            <Route path="/analyticsPage" element={<AnalyticsPage />} />
          </Route>
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/registerPage" element={<RegisterPage />} />
          <Route path="/linkExpiry410Page" element={<LinkExpiry410Page />} />
          <Route path="/notFoundPage" element={<NotFoundPage />} />
          <Route path="/otpPage" element={<OtpPage />} />
          <Route path="/aboutPage" element={<AboutPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
export default App;
