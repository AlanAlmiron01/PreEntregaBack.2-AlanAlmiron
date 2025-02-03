import express from 'express';
import UserManager from '../services/userManager.js';
import validateUser from '../middlewares/validateUser.js';

const router = express.Router();
const userManager = new UserManager();

// Create user (POST /api/users)
router.post('/', validateUser, async (req, res, next) => {
  try {
    const newId = await userManager.create(req.body);
    res.status(201).json({ statusCode: 201, response: newId });
  } catch (error) {
    next(error);
  }
});

// Read all users (GET /api/users)
router.get('/', async (req, res, next) => {
  try {
    const users = await userManager.read();
    res.status(200).json({ statusCode: 200, response: users });
  } catch (error) {
    next(error);
  }
});

// Read one user (GET /api/users/:uid)
router.get('/:uid', async (req, res, next) => {
  try {
    const user = await userManager.readOne(req.params.uid);
    if (!user) return res.status(404).json({ statusCode: 404, error: 'User not found' });
    res.status(200).json({ statusCode: 200, response: user });
  } catch (error) {
    next(error);
  }
});

// Update user (PUT /api/users/:uid)
router.put('/:uid', validateUser, async (req, res, next) => {
  try {
    const updatedUser = await userManager.update(req.params.uid, req.body);
    if (!updatedUser) return res.status(404).json({ statusCode: 404, error: 'User not found' });
    res.status(200).json({ statusCode: 200, response: updatedUser });
  } catch (error) {
    next(error);
  }
});

// Delete user (DELETE /api/users/:uid)
router.delete('/:uid', async (req, res, next) => {
  try {
    const deletedId = await userManager.destroy(req.params.uid);
    if (!deletedId) return res.status(404).json({ statusCode: 404, error: 'User not found' });
    res.status(200).json({ statusCode: 200, response: deletedId });
  } catch (error) {
    next(error);
  }
});

export default router;
