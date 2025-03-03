// passport/jwt.js
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import User from '../models/user.model.js';
import cookieExtractor from '../utils/cookieExtractor.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use('current', new JwtStrategy(
  {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET
  },
  async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));
