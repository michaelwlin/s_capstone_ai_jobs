require('dotenv').config()

const express = require('express')
const validateID = require('../middleware/validateID')
const {
  authenticateAccessToken,
  authenticateRefreshToken,
} = require('../middleware/authenticateToken')
const User = require('../models/user')
const router = express.Router()

// router.get('/', async (req, res) => {
//   const users = await User.find().sort('userName')
//   res.send(users)
// })

router.get("/loggedInData", authenticateAccessToken, async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.json(user);
});
// router.get("/:id", validateID, async (req, res) => {
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send();
  res.send(user);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).send('User ID is required.')
  }

  const user = await User.findByIdAndDelete(id)

  if (!user) {
    return res.status(404).send('User not found.')
  }

  res.status(204).send()
})

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) {
      return res.status(404).send("User not found.");
    }
    res.send(updatedUser);
  } catch (error) {
    res.status(400).send("Error updating user: " + error.message);
  }
});
router.get("/:id/skills", async (req, res) => {
  // router.get("/:id/skills", validateID, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');

    res.json(user.skills)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post(
  '/:id/skills',
  validateID,
  authenticateAccessToken,
  async (req, res) => {
    const { skill } = req.body
    if (!skill) {
      return res.status(400).send('Skill is required.')
    }

    try {
      const user = await User.findById(req.params.id)
      if (!user) return res.status(404).send('User not found')

      user.skills.push(skill)
      await user.save()
      res.status(201).send(user.skills)
    } catch (error) {
      res.status(500).send('Error adding skill: ' + error.message)
    }
  },
)
router.put(
  '/:id/skills/:skillIndex',
  validateID,
  authenticateAccessToken,
  async (req, res) => {
    const { skill } = req.body
    const { id, skillIndex } = req.params

    try {
      const user = await User.findById(id)
      if (!user) return res.status(404).send('User not found')
      if (skillIndex >= user.skills.length || skillIndex < 0) {
        return res.status(400).send('Invalid skill index.')
      }

      user.skills[skillIndex] = skill
      await user.save()
      res.send(user.skills)
    } catch (error) {
      res.status(500).send('Error updating skill: ' + error.message)
    }
  },
)

router.delete(
  '/:id/skills/:skillIndex',
  validateID,
  authenticateAccessToken,
  async (req, res) => {
    const { id, skillIndex } = req.params

    try {
      const user = await User.findById(id)
      if (!user) return res.status(404).send('User not found')
      if (skillIndex >= user.skills.length || skillIndex < 0) {
        return res.status(400).send('Invalid skill index.')
      }

      user.skills.splice(skillIndex, 1)
      await user.save()
      res.send(user.skills)
    } catch (error) {
      res.status(500).send('Error deleting skill: ' + error.message)
    }
  },
)

router.post(
  '/:id/password',
  validateID,
  authenticateAccessToken,
  async (req, res) => {
    const { currentPassword, newPassword } = req.body
    try {
      const user = await User.findById(req.params.id)
      if (!user) {
        return res.status(404).send('User not found')
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password)
      if (!isMatch) {
        return res.status(403).send('Current password is incorrect')
      }
      user.password = await bcrypt.hash(newPassword, 10)
      await user.save()
      res.send('Password updated successfully')
    } catch (error) {
      res.status(500).send('Error updating password: ' + error.message)
    }
  },
)

router.delete('/:id', authenticateAccessToken, async (req, res) => {
  const userId = req.params.id

  try {
    if (userId !== req.user.userId) {
      return res
        .status(403)
        .send('Unauthorized: You cannot delete this account.')
    }

    const deletedUser = await User.findByIdAndDelete(userId)
    if (!deletedUser) {
      return res.status(404).send('User not found.')
    }

    res.status(204).send()
  } catch (error) {
    console.error('Error deleting user account:', error)
    res.status(500).send('Error deleting user account.')
  }
})

module.exports = router
