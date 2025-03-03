// models/user.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  photo: {
    type: String,
    default: '/assets/default-user.png'
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
