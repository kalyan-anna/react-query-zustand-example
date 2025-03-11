import { axiosInstance } from '@/utils/axios.instance';
import { LoginRequest, LoginResponse } from './types';

const login = async (loginRequest: LoginRequest) => {
  const { data } = await axiosInstance.post<LoginResponse>('/api/login', loginRequest);
  return data;
};

const logout = async () => {
  const { data } = await axiosInstance.post('/api/logout');
  return data;
};

export const authApi = { login, logout };
