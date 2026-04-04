import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDb();
    const items = db.prepare('SELECT * FROM courses ORDER BY sort_order ASC, id ASC').all();
    return NextResponse.json(items);
  } catch (err) {
    console.error('[api/courses]', err);
    return NextResponse.json([], { status: 200 });
  }
}
