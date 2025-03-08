import axios, { InternalAxiosRequestConfig } from 'axios';

const addAuthentication = async (axiosConfig: InternalAxiosRequestConfig) => {
  axiosConfig.headers.Authorization = `Bearer TODO`;
  return axiosConfig;
};

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(addAuthentication);

export { axiosInstance };
