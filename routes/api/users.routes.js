import { Router } from 'express';
import UserManager from '../../services/userManager.js';
import validateUser from '../../middlewares/validateUser.js';

const router = Router();
const userManager = new UserManager();

router.post('/', validateUser, async (req, res, next) => {
  try {
    const newUser = await userManager.create(req.body);
    res.status(201).json({ statusCode: 201, response: newUser });
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await userManager.read();
    res.json({ statusCode: 200, response: users });
  } catch (error) {
    next(error);
  }
});

router.get('/:uid', async (req, res, next) => {
  try {
    const user = await userManager.readOne(req.params.uid);
    if (!user) return res.status(404).json({ statusCode: 404, error: 'User not found' });
    res.json({ statusCode: 200, response: user });
  } catch (error) {
    next(error);
  }
});

router.put('/:uid', validateUser, async (req, res, next) => {
  try {
    const updatedUser = await userManager.update(req.params.uid, req.body);
    res.json({ statusCode: 200, response: updatedUser });
  } catch (error) {
    next(error);
  }
});

router.delete('/:uid', async (req, res, next) => {
  try {
    const deletedUser = await userManager.destroy(req.params.uid);
    res.json({ statusCode: 200, response: deletedUser });
  } catch (error) {
    next(error);
  }
});

export default router;
