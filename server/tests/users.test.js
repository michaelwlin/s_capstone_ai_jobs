const faker = require('faker');
const axios = require('axios');
const User = require('../models/user');
import config from '../apiConfig';

let users = [];

beforeEach(async () => {
  users = generateUsers(10);

  for (let user of users) {
    await axios.post(`${config.API_URL}/users`, user, { timeout: 5000 }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',

      },
      credentials: 'include', // Include cookies in the request and response
    },);
  }
});

function generateUsers(count) {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      userName: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      premiumUser: faker.datatype.boolean(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    });
  }
  return users;
}

// Test for adding users to mongodb
test('should add users to mongodb', async () => {
  const response = await axios.get(`${config.API_URL}/users`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',

    },
    credentials: 'include', // Include cookies in the request and response
  },);
  const usersInDb = response.data;
  expect(usersInDb).not.toBeNull();
  // how many users are in the database
  console.log(usersInDb.length + ' users in the database');
});