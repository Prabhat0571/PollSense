import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model('Teacher', teacherSchema);
