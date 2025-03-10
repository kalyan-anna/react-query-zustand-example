import { axiosInstance } from '@/utils/axios.instance';
import { Sprint } from './type';

const getSprints = async (id: string) => {
  const { data } = await axiosInstance.get<Sprint[]>(`/api/sprints/${id}`);
  return data;
};

export const sprintApi = { getSprints };
