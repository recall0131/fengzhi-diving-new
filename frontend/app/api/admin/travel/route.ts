import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyAdmin } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const auth = verifyAdmin(req);
  if (!auth.authenticated) return new Response('Unauthorized', { status: 401 });
  const db = getDb();
  const items = db.prepare(`
    SELECT tp.*, d.name_zh as destination_name_zh, d.name_en as destination_name_en
    FROM travel_packages tp
    LEFT JOIN destinations d ON tp.destination_id = d.id
    ORDER BY tp.sort_order ASC, tp.id DESC
  `).all();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const auth = verifyAdmin(req);
  if (!auth.authenticated) return new Response('Unauthorized', { status: 401 });
  try {
    const body = await req.json();
    const db = getDb();
    const result = db.prepare(`
      INSERT INTO travel_packages (destination_id, name_zh, name_en, description_zh, description_en, price, duration, duration_en, includes_zh, includes_en, hero_image, featured, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      body.destination_id || null,
      body.name_zh, body.name_en,
      body.description_zh || '', body.description_en || '',
      body.price || 0,
      body.duration || '', body.duration_en || '',
      body.includes_zh || '', body.includes_en || '',
      body.hero_image || '', body.featured ? 1 : 0,
      body.sort_order || 0
    );
    const item = db.prepare('SELECT * FROM travel_packages WHERE id = ?').get(result.lastInsertRowid);
    return NextResponse.json(item);
  } catch (err) {
    console.error('[admin/travel POST]', err);
    return NextResponse.json({ error: '创建失败' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = verifyAdmin(req);
  if (!auth.authenticated) return new Response('Unauthorized', { status: 401 });
  try {
    const body = await req.json();
    if (!body.id) return NextResponse.json({ error: '缺少 ID' }, { status: 400 });
    const db = getDb();
    db.prepare(`
      UPDATE travel_packages SET
        destination_id=?, name_zh=?, name_en=?, description_zh=?, description_en=?,
        price=?, duration=?, duration_en=?, includes_zh=?, includes_en=?,
        hero_image=?, featured=?, sort_order=?, updated_at=datetime('now')
      WHERE id=?
    `).run(
      body.destination_id || null,
      body.name_zh, body.name_en,
      body.description_zh || '', body.description_en || '',
      body.price || 0,
      body.duration || '', body.duration_en || '',
      body.includes_zh || '', body.includes_en || '',
      body.hero_image || '', body.featured ? 1 : 0,
      body.sort_order || 0, body.id
    );
    return NextResponse.json(db.prepare('SELECT * FROM travel_packages WHERE id = ?').get(body.id));
  } catch (err) {
    console.error('[admin/travel PUT]', err);
    return NextResponse.json({ error: '更新失败' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = verifyAdmin(req);
  if (!auth.authenticated) return new Response('Unauthorized', { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: '缺少 ID' }, { status: 400 });
  const db = getDb();
  db.prepare('DELETE FROM travel_packages WHERE id = ?').run(id);
  return NextResponse.json({ ok: true });
}
