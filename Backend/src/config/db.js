import mongoose from 'mongoose';

export const connectDB = async () => {
  const DB = process.env.MONGO_URI || 'mongodb://localhost:27017/pollsense';

  try {
    await mongoose.connect(DB);
    console.log('MongoDB Connected'); 
  } catch (error) {
    console.error('MongoDB Error:', error.message);
    process.exit(1);
  }
};