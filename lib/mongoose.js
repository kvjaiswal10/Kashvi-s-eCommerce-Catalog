// Load environment variables from .env file
require('dotenv').config();

// Import mongoose and other necessary modules
import mongoose from 'mongoose';

// Function to initialize mongoose connection
export async function initMongoose() {
  // Check if mongoose connection is already established
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }

  // Connect to MongoDB using environment variable
  const mongodbUrl = process.env.MONGODB_URL;
  if (!mongodbUrl) {
    throw new Error('MONGODB_URL environment variable is not defined.');
  }

  try {
    await mongoose.connect(mongodbUrl);
    console.log('MongoDB connected successfully');
    return mongoose.connection.asPromise();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
