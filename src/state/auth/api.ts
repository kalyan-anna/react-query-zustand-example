import { axiosInstance } from '@/utils/axios.instance';
import { LoginRequest, LoginResponse } from './types';

const login = async (loginRequest: LoginRequest) => {
  const { data } = await axiosInstance.post<LoginResponse>(
    '/login',
    loginRequest,
  );

  return data;
};

export const authApi = { login };
