import axios, { AxiosRequestConfig } from "axios";
import { getToken, removeToken } from "../store/authStore";

const BASE_URL = "http://localhost:9999";
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken() ? getToken() : "",
    }, // 어차피 JWT는 만료되면? 그 토큰은 쓸 수 없게되니까
    withCredentials: true,
    ...config,
  });
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        removeToken();
        window.location.href = "/login";
      }
      return Promise.reject(error);
      //로그인 만료처리
    }
  );
  return axiosInstance;
};
export const httpClient = createClient();
