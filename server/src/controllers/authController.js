import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { inMemoryStore, isMongoDBActive } from '../services/storageService.js';
import { User } from '../models/User.js';
import { Tenant } from '../models/Tenant.js';
import { logAuditEvent } from '../middleware/audit.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  try {
    let user = null;
    let tenant = null;

    if (isMongoDBActive()) {
      user = await User.findOne({ 
        $or: [{ email: email.toLowerCase() }, { username: email.toLowerCase() }],
        active: true 
      });
      if (user) {
        tenant = await Tenant.findOne({ tenantId: user.tenantId }).lean();
      }
    } else {
      user = inMemoryStore.users.find(
        u => (u.email.toLowerCase() === email.toLowerCase() || u.username.toLowerCase() === email.toLowerCase()) && u.active
      );
      if (user) {
        tenant = inMemoryStore.tenants.find(t => t.tenantId === user.tenantId);
      }
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. User not found or inactive.' });
    }

    const isMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Password incorrect.' });
    }

    const token = jwt.sign(
      {
        userId: user.userId,
        username: user.username,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId
      },
      process.env.JWT_SECRET || 'lazfort_secure_enterprise_jwt_secret_key_2026_x89q',
      { expiresIn: '24h' }
    );

    // Update last login
    user.lastLogin = new Date();
    if (isMongoDBActive()) {
      await User.updateOne({ userId: user.userId }, { lastLogin: new Date() });
    }

    // Log audit event
    await logAuditEvent({
      tenantId: user.tenantId,
      actor: user,
      action: 'USER_LOGIN',
      entityType: 'User',
      entityId: user.userId,
      details: `Successful authenticated sign-in for ${user.fullName} (${user.role})`,
      ipAddress: req.ip || '127.0.0.1'
    });

    return res.json({
      success: true,
      message: 'Sign-in successful',
      token,
      user: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        department: user.department,
        specialization: user.specialization,
        phone: user.phone,
        licenseNumber: user.licenseNumber,
        consultationFee: user.consultationFee,
        tenantId: user.tenantId
      },
      tenant: tenant || {
        name: 'Lazfort Memorial Hospital',
        code: 'LZF-HQ',
        currencySymbol: '₹'
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal authentication error', error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  return res.json({
    success: true,
    user: req.user
  });
};

export const getStaff = async (req, res) => {
  try {
    let staffList = [];
    if (isMongoDBActive()) {
      staffList = await User.find({ tenantId: req.tenantId, active: true }, '-passwordHash').lean();
    } else {
      staffList = inMemoryStore.users
        .filter(u => u.tenantId === req.tenantId && u.active)
        .map(({ passwordHash, ...rest }) => rest);
    }

    return res.json({ success: true, staff: staffList });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
