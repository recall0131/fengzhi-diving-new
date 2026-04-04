import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyAdmin } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const auth = verifyAdmin(req);
  if (!auth.authenticated) return new Response('Unauthorized', { status: 401 });
  
  const db = getDb();
  const items = db.prepare('SELECT * FROM courses ORDER BY sort_order ASC, id DESC').all();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const auth = verifyAdmin(req);
  if (!auth.authenticated) return new Response('Unauthorized', { status: 401 });

  try {
    const body = await req.json();
    const db = getDb();
    const result = db.prepare(`
      INSERT INTO courses (name_zh, name_en, description_zh, description_en, short_desc_zh, short_desc_en, price, duration, duration_en, level, level_zh, hero_image, featured, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      body.name_zh, body.name_en,
      body.description_zh || '', body.description_en || '',
      body.short_desc_zh || '', body.short_desc_en || '',
      body.price || 0,
      body.duration || '', body.duration_en || '',
      body.level || 'beginner', body.level_zh || '初级',
      body.hero_image || '', body.featured ? 1 : 0,
      body.sort_order || 0
    );
    const item = db.prepare('SELECT * FROM courses WHERE id = ?').get(result.lastInsertRowid);
    return NextResponse.json(item);
  } catch (err) {
    console.error('[admin/courses POST]', err);
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
      UPDATE courses SET
        name_zh=?, name_en=?, description_zh=?, description_en=?,
        short_desc_zh=?, short_desc_en=?, price=?, duration=?, duration_en=?,
        level=?, level_zh=?, hero_image=?, featured=?, sort_order=?,
        updated_at=datetime('now')
      WHERE id=?
    `).run(
      body.name_zh, body.name_en,
      body.description_zh || '', body.description_en || '',
      body.short_desc_zh || '', body.short_desc_en || '',
      body.price || 0,
      body.duration || '', body.duration_en || '',
      body.level || 'beginner', body.level_zh || '初级',
      body.hero_image || '', body.featured ? 1 : 0,
      body.sort_order || 0,
      body.id
    );
    const item = db.prepare('SELECT * FROM courses WHERE id = ?').get(body.id);
    return NextResponse.json(item);
  } catch (err) {
    console.error('[admin/courses PUT]', err);
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
  db.prepare('DELETE FROM courses WHERE id = ?').run(id);
  return NextResponse.json({ ok: true });
}
