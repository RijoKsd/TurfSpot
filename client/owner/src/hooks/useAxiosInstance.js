import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1234",
});

axiosInstance.interceptors.request.use((config) => {
  let token = null;
  try {
    const persistedUser = localStorage.getItem("persist:root");
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
  }  

  return config;
});

export default axiosInstance;


// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:1234',
// });

// axiosInstance.interceptors.request.use((config) => {
//   let token = null;
//   try {
//     const persistedUser = localStorage.getItem('persist:root');
//     if (persistedUser) {
//       const parsedUser = JSON.parse(persistedUser);
//       token = parsedUser.auth?.token;
//     }
//   } catch (error) {
//     console.error('Error parsing persisted user', error);
//   }
// console.log('token', token);
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default axiosInstance;
