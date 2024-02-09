const mongoose = require('mongoose')

const Jobs = mongoose.model(
  'Jobs',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    qualifications: {
      type: String,
      required: false,
    },
    seniority_level: {
      type: String,
      required: false,
    },
    employment_type: {
      type: String,
      required: false,
    },
    job_function: {
      type: String,
      required: false,
    },
    industries: {
      type: String,
      required: false,
    },
  }),
)

module.exports = Jobs
