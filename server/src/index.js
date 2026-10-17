import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connectDB, getDBStatus } from './config/db.js';
import { seedMongoDBIfEmpty } from './services/storageService.js';

import authRoutes from './routes/authRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import encounterRoutes from './routes/encounterRoutes.js';
import billingRoutes from './routes/billingRoutes.js';
import catalogRoutes from './routes/catalogRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import auditRoutes from './routes/auditRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-tenant-id']
}));
app.use(express.json());
app.use(morgan('dev'));

// System Health & Diagnostics
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'Lazfort Hospital ERP Backend Core',
    version: '1.0.0',
    database: getDBStatus(),
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/encounters', encounterRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/catalog', catalogRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/audit', auditRoutes);

// Global 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Bootstrap & Listen
const startServer = async () => {
  await connectDB();
  await seedMongoDBIfEmpty();

  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`  LAZFORT Hospital ERP - Outpatient & Clinical System   `);
    console.log(`  Backend API running at http://localhost:${PORT}        `);
    console.log(`  Health Check: http://localhost:${PORT}/api/health     `);
    console.log(`=======================================================`);
  });
};

startServer();
