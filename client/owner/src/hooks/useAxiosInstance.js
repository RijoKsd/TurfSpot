import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("persist:root");
  console.log(token, "token")
  // config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default axiosInstance;
