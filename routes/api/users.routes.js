// routes/api/users.routes.js
import { Router } from 'express';
import passport from 'passport';
import User from '../../models/user.model.js';

const router = Router();

// Obtener lista de usuarios (protegida)
router.get('/', passport.authenticate('current', { session: false }), async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (err) {
    next(err);
  }
});

export default router;

