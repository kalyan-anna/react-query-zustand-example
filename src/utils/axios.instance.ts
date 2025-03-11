import { useAuthStore } from '@/state/auth';
import axios, { InternalAxiosRequestConfig } from 'axios';

const addAuthentication = async (axiosConfig: InternalAxiosRequestConfig) => {
  const accessToken = useAuthStore.getState().accessToken;
  axiosConfig.headers.Authorization = `Bearer ${accessToken}`;
  return axiosConfig;
};

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(addAuthentication);

export { axiosInstance };
