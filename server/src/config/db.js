import dns from 'node:dns';
import mongoose from 'mongoose';

let isMongoConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lazfort_hospital_erp';
  try {
    mongoose.set('strictQuery', false);
    if (uri.startsWith('mongodb+srv://')) {
      try {
        dns.setServers(['8.8.8.8', '1.1.1.1']);
      } catch (dnsErr) {
        // Fallback to system default DNS
      }
    }

    const options = {
      serverSelectionTimeoutMS: 12000,
      family: 4,
    };
    const conn = await mongoose.connect(uri, options);
    isMongoConnected = true;
    console.log(`[Database] MongoDB Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`\n❌ [MongoDB Error Name]: ${error.name}`);
    console.error(`❌ [MongoDB Error Message]: ${error.message}`);
    if (error.code) console.error(`❌ [MongoDB Error Code]: ${error.code}`);

    if (error.message.includes('whitelist') || error.name === 'MongooseServerSelectionError') {
      console.warn(`\n👉 SOLUTION 1: MongoDB Atlas me Network Access > IP 0.0.0.0/0 allow karein.`);
    }
    if (error.message.includes('bad auth') || error.code === 8000) {
      console.warn(`\n👉 SOLUTION 2: MongoDB Atlas me Database Access > Username / Password verify karein.`);
    }
    console.warn(`[Database] Activating In-Memory Storage Engine.\n`);
    isMongoConnected = false;
    return false;
  }
};

export const getDBStatus = () => ({
  connected: isMongoConnected,
  mode: isMongoConnected ? 'MongoDB (Mongoose)' : 'In-Memory Enterprise Store (Active)',
  timestamp: new Date().toISOString()
});
