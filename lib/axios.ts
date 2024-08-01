import axios from "axios";
import { cookies } from "next/headers";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

axiosInstance.interceptors.request.use(
  (config) => {
    const userCookie = cookies().get("userCookie");
    if (userCookie) {
      config.headers["Cookie"] = `user=${JSON.stringify(userCookie)}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
