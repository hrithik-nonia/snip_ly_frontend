import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // tumhara FastAPI port
  withCredentials: true,
});

export default axiosInstance;