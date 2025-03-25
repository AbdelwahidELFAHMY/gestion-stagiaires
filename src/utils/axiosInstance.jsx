import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 1000000,
  headers: { "Content-Type": "application/json" },
});

// Add interceptor to dynamically insert token
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  console.log("Request made with:", config);
  return config;
});

export default axiosInstance;
