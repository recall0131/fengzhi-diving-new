import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'imperial-diving-secret-key-change-in-production';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: '用户名和密码不能为空' }, { status: 400 });
    }

    const db = getDb();
    const user = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username) as any;

    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      return NextResponse.json({ error: '用户名或密码错误' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({ ok: true, username: user.username });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('[admin/login]', err);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
