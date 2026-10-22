import mongoose from 'mongoose';
import dns from 'node:dns';

const uri = 'mongodb+srv://riju9314_db_user:riju9314_db_user@cluster0.lbgeemm.mongodb.net/lazfort_hospital_erp?retryWrites=true&w=majority';

dns.setServers(['8.8.8.8', '1.1.1.1']);

console.log('Testing connection to MongoDB Atlas...');
try {
  const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  console.log('SUCCESS: Connected to host:', conn.connection.host);
  await mongoose.disconnect();
  process.exit(0);
} catch (err) {
  console.error('ERROR NAME:', err.name);
  console.error('ERROR MESSAGE:', err.message);
  console.error('ERROR CODE:', err.code);
  process.exit(1);
}
