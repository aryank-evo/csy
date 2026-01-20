import { Request, Response } from 'express';
import { User } from '../models/User';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

const getSecretKey = () => process.env.JWT_SECRET || 'fallback_secret_key';

export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Check if user is admin
    if (!user.isAdmin) {
      res.status(403).json({ message: 'Access denied. Admin privileges required.' });
      return;
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      getSecretKey(),
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Admin login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error during admin login' });
  }
};