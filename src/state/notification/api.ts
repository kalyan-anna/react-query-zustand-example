import { axiosInstance } from '@/utils/axios.instance';
import { Notification } from './types';

const getNotifications = async (userId: string) => {
  const { data } = await axiosInstance.get<Notification[]>(`/api/${userId}/notifications`);
  return data;
};

const markAsRead = async (notificationId: string) => {
  const { data } = await axiosInstance.put<Notification>(
    `/api/notifications/${notificationId}/read`,
  );
  return data;
};

export const notificationApi = { getNotifications, markAsRead };
