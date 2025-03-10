import { authHandlers } from './handlers/auth-handlers';
import { issuesHandlers } from './handlers/issues-handlers';
import { notificationHandlers } from './handlers/notification-handlers';
import { projectHandlers } from './handlers/project-handlers';
import { sprintHandlers } from './handlers/sprint-handlers';
import { userHandlers } from './handlers/user-handlers';

export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...projectHandlers,
  ...issuesHandlers,
  ...sprintHandlers,
  ...notificationHandlers,
];
