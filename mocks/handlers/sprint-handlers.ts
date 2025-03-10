import { http, HttpResponse } from 'msw';
import { db } from '../data/db';

export const sprintHandlers = [
  http.get('/api/sprint/:id', async ({ params }) => {
    const sprint = db.sprint.findFirst({
      where: {
        id: {
          equals: params.id as string,
        },
      },
    });

    if (sprint) {
      return HttpResponse.json(sprint);
    }
    return HttpResponse.json({ errorMessage: 'Sprint not found' }, { status: 404 });
  }),

  http.get('/api/:projectId/sprints', async ({ params }) => {
    const sprints = db.sprint.findMany({
      where: {
        projectId: {
          equals: params.projectId as string,
        },
      },
    });

    const enrichedSprints = sprints.map(sprint => {
      const issues = db.issue.findMany({
        where: {
          sprintId: {
            equals: sprint.id,
          },
        },
      });
      return {
        ...sprint,
        issues,
      };
    });

    return HttpResponse.json(enrichedSprints);
  }),
];
