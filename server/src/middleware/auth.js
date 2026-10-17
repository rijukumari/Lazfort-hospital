import jwt from 'jsonwebtoken';
import { inMemoryStore, isMongoDBActive } from '../services/storageService.js';
import { User } from '../models/User.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required. No authorization token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'lazfort_secure_enterprise_jwt_secret_key_2026_x89q');
    
    // Fetch fresh user
    let user = null;
    if (isMongoDBActive()) {
      user = await User.findOne({ userId: decoded.userId, active: true }).lean();
    } else {
      user = inMemoryStore.users.find(u => u.userId === decoded.userId && u.active);
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'User account not found or has been deactivated.' });
    }

    req.user = {
      userId: user.userId,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      department: user.department,
      specialization: user.specialization,
      tenantId: user.tenantId
    };
    req.tenantId = user.tenantId;

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session token.', error: error.message });
  }
};

export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized. Please sign in.' });
    }

    if (roles.length > 0 && !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden. Action restricted. Role '${req.user.role}' does not possess required privileges.`
      });
    }

    next();
  };
};
