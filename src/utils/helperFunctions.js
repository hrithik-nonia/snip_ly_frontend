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
