import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Passenger', 'Operator','Admin'],
    default: 'Passenger',
  },
  // The 'date' field is redundant when using timestamps, but we can leave it for now.
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true }); // <<< ADD THIS OPTION

const User = mongoose.model('user', UserSchema);
export default User;