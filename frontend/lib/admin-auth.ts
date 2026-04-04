import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'imperial-diving-secret-key-change-in-production';

export function verifyAdmin(req: NextRequest): { authenticated: boolean; username?: string } {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return { authenticated: false };
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    return { authenticated: true, username: payload.username };
  } catch {
    return { authenticated: false };
  }
}

export function requireAuth() {
  return new Response('Unauthorized', { status: 401 });
}
