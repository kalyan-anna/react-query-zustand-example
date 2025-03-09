import { http, HttpResponse } from 'msw';
import { db } from '../data/db';

export const authHandlers = [
  http.post('/api/login', async ({ request }) => {
    const body = await request.json();
    console.log('body:', body);
    const user = db.user.findFirst({
      where: {
        email: {
          equals: '1234',
        },
      },
    });
    if (user) {
      return HttpResponse.json({
        accessToken: '1234',
        currentUserId: user.id,
      });
    }
    return HttpResponse.json({ errorMessage: 'Invalid email or password' }, { status: 400 });
  }),
];
