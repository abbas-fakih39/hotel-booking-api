import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readAdmins = async () => {
  const filePath = path.join(__dirname, '../data/admins.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

export const findAdminByEmail = async (email) => {
  const data = await readAdmins();
  return data.admins.find(admin => admin.email === email);
};

export const verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const generateToken = (admin) => {
  const payload = {
    id: admin.id,
    email: admin.email,
    role: admin.role
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};