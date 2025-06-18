import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  correct: {
    type: Boolean,
    default: false,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

const pollSchema = new mongoose.Schema({
  teacherUsername: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: [optionSchema],
  timer: {
    type: Number,
    default: 60,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Poll', pollSchema);
