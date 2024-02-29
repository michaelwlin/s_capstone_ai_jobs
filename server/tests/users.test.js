const faker = require('faker');
const User = require('../models/user');

let users = [];

beforeEach(() => {
  users = generateUsers(10);
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

// Test for generateUsers function
test('generateUsers should generate correct number of users', () => {
  const count = 10;
  const users = generateUsers(count);
  expect(users.length).toBe(count);

  // Debug: Print the generated users
  console.log(users);
});