import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // tumhara FastAPI port
});

export default axiosInstance;