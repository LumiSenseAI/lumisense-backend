import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();
const myEnv = process.env;
const CONNECTION_STRING = `mongodb+srv://${myEnv.MONGODB_USER}:${myEnv.MONGODB_PWD}@${myEnv.MONGODB_CLUSTER}/${myEnv.MONGODB_DATABASE}`
console.log('CONNECTION_STRING:', CONNECTION_STRING)
export const connectDB = async () => {
  try {
    await mongoose.connect(CONNECTION_STRING)
    console.log('MongoDB connected successfully to Altlas Cluster 🟢!')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}
