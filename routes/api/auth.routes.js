// routes/api/auth.routes.js
import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Registro: utiliza la estrategia local para registrar y encriptar la contraseña.
router.post('/register', passport.authenticate('register', { session: false }), (req, res) => {
  res.status(201).json({ message: 'User registered successfully', user: req.user });
});

// Login: utiliza la estrategia local para verificar credenciales, genera el JWT, lo coloca en cookie y redirige.
router.post('/login', (req, res, next) => {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if (err || !user)
      return res.status(401).json({ message: info?.message || 'Login failed' });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // Cambiar a true si usás HTTPS
      maxAge: 86400000
    }).redirect('/products');
  })(req, res, next);
});

// Signout: limpia la cookie del token y redirige a la vista de login.
router.post('/signout', (req, res) => {
  console.log('Signout route accessed'); // Agrega este log para ver en la consola del servidor
  res.clearCookie('token');
  res.redirect('/login');
});

export default router;
