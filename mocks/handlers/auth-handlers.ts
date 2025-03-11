import { http, HttpResponse } from 'msw';
import { db } from '../data/db';

export const authHandlers = [
  http.post('/api/login', async ({ request }) => {
    const body: any = await request.json();

    const user = db.user.findFirst({
      where: {
        email: {
          equals: body.email,
        },
      },
    });

    if (user && user.password === body.password) {
      return HttpResponse.json({
        accessToken: '1234DummyToken',
        currentUserId: user.id,
      });
    }
    return HttpResponse.json({ errorMessage: 'Invalid email or password' }, { status: 400 });
  }),

  http.post('/api/logout', async () => {
    // TODO
    return HttpResponse.json();
  }),
];
