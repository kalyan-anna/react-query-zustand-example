import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationApi } from './api';
import { notificationsKeys } from './queries';
import { Notification } from './types';

export const useMarkAsReadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) => notificationApi.markAsRead(notificationId),
    onMutate: async (notificationId: string) => {
      const previousNotifications = queryClient.getQueryData<Notification[]>(notificationsKeys.all);
      const updatedNotifications = previousNotifications?.map(notification =>
        notification.id === notificationId ? { ...notification, status: 'read' } : notification,
      );
      queryClient.setQueryData(notificationsKeys.all, updatedNotifications);
      return { previousNotifications };
    },
    onError: (err, notificationId, context) => {
      queryClient.setQueryData(notificationsKeys.all, context?.previousNotifications);
    },
  });
};
