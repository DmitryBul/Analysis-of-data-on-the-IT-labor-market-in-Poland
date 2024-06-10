import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  saved: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Data',
  }]
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
