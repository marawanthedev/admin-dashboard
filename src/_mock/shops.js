import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import users from './user';

const usersName = users.map((user) => user.name);

const shops = [...Array(24)].map(() => ({
  id: faker.datatype.uuid(),
  user: sample([...usersName]),
  name: faker.name.findName(),
  handle: faker.random.word(),
  collection: faker.random.words(),
  description: faker.random.words(),
  tagline: faker.random.word(),
  address: faker.address.city(),
}));

export default shops;
