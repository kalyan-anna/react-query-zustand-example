import { Notification, NotificationStatus, UpdateNotificationMutation } from '@generated/graphql';
import { useCallback } from 'react';

export const useReadNotificationMutation = (): [
  (item: Notification) => void,
  MutationResult<UpdateNotificationMutation>,
] => {
  const [readNotification, result] = useMutation(UPDATE_NOTIFICATION_MUTATION);

  const readNotificationCb = useCallback(
    (item: Notification) => {
      readNotification({
        variables: {
          id: item.id,
          status: NotificationStatus.Read,
        },
        optimisticResponse: {
          updateNotification: {
            ...item,
            __typename: 'Notification',
            status: NotificationStatus.Read,
          },
        },
      });
    },
    [readNotification],
  );

  return [readNotificationCb, result];
};
