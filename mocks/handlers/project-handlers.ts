import { http, HttpResponse } from 'msw';
import { db } from '../data/db';

export const projectHandlers = [
  http.get('/api/projects/:id', async ({ params }) => {
    const project = db.project.findFirst({
      where: {
        id: {
          equals: params.id as string,
        },
      },
    });

    if (project) {
      return HttpResponse.json(project);
    }
    return HttpResponse.json({ errorMessage: 'Project not found' }, { status: 404 });
  }),

  http.get('/api/projects', async () => {
    const projects = db.project.getAll();
    return HttpResponse.json(projects);
  }),
];
