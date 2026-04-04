import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'imperial_diving.db');

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    // Ensure data directory exists
    const fs = require('fs');
    const dataDir = path.dirname(DB_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    _db = new Database(DB_PATH);
    _db.pragma('journal_mode = WAL');
    _db.pragma('foreign_keys = ON');
    initSchema(_db);
  }
  return _db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_zh TEXT NOT NULL,
      name_en TEXT NOT NULL,
      description_zh TEXT NOT NULL DEFAULT '',
      description_en TEXT NOT NULL DEFAULT '',
      short_desc_zh TEXT NOT NULL DEFAULT '',
      short_desc_en TEXT NOT NULL DEFAULT '',
      price INTEGER NOT NULL DEFAULT 0,
      duration TEXT NOT NULL DEFAULT '',
      duration_en TEXT NOT NULL DEFAULT '',
      level TEXT NOT NULL DEFAULT 'beginner',
      level_zh TEXT NOT NULL DEFAULT '初级',
      hero_image TEXT NOT NULL DEFAULT '',
      featured INTEGER NOT NULL DEFAULT 0,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS destinations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_zh TEXT NOT NULL,
      name_en TEXT NOT NULL,
      description_zh TEXT NOT NULL DEFAULT '',
      description_en TEXT NOT NULL DEFAULT '',
      location TEXT NOT NULL DEFAULT '',
      location_en TEXT NOT NULL DEFAULT '',
      hero_image TEXT NOT NULL DEFAULT '',
      featured INTEGER NOT NULL DEFAULT 0,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS travel_packages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      destination_id INTEGER,
      name_zh TEXT NOT NULL,
      name_en TEXT NOT NULL,
      description_zh TEXT NOT NULL DEFAULT '',
      description_en TEXT NOT NULL DEFAULT '',
      price INTEGER NOT NULL DEFAULT 0,
      duration TEXT NOT NULL DEFAULT '',
      duration_en TEXT NOT NULL DEFAULT '',
      includes_zh TEXT NOT NULL DEFAULT '',
      includes_en TEXT NOT NULL DEFAULT '',
      hero_image TEXT NOT NULL DEFAULT '',
      featured INTEGER NOT NULL DEFAULT 0,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (destination_id) REFERENCES destinations(id)
    );

    CREATE TABLE IF NOT EXISTS equipment (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_zh TEXT NOT NULL,
      name_en TEXT NOT NULL,
      description_zh TEXT NOT NULL DEFAULT '',
      description_en TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT '',
      category_zh TEXT NOT NULL DEFAULT '',
      price REAL NOT NULL DEFAULT 0,
      rental_price REAL NOT NULL DEFAULT 0,
      image TEXT NOT NULL DEFAULT '',
      featured INTEGER NOT NULL DEFAULT 0,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS enrollments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id INTEGER,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (course_id) REFERENCES courses(id)
    );
  `);

  // Seed default admin if not exists
  const adminExists = db.prepare('SELECT id FROM admin_users WHERE username = ?').get('admin');
  if (!adminExists) {
    const bcrypt = require('bcryptjs');
    const hash = bcrypt.hashSync('admin123', 10);
    db.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)').run('admin', hash);
    console.log('[DB] Default admin created: admin / admin123');
  }
}
