import { http, HttpResponse } from 'msw';
import { db } from '../data/db';

export const issuesHandlers = [
  http.get('/api/:projectId/issues/count', async ({ params }) => {
    const issues = db.issue.findMany({
      where: {
        projectId: {
          equals: params.projectId as string,
        },
      },
    });

    return HttpResponse.json({ count: issues.length });
  }),

  http.get('/api/:projectId/issues', async ({ params }) => {
    const projectId = params.projectId === 'backlog' ? undefined : (params.projectId as string);
    const issues = db.issue.findMany({
      where: {
        projectId: {
          equals: projectId,
        },
      },
    });

    return HttpResponse.json(issues);
  }),
];
