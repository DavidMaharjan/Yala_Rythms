import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  createdAt: { type: Date, default: Date.now }
});

export const User =  mongoose.model('User', userSchema);
