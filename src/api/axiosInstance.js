import axios from "axios"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  withCredentials: true,
})

// Request interceptor — har request mein token lagao
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor — 401 aaye toh refresh karo
let isRefreshing = false  // baar baar refresh na ho

axiosInstance.interceptors.response.use(
  (response) => response,  // success — as is return karo

  async (error) => {
    const originalRequest = error.config

    // 401 aaya aur already retry nahi ki
    if (error.response?.status === 401 && !originalRequest._retry) {

      if (isRefreshing) return Promise.reject(error)

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Refresh token se naya access token lo
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/auth/refresh`,
          {},
          { withCredentials: true }
        )

        const newToken = response.data.access_token

        // LocalStorage update karo
        localStorage.setItem("access_token", newToken)

        // Original request mein naya token lagao
        originalRequest.headers.Authorization = `Bearer ${newToken}`

        isRefreshing = false

        // Original request retry karo
        return axiosInstance(originalRequest)

      } catch (refreshError) {
        // Refresh bhi fail — logout karo
        isRefreshing = false
        localStorage.removeItem("access_token")
        localStorage.removeItem("user_data")
        window.location.href = "/loginPage"
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance