import { axiosInstance } from '@/utils/axios.instance';
import { CreateSprintRequest, Sprint } from './type';

const getSprints = async (projectId: string, sprintId: string) => {
  const { data } = await axiosInstance.get<Sprint[]>(
    `/api/projects/${projectId}sprints/${sprintId}`,
  );
  return data;
};

const createSprint = async (projectId: string, sprint: CreateSprintRequest) => {
  const { data } = await axiosInstance.post<Sprint>(`/api/projects/${projectId}/sprints`, sprint);
  return data;
};

const updateSprint = async (projectId: string, sprint: Partial<Sprint>) => {
  const { data } = await axiosInstance.patch<Sprint>(
    `/api/projects/${projectId}sprints/${sprint.id}`,
    sprint,
  );
  return data;
};

export const sprintApi = { getSprints, createSprint, updateSprint };
