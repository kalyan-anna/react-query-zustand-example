import { axiosInstance } from '@/utils/axios.instance';

const getUser = async (id: string) => {
  const { data } = await axiosInstance.get<User>(`/api/users/${id}`);
  return data;
};

const getUsers = async () => {
  const { data } = await axiosInstance.get<User[]>('/api/users');
  return data;
};

const updateUser = async (user: Partial<User>) => {
  const { data } = await axiosInstance.patch<User>(`/api/users/${user.id}`, user);
  return data;
};

export const userApi = { getUser, getUsers, updateUser };
