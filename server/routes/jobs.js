const express = require('express')
const validateID = require('../middleware/validateID')
const Jobs = require('../models/jobs')
const Users = require('../models/user')

const router = express.Router()

router.get('/', async (req, res) => {
  const { keyword, location, useSkills, userId } = req.query
  const matchQuery = {}

  if (keyword) {
    matchQuery['$or'] = [
      { title: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
    ]
  }

  if (location) {
    matchQuery['location'] = { $regex: location, $options: 'i' }
  }

  let pipeline = [{ $match: matchQuery }]

  let userSkills = []
  let userSkillsResponse = []

  if (useSkills === 'true' && userId) {
    const user = await Users.findOne({ _id: userId })

    if (user) {
      userSkills = user.get('skills', [])
      userSkillsResponse = userSkills
      pipeline.push(
        {
          $addFields: {
            matchScore: {
              $size: {
                $setIntersection: [
                  {
                    $ifNull: ['$skills', []],
                  },
                  userSkills,
                ],
              },
            },
          },
        },
        { $sort: { matchScore: -1 } },
      )
    }
  }

  try {
    const jobs = await Jobs.aggregate(pipeline)
    res.json({ jobs, userSkills: userSkillsResponse })
  } catch (error) {
    console.error('Failed to fetch and rank jobs:', error)
    res.status(500).send('Internal server error')
  }
})

router.get('/:id', validateID, async (req, res) => {
  const job = await Jobs.findById(req.params.id)
  if (!job) return res.status(404).send()
  res.send(job)
})

async function getUniqueJobLocations() {
  try {
    return await Job.distinct('location')
  } catch (error) {
    console.error('Failed to fetch unique job locations:', error)
    throw error
  }
}

router.get('/locations', async (req, res) => {
  try {
    const locations = await getUniqueJobLocations()
    res.json(locations)
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' })
  }
})

module.exports = router
