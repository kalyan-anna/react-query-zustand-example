import { http, HttpResponse } from 'msw';
import { db } from '../data/db';

export const sprintHandlers = [
  http.get('/api/projects/:projectId/sprints/:id', async ({ params }) => {
    const sprint = db.sprint.findFirst({
      where: {
        id: {
          equals: params.id as string,
        },
        projectId: {
          equals: params.projectId as string,
        },
      },
    });

    if (sprint) {
      return HttpResponse.json(sprint);
    }
    return HttpResponse.json({ errorMessage: 'Sprint not found' }, { status: 404 });
  }),

  http.get('/api/projects/:projectId/sprints', async ({ params }) => {
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

  http.patch('/api/projects/:projectId/sprints/:id', async ({ params, request }) => {
    const body: any = await request.json();
    const sprint = db.sprint.update({
      where: {
        id: {
          equals: params.id as string,
        },
        projectId: {
          equals: params.projectId as string,
        },
      },
      data: body,
    });
    return HttpResponse.json(sprint);
  }),
];
