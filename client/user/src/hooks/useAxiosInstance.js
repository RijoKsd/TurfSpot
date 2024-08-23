import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:1234",
  baseURL: "https://turf-spot-be.vercel.app",
});

axiosInstance.interceptors.request.use((config) => {
  let token = null;
  try {
    const persistedUser = localStorage.getItem("persist:user");
    if (persistedUser) {
      const parsedUser = JSON.parse(persistedUser);
      if (parsedUser.auth) {
        const parsedAuth = JSON.parse(parsedUser.auth);
        token = parsedAuth.token;
      }
    }
  } catch (error) {
    console.error("Error parsing persisted user data:", error);
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export default axiosInstance;
