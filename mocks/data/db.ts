import { factory, primaryKey } from '@mswjs/data';
import { faker } from '@faker-js/faker';
import userData from './users.json';
import projectData from './projects.json';
import issueData from './issues.json';
import sprintData from './sprints.json';

export const db = factory({
  user: {
    id: primaryKey(faker.string.uuid),
    email: () => faker.internet.email(),
    password: () => 'Summertime2025',
    name: () => faker.person.fullName(),
  },
  project: {
    id: primaryKey(faker.string.uuid),
    name: () => faker.lorem.words(3),
    ownerId: String,
  },
  issue: {
    id: primaryKey(faker.string.uuid),
    issueNumber: String,
    summary: () => faker.lorem.words(5),
    description: () => faker.lorem.paragraph(),
    projectId: String,
    assigneeUserId: String,
    reporterUserId: String,
    status: () => faker.helpers.arrayElement(['TO_DO', 'IN_PROGRESS', 'DONE', 'REVIEW']) as string,
    type: () => faker.helpers.arrayElement(['BUG', 'STORY']) as string,
    storyPoints: () => faker.helpers.arrayElement([1, 2, 3, 5, 8, 13]) as number,
    sprintId: String,
    orderIndex: Number,
  },
  sprint: {
    id: primaryKey(faker.string.uuid),
    name: () => faker.lorem.words(2),
    projectId: String,
    goal: () => faker.lorem.sentence(),
    startDate: () => faker.date.recent().toISOString(),
    endDate: () => faker.date.future().toISOString(),
    status: () => faker.helpers.arrayElement(['ACTIVE', 'COMPLETED', 'PLANNED']) as string,
  },
  notification: {
    id: primaryKey(faker.string.uuid),
    userId: String,
    message: () => faker.lorem.sentence(),
    status: String,
  },
});

for (const user of userData) {
  db.user.create(user);
}

for (const project of projectData) {
  db.project.create(project);
}

function highestOrderIndex(projectId: string, sprintId?: string) {
  const maxOrderIndex = db.issue
    .findMany({
      where: {
        projectId: {
          equals: projectId,
        },
        sprintId: {
          equals: sprintId,
        },
      },
    })
    .reduce((max, issue) => (issue.orderIndex > max ? issue.orderIndex : max), 0);

  return maxOrderIndex;
}

for (let i = 0; i < issueData.length; i++) {
  const issue = issueData[i];
  db.issue.create({
    ...issue,
    orderIndex: highestOrderIndex(issue.projectId, issue.sprintId) + 1,
  });
  if (issue.assigneeUserId) {
    db.notification.create({
      message: `${issue.issueNumber} has been assigned to you.`,
      userId: issue.assigneeUserId,
      status: 'UNREAD',
    });
  }
}

for (const sprint of sprintData) {
  db.sprint.create(sprint);
}
