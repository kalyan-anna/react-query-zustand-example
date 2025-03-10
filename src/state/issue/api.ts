import { axiosInstance } from '@/utils/axios.instance';
import { Issue } from './types';

const getIssues = async (projectId: string) => {
  const { data } = await axiosInstance.get<Issue[]>(`/api/${projectId}/issues`);
  return data;
};

const getIssuesCount = async (projectId: string) => {
  const { data } = await axiosInstance.get<number>(`/api/${projectId}/issues/count`);
  return data;
};

export const issuesAPi = {
  getIssuesCount,
  getIssues,
};
