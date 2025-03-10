import { http, HttpResponse } from 'msw';
import { db } from '../data/db';

export const userHandlers = [
  http.get('/api/user/:id', async ({ params }) => {
    const user = db.user.findFirst({
      where: {
        id: {
          equals: params.id as string,
        },
      },
    });

    if (user) {
      return HttpResponse.json(user);
    }
    return HttpResponse.json({ errorMessage: 'User not found' }, { status: 404 });
  }),

  http.get('/api/users', async () => {
    const users = db.user.getAll();
    return HttpResponse.json(users);
  }),
];
