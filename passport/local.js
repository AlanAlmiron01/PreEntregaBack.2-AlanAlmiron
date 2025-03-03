// passport/local.js
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

passport.use('register', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  async (req, email, password, done) => {
    try {
      const exists = await User.findOne({ email });
      if (exists) return done(null, false, { message: 'User already exists' });
      
      // Encriptar la contraseña antes de guardar
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email,
        password: hashedPassword,
        photo: req.body.photo || undefined,
        role: req.body.role || 'USER'
      });
      return done(null, newUser);
    } catch (err) {
      return done(err);
    }
  }
));

passport.use('login', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: 'Incorrect email' });
      
      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false, { message: 'Incorrect password' });
      
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));
