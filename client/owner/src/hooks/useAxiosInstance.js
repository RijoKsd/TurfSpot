import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

axiosInstance.interceptors.request.use((config) => {
 const token = JSON.parse(
   JSON.parse(localStorage.getItem("persist:root"))?.auth
 )?.token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
