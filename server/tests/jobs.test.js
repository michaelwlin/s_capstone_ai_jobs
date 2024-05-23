const faker = require('faker');
const axios = require('axios');
const Jobs = require('../models/jobs');
const User = require('../models/user');

let jobs = [];

beforeEach(async () => {
  jobs = generateJobs(10);

  for (let job of jobs) {
    await axios.post('http://localhost:4000/api/jobs', job, { timeout: 5000 });
  }
});

function generateJobs(count) {
  const jobs = [];
  for (let i = 0; i < count; i++) {
    jobs.push({
      title: faker.name.jobTitle(),
      description: faker.name.jobDescriptor(),
      location: faker.address.city(),
      skills: [faker.name.jobType(), faker.name.jobType()],
    });
  }
  return jobs;
}

// Test for adding jobs to mongodb
test('should add jobs to mongodb', async () => {
  const response = await axios.get('http://localhost:4000/api/jobs');
  const jobsInDb = response.data;
  expect(jobsInDb).not.toBeNull();
  // How many jobs are in the database
  console.log(jobsInDb.length + ' jobs in the database');
});

// Test for fetching a job by ID
test('should fetch a job by ID', async () => {
  const job = jobs[0];
  const response = await axios.get(`http://localhost:4000/api/jobs/${job._id}`);
  expect(response.status).toBe(200);
  expect(response.data.title).toBe(job.title);
});

// Test for fetching jobs with filters
test('should fetch jobs with filters', async () => {
  const keyword = jobs[0].title.split(' ')[0];
  const response = await axios.get(`http://localhost:4000/api/jobs?keyword=${keyword}`);
  expect(response.status).toBe(200);
  expect(response.data.jobs.length).toBeGreaterThan(0);
  expect(response.data.jobs[0].title).toContain(keyword);
});

// Test for fetching job locations
test('should fetch unique job locations', async () => {
  const response = await axios.get('http://localhost:4000/api/jobs/locations');
  expect(response.status).toBe(200);
  expect(response.data.length).toBeGreaterThan(0);
});