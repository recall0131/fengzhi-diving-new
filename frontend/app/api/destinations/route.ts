import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = getDb();
    const items = db.prepare('SELECT id, name_zh, name_en FROM destinations ORDER BY sort_order').all();
    return NextResponse.json(items);
  } catch {
    return NextResponse.json([]);
  }
}
