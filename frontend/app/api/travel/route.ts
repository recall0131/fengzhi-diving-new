import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDb();
    const items = db.prepare(`
      SELECT tp.*, d.name_zh as destination_name_zh, d.name_en as destination_name_en
      FROM travel_packages tp
      LEFT JOIN destinations d ON tp.destination_id = d.id
      ORDER BY tp.sort_order ASC, tp.id ASC
    `).all();
    return NextResponse.json(items);
  } catch (err) {
    console.error('[api/travel]', err);
    return NextResponse.json([], { status: 200 });
  }
}
