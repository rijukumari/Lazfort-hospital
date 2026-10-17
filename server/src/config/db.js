import mongoose from 'mongoose';

let isMongoConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lazfort_hospital_erp';
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    isMongoConnected = true;
    console.log(`[Database] MongoDB Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[Database] MongoDB connection unavailable (${error.message}).`);
    console.warn(`[Database] Activating Lazfort In-Memory Enterprise Storage Engine (Full High-Performance Fallback).`);
    isMongoConnected = false;
    return false;
  }
};

export const getDBStatus = () => ({
  connected: isMongoConnected,
  mode: isMongoConnected ? 'MongoDB (Mongoose)' : 'In-Memory Enterprise Store (Active)',
  timestamp: new Date().toISOString()
});
