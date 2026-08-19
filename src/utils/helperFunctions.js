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