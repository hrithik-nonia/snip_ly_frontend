import { jwtDecode } from "jwt-decode";

export function isTokenValid() {
  const token = localStorage.getItem("access_token");

  if (!token) return false;

  try {
    const decoded = jwtDecode(token); // decode karo
    const currentTime = Date.now() / 1000; // seconds mein
    return decoded.exp > currentTime; // expire nahi hua?
  } catch {
    return false; // invalid token
  }
}

export const setToken = (token) => {
  localStorage.setItem("access_token", token);
  window.dispatchEvent(new Event("auth-change"));
};

export const removeToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_data");
  window.dispatchEvent(new Event("auth-change"));
};

export const formatCount = (num = 0) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M+`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K+`;
  return num.toString();
};

export function parseUserAgent(ua) {
  const s = ua.toLowerCase();

  // Browser
  let browser = "Unknown Browser";
  if (s.includes("edg/") || s.includes("edge/")) browser = "Edge";
  else if (s.includes("chrome/")) browser = "Chrome";
  else if (s.includes("firefox/")) browser = "Firefox";
  else if (s.includes("safari/") && !s.includes("chrome")) browser = "Safari";
  else if (s.includes("opr/") || s.includes("opera/")) browser = "Opera";

  // OS
  let os = "Unknown OS";
  if (s.includes("windows nt 10")) os = "Windows 10/11";
  else if (s.includes("windows nt 6.1")) os = "Windows 7";
  else if (s.includes("android")) os = "Android";
  else if (s.includes("iphone") || s.includes("ipad")) os = "iOS";
  else if (s.includes("mac os x")) os = "macOS";
  else if (s.includes("linux")) os = "Linux";

  return `${browser} on ${os}`;
}

export const readableDate = (longDate) => {
  return new Date(longDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}