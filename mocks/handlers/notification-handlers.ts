import { http, HttpResponse } from 'msw';
import { db } from '../data/db';

export const notificationHandlers = [
  http.get('/api/:userId/notifications', async ({ params }) => {
    const notifications = db.notification.findMany({
      where: {
        userId: {
          equals: params.userId as string,
        },
      },
    });

    return HttpResponse.json(notifications);
  }),

  http.patch('/api/notifications/:notificationId/read', async ({ params }) => {
    const notification = db.notification.update({
      where: {
        id: {
          equals: params.notificationId as string,
        },
      },
      data: {
        status: 'Read',
      },
    });

    return HttpResponse.json(notification);
  }),
];
