import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import crypto from 'crypto';

// Configuration for church owner authentication
const CHURCH_ADMIN_EMAILS = [
  'admin@yourchurch.com', // Replace with actual church admin emails
  'pastor@yourchurch.com',
  'secretary@yourchurch.com',
  // Add more authorized emails as needed
];

// Configuration for session management
const SESSION_SECRET = process.env.SESSION_SECRET || 'your-secret-key-change-this-in-production';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export interface AdminSession {
  email: string;
  name: string;
  isAdmin: boolean;
  expiresAt: Date;
}

/**
 * Check if an email is authorized to access the admin dashboard
 */
export function isAuthorizedEmail(email: string): boolean {
  return CHURCH_ADMIN_EMAILS.includes(email.toLowerCase());
}

/**
 * Create a secure session token
 */
function createSessionToken(sessionData: AdminSession): string {
  const payload = JSON.stringify(sessionData);
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('hex');
  
  return Buffer.from(`${payload}.${signature}`).toString('base64');
}

/**
 * Verify and parse a session token
 */
function verifySessionToken(token: string): AdminSession | null {
  try {
    // URL decode the token first (cookies are URL encoded)
    const urlDecodedToken = decodeURIComponent(token);
    const decoded = Buffer.from(urlDecodedToken, 'base64').toString('utf-8');
    const lastDotIndex = decoded.lastIndexOf('.');
    const payload = decoded.substring(0, lastDotIndex);
    const signature = decoded.substring(lastDotIndex + 1);
    
    if (!payload || !signature) {
      return null;
    }
    
    const expectedSignature = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(payload)
      .digest('hex');
    
    if (signature !== expectedSignature) {
      return null;
    }
    
    const sessionData = JSON.parse(payload) as AdminSession;
    
    // Check if session has expired
    if (new Date() > new Date(sessionData.expiresAt)) {
      return null;
    }
    
    return sessionData;
  } catch (error) {
    return null;
  }
}

/**
 * Get the current admin session from cookies
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('admin-session')?.value;
  
  if (!sessionToken) {
    return null;
  }
  
  return verifySessionToken(sessionToken);
}

/**
 * Create a new admin session and set the cookie
 */
export async function createAdminSession(email: string, name: string): Promise<string> {
  const expiresAt = new Date(Date.now() + SESSION_DURATION);
  const sessionData: AdminSession = {
    email: email.toLowerCase(),
    name,
    isAdmin: true,
    expiresAt,
  };
  
  const token = createSessionToken(sessionData);
  
  const cookieStore = await cookies();
  cookieStore.set('admin-session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000, // Convert to seconds
    path: '/',
  });
  
  return token;
}

/**
 * Clear the admin session
 */
export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('admin-session');
}

/**
 * Middleware to check if user is authenticated for admin routes
 */
export async function requireAdminAuth(): Promise<AdminSession> {
  const session = await getAdminSession();
  
  if (!session || !session.isAdmin) {
    throw new Error('Unauthorized access to admin area');
  }
  
  return session;
}

/**
 * Validate login credentials
 */
export function validateLogin(email: string, password: string): { valid: boolean; name?: string } {
  // For now, we'll use a simple password check
  // In production, you might want to use a more secure method
  const ADMIN_PASSWORDS: Record<string, string> = {
    'admin@yourchurch.com': 'churchadmin2025',
    'pastor@yourchurch.com': 'pastor2025',
    'secretary@yourchurch.com': 'secretary2025',
  };
  
  const normalizedEmail = email.toLowerCase();
  
  if (!isAuthorizedEmail(normalizedEmail)) {
    return { valid: false };
  }
  
  const expectedPassword = ADMIN_PASSWORDS[normalizedEmail];
  if (!expectedPassword || expectedPassword !== password) {
    return { valid: false };
  }
  
  // Extract name from email (you might want to store this in a database)
  const name = normalizedEmail.split('@')[0];
  
  return { valid: true, name: name.charAt(0).toUpperCase() + name.slice(1) };
}

/**
 * Get admin session from request (for API routes)
 */
export function getAdminSessionFromRequest(req: NextRequest): AdminSession | null {
  const sessionToken = req.cookies.get('admin-session')?.value;
  
  if (!sessionToken) {
    return null;
  }
  
  return verifySessionToken(sessionToken);
}
