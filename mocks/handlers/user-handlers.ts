import { http, HttpResponse } from 'msw';
import { db } from '../data/db';

export const userHandlers = [
  http.get('/api/users/:id', async ({ params }) => {
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

  http.patch('/api/users/:id', async ({ params, request }) => {
    const body: any = await request.json();
    const user = db.user.update({
      where: {
        id: { equals: params.id as string },
      },
      data: body,
    });
    return HttpResponse.json(user);
  }),
];
