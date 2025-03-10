import { axiosInstance } from '@/utils/axios.instance';
import { Notification } from './types';

const getNotifications = async (userId: string) => {
  const { data } = await axiosInstance.get<Notification[]>(`/api/${userId}/notifications`);
  return data;
};

export const notificationApi = { getNotifications };
