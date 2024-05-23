const faker = require('faker');
const axios = require('axios');
const User = require('../models/user');

let users = [];

beforeEach(async () => {
  users = generateUsers(10);

  for (let user of users) {
    await axios.post('http://localhost:4000/api/auth/register', user, { timeout: 5000 });
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
    });
  }
  return users;
}

// Test for registering users
test('should register users', async () => {
  const response = await axios.get('http://localhost:4000/api/users');
  const usersInDb = response.data;
  expect(usersInDb).not.toBeNull();
  // How many users are in the database
  console.log(usersInDb.length + ' users in the database');
});

// Test for logging in users
test('should login users', async () => {
  const user = users[0];
  const response = await axios.post('http://localhost:4000/api/auth/login', {
    userName: user.userName,
    password: user.password
  });
  expect(response.status).toBe(200);
  expect(response.data).toBe('Login Successful');
});

// Test for validating tokens
test('should validate tokens', async () => {
  const user = users[0];
  const loginResponse = await axios.post('http://localhost:4000/api/auth/login', {
    userName: user.userName,
    password: user.password
  });

  const validateResponse = await axios.post('http://localhost:4000/api/auth/validate', {}, {
    headers: {
      'Cookie': `accessToken=${loginResponse.data.accessToken}`
    }
  });

  expect(validateResponse.status).toBe(200);
  expect(validateResponse.data.isAuthenticated).toBe(true);
});

// Test for changing passwords
test('should change passwords', async () => {
  const user = users[0];
  const loginResponse = await axios.post('http://localhost:4000/api/auth/login', {
    userName: user.userName,
    password: user.password
  });

  const newPassword = 'newPassword123';
  const changePasswordResponse = await axios.post('http://localhost:4000/api/auth/change_password', {
    userId: user._id,
    currentPassword: user.password,
    newPassword: newPassword
  }, {
    headers: {
      'Authorization': `Bearer ${loginResponse.data.accessToken}`
    }
  });

  expect(changePasswordResponse.status).toBe(200);
  expect(changePasswordResponse.data).toBe('Password updated successfully');

  const loginWithNewPasswordResponse = await axios.post('http://localhost:4000/api/auth/login', {
    userName: user.userName,
    password: newPassword
  });

  expect(loginWithNewPasswordResponse.status).toBe(200);
  expect(loginWithNewPasswordResponse.data).toBe('Login Successful');
});

// Test for logging out users
test('should logout users', async () => {
  const user = users[0];
  const loginResponse = await axios.post('http://localhost:4000/api/auth/login', {
    userName: user.userName,
    password: user.password
  });

  const logoutResponse = await axios.post('http://localhost:4000/api/auth/logout', {}, {
    headers: {
      'Cookie': `refreshToken=${loginResponse.data.refreshToken}`
    }
  });

  expect(logoutResponse.status).toBe(200);
  expect(logoutResponse.data).toBe('Logged out successfully');
});