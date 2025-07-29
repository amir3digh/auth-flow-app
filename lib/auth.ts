import jwt from 'jsonwebtoken';
import { User } from '@/types/user';
import { db } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface AuthUser extends User {
  phone: string;
}

export async function generateToken(phone: string): Promise<string> {
  const token = jwt.sign({ phone }, JWT_SECRET, { expiresIn: '7d' });
  await db.saveToken(token, phone);
  return token;
}

export async function verifyToken(token: string): Promise<string | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { phone: string };
    const phone = await db.getPhoneByToken(token);
    return phone === decoded.phone ? decoded.phone : null;
  } catch {
    return null;
  }
}

export async function fetchRandomUser(): Promise<User> {
  const response = await fetch('https://randomuser.me/api/?results=1&nat=us');
  const data = await response.json();
  return data.results[0];
}

export async function getUserByPhone(phone: string): Promise<AuthUser | null> {
  const userRecord = await db.getUserByPhone(phone);
  if (!userRecord) return null;
  
  return {
    ...userRecord.user,
    phone: userRecord.phone
  };
}

export async function createOrGetUser(phone: string): Promise<AuthUser> {
  // Check if user already exists
  const existingUser = await getUserByPhone(phone);
  if (existingUser) {
    return existingUser;
  }

  // Fetch new user from API
  const randomUser = await fetchRandomUser();
  
  // Replace phone number with user's input
  const userWithPhone: AuthUser = {
    ...randomUser,
    phone: phone
  };

  // Save to database
  await db.saveUser(phone, randomUser);
  
  return userWithPhone;
}

export async function logout(token: string): Promise<void> {
  await db.deleteToken(token);
} 