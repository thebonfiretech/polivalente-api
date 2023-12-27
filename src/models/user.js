import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  userClass:{
    type: String
  },
  role:{
    type: String
  },
  flags: {
    type: Object
  },
  status:{
    type: String,
    default: 'notRegistered'
  },
  grades:{
    type:Object
  },
  teacherClass:{
    type: Object
  }
});

export default mongoose.model('user', UserSchema);
