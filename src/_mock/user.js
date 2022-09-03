import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  phoneNumber: faker.phone.number(),
  role: sample(['Admin', 'Customer', 'Seller']),
  email: 'tmarawan11@gmail.com',
  friendsNumber: faker.random.numeric(),
  giftsSentNumber: faker.random.numeric(),
  giftsReceivedNumber: faker.random.numeric(),
}));

export default users;
