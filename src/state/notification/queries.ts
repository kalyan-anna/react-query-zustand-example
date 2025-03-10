import { useQuery } from '@tanstack/react-query';
import { notificationApi } from './api';
import { useAuthStore } from '../auth';
import { Notification, NotificationStatus } from './types';

export const notificationsKeys = {
  all: ['notifications'] as const,
};

export const useNotificationsQuery = ({
  select,
}: {
  select?: ((data: Notification[]) => Notification[]) | undefined;
}) => {
  const currentUserId = useAuthStore.use.currentUserId() ?? '';
  return useQuery({
    queryKey: notificationsKeys.all,
    queryFn: () => notificationApi.getNotifications(currentUserId),
    select,
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 2,
  });
};

export const useUnreadNotificationsQuery = () => {
  return useNotificationsQuery({
    select: data => data.filter(item => item.status === NotificationStatus.UNREAD),
  });
};
