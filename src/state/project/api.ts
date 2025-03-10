import { axiosInstance } from '@/utils/axios.instance';
import { Project } from './types';

const getProject = async (id: string) => {
  const { data } = await axiosInstance.get<Project>(`/api/project/${id}`);
  return data;
};

const getProjects = async () => {
  const { data } = await axiosInstance.get<Project[]>('/api/projects');
  return data;
};

export const projectApi = { getProject, getProjects };
