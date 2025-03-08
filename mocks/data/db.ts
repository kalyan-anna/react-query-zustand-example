import { factory, primaryKey } from '@mswjs/data';
import { faker } from '@faker-js/faker';
import userData from './users.json';

export const db = factory({
  user: {
    id: primaryKey(faker.string.uuid),
    email: () => faker.internet.email(),
    password: () => 'Summertime2025',
    name: () => faker.person.fullName(),
  },
});

for (const user of userData) {
  db.user.create(user);
}
