const express = require('express')
const validateID = require('../middleware/validateID')
const Jobs = require('../models/jobs')

const router = express.Router()

router.get('/', async (req, res) => {
  const jobs = await Jobs.find().sort('name')
  res.send(jobs)
})

router.get('/:id', validateID, async (req, res) => {
  const job = await Jobs.findById(req.params.id)
  if (!job) return res.status(404).send()
  res.send(job)
})

module.exports = router
