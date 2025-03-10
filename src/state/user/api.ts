import { axiosInstance } from '@/utils/axios.instance';

const getUser = async (id: string) => {
  const { data } = await axiosInstance.get<User>(`/api/user/${id}`);
  return data;
};

const getUsers = async () => {
  const { data } = await axiosInstance.get<User[]>('/api/users');
  return data;
};

export const userApi = { getUser, getUsers };
