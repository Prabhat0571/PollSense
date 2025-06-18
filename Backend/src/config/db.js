import mongoose from 'mongoose';

export const connectDB = async () => {
  const DB = process.env.MONGODB_URI || 'mongodb://localhost:27017/pollingApp';

  try {
    await mongoose.connect(DB);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Error:', error.message);
    process.exit(1);
  }
};
