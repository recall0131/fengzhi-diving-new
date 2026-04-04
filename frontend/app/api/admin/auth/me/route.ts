import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'imperial-diving-secret-key-change-in-production';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    return NextResponse.json({ authenticated: true, username: payload.username });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
