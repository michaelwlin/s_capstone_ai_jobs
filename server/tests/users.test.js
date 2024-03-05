const faker = require('faker');
const axios = require('axios');
const User = require('../models/user');

let users = [];

beforeEach(async () => {
  users = generateUsers(10);

  for (let user of users) {
    await axios.post('http://localhost:4000/api/users', user, { timeout: 5000 });
  }
  });
  
function generateUsers(count) {
  const users = [];
  for(let i = 0; i < count; i++) {
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
  const response = await axios.get('http://localhost:4000/api/users');
  const usersInDb = response.data;
  expect(usersInDb).not.toBeNull();
  // how many users are in the database
  console.log(usersInDb.length + ' users in the database');
});