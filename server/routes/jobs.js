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

async function getUniqueJobLocations() {
  try {
    return await Job.distinct("location");
  } catch (error) {
    console.error("Failed to fetch unique job locations:", error);
    throw error;
  }
}

router.get('/locations', async (req, res) => {
  try {
    const locations = await getUniqueJobLocations();
    res.json(locations);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router
