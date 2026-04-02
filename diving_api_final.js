const http = require('http');
const url = require('url');
const fs = require('fs');
const crypto = require('crypto');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) { console.error('FATAL: JWT_SECRET environment variable is required'); process.exit(1); }

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4',
  supportBigNumbers: true,
  bigNumberStrings: true,
});
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  console.error('FATAL: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME environment variables are required');
  process.exit(1);
}
const loginAttempts = new Map();
const LOGIN_MAX = 5;
const LOGIN_WINDOW = 15 * 60 * 1000;
function isLoginBlocked(ip) {
  const key = 'li:' + ip;
  const now = Date.now();
  const attempts = (loginAttempts.get(key) || []).filter(t => now - t < LOGIN_WINDOW);
  if (attempts.length >= LOGIN_MAX) return true;
  attempts.push(now);
  loginAttempts.set(key, attempts);
  return false;
}

function q(sql, vals) {
  return new Promise((resolve, reject) => {
    pool.query(sql, vals || [], (err, rows) => err ? reject(err) : resolve(rows));
  });
}

const DATA_FILE = '/app/data.json';
const fs2 = require('fs');
const appDir = '/app';
if (!fs2.existsSync(appDir)) { try { fs2.mkdirSync(appDir, { recursive: true }); console.log('Created ' + appDir); } catch(e) { console.error('Failed to create ' + appDir); } }
let data = { users: [], heroes: {}, columns: [] };
if (fs.existsSync(DATA_FILE)) {
  try { data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); } catch(e) {}
}
if (!data.heroes.zh) {
  data.heroes.zh = { title: '奉旨潜水', subtitle: 'Imperial Diving', cta_text: '开始潜水之旅', cta_link: '/zh/diving-experience', cta_secondary_text: '查看课程', cta_secondary_link: '/zh/diving-courses' };
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}
if (!data.users.length) {
  const bcrypt = require('bcrypt');
  const initPassword = process.env.ADMIN_INIT_PASSWORD || 'admin123'; const hash = await bcrypt.hash(initPassword, 10);
  data.users.push({ id: 1, email: 'admin@imperialdiving.com', password: hash, name: 'Admin', role: 'ADMIN' });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function sendJSON(res, code, obj) {
  res.writeHead(code, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || 'https://imperialdiving.com', 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization' });
  res.end(JSON.stringify(obj));
}
function sendHTML(res, code, html) {
  res.writeHead(code, { 'Content-Type': 'text/html; charset=utf-8', 'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || 'https://imperialdiving.com' });
  res.end(html);
}
async function parseBody(req) {
  return new Promise(resolve => {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => { try { resolve(JSON.parse(body)); } catch { resolve({}); }});
  });
}
function verifyToken(req) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch { return null; }
}
function makeToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}
function clean(obj) {
  const r = {};
  for (const [k, v] of Object.entries(obj)) r[k] = (v === undefined || v === '') ? null : v;
  return r;
}

const ADMIN_HTML = '';

const server = http.createServer(async (req, res) => {
  const pathname = url.parse(req.url).pathname;
  const method = req.method;
  const query = url.parse(req.url, true).query;
  const path = pathname.replace(/\/$/, '');

  if (method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || 'https://imperialdiving.com', 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization' });
    return res.end();
  }

  // Auth
  if (path.startsWith('/auth/')) {
    const body = await parseBody(req);
    if (path === '/auth/login' && method === 'POST') {
      const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
      if (isLoginBlocked(clientIP)) return sendJSON(res, 429, { error: '登录次数过多，请在15分钟后再试' });
      const user = data.users.find(u => u.email === body.email);
      if (!user) return sendJSON(res, 401, { error: 'Invalid credentials' });
      const bcrypt = require('bcrypt');
      const match = await bcrypt.compare(body.password || '', user.password);
      if (!match) return sendJSON(res, 401, { error: 'Invalid credentials' });
      return sendJSON(res, 200, { token: makeToken({ id: user.id, email: user.email, role: user.role }), user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    }
    if (path === '/auth/register') return sendJSON(res, 404, { error: 'Registration is disabled' });
    return sendJSON(res, 404, { error: 'Not found' });
  }

  // Admin guard
  const adminAuth = () => {
    const user = verifyToken(req);
    if (!user) { sendJSON(res, 401, { error: 'Unauthorized' }); return false; }
    return true;
  };

  // Public
  if (path === '/api/health') return sendJSON(res, 200, { status: 'ok' });
  if (path === '/api/heroes' && method === 'GET') return sendJSON(res, 200, data.heroes[query.lang || 'zh'] || data.heroes.zh);
  if (path === '/api/columns' && method === 'GET') {
    return sendJSON(res, 200, { title: '我们的服务', items: [] });
  }
  if (path === '/api/services' && method === 'GET') {
    try { const rows = await q('SELECT * FROM page_feature WHERE feature_lang = ? ORDER BY feature_sort', [query.lang || 'zh']); return sendJSON(res, 200, rows); }
    catch(e) { return sendJSON(res, 500, { error: '服务器错误，请稍后重试' }); }
  }
  if (path === '/api/courses' && method === 'GET') {
    try { const rows = await q('SELECT * FROM courses WHERE course_lang = ? ORDER BY course_sort', [query.lang || 'zh']); return sendJSON(res, 200, rows); }
    catch(e) { return sendJSON(res, 500, { error: '服务器错误，请稍后重试' }); }
  }
  if (path === '/api/destinations' && method === 'GET') {
    try { const rows = await q('SELECT * FROM page_destination WHERE dest_lang = ? AND enabled = 1 ORDER BY dest_order', [query.lang || 'zh']); return sendJSON(res, 200, rows); }
    catch(e) { return sendJSON(res, 500, { error: '服务器错误，请稍后重试' }); }
  }
  if (path === '/api/navigation' && method === 'GET') {
    try { const rows = await q('SELECT * FROM page_navigation WHERE nav_lang = ? AND nav_status = 1 ORDER BY nav_order', [query.lang || 'zh']); return sendJSON(res, 200, rows); }
    catch(e) { return sendJSON(res, 500, { error: '服务器错误，请稍后重试' }); }
  }

  // Admin
  if (path === '/api/admin/heroes' && method === 'GET') { if (!adminAuth()) return; return sendJSON(res, 200, data.heroes); }
  const heroMatch = path.match(/^\/api\/admin\/heroes\/([a-z]{2})$/);
  if (heroMatch && method === 'PUT') { if (!adminAuth()) return; const lang = heroMatch[1]; const body = await parseBody(req); if (!data.heroes[lang]) data.heroes[lang] = {}; data.heroes[lang] = { ...data.heroes[lang], ...clean(body), updated_at: new Date().toISOString() }; fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2)); return sendJSON(res, 200, { success: true }); }

  if (path === '/api/admin/services' && method === 'GET') { if (!adminAuth()) return; try { return sendJSON(res, 200, await q('SELECT * FROM page_feature ORDER BY feature_sort')); } catch(e) { return sendJSON(res, 500, { error: '服务器错误，请稍后重试' }); } }
  if (path === '/api/admin/services' && method === 'POST') {
    if (!adminAuth()) return;
    try { const b = clean(await parseBody(req));  await q('INSERT INTO page_feature (feature_lang, feature_title, feature_description, feature_sort) VALUES (?,?,?,?)', [b.feature_lang||'zh', b.feature_title, b.feature_description, b.feature_sort||0]); return sendJSON(res, 201, { success: true }); }
    catch(e) { return sendJSON(res, 500, { error: '服务器错误，请稍后重试' }); }
  }
  const svcDel = path.match(/^\/api\/admin\/services\/(\w+)$/);
  if (svcDel && method === 'DELETE') { if (!adminAuth()) return; try { await q('DELETE FROM page_feature WHERE id = ?', [svcDel[1]]); return sendJSON(res, 200, { success: true }); } catch(e) { return sendJSON(res, 500, { error: '服务器错误，请稍后重试' }); } }

  if (path === '/api/admin/courses' && method === 'GET') { if (!adminAuth()) return; try { return sendJSON(res, 200, await q('SELECT * FROM courses ORDER BY course_sort')); } catch(e) { return sendJSON(res, 500, { error: '服务器错误，请稍后重试' }); } }
  if (path === '/api/admin/courses' && method === 'POST') {
    if (!adminAuth()) return;
    try { const b = clean(await parseBody(req));  await q('INSERT INTO courses (course_code, course_lang, course_name, course_tag, course_description, course_price, course_days, course_sort) VALUES (?,?,?,?,?,?,?,?)', [b.course_code||null, b.course_lang||'zh', b.course_name, b.course_tag, b.course_description, b.course_price, b.course_days, b.course_sort||0]); return sendJSON(res, 201, { success: true }); }
    catch(e) { return sendJSON(res, 500, { error: '服务器错误，请稍后重试' }); }
  }
  const crsDel = path.match(/^\/api\/admin\/courses\/(\w+)$/);
  if (crsDel && method === 'DELETE') { if (!adminAuth()) return; try { await q('DELETE FROM courses WHERE id = ?', [crsDel[1]]); return sendJSON(res, 200, { success: true }); } catch(e) { return sendJSON(res, 500, { error: '服务器错误，请稍后重试' }); } }

  if (path === '/api/admin/destinations' && method === 'GET') { if (!adminAuth()) return; try { return sendJSON(res, 200, await q('SELECT * FROM page_destination ORDER BY dest_order')); } catch(e) { return sendJSON(res, 500, { error: '服务器错误，请稍后重试' }); } }
  if (path === '/api/admin/destinations' && method === 'POST') {
    if (!adminAuth()) return;
    try { const b = clean(await parseBody(req));  await q('INSERT INTO page_destination (dest_code, dest_lang, dest_name, dest_tag, dest_order) VALUES (?,?,?,?,?)', [b.dest_code||null, b.dest_lang||'zh', b.dest_name, b.dest_tag, b.dest_order||0]); return sendJSON(res, 201, { success: true }); }
    catch(e) { return sendJSON(res, 500, { error: '服务器错误，请稍后重试' }); }
  }
  const dstDel = path.match(/^\/api\/admin\/destinations\/(\w+)$/);
  if (dstDel && method === 'DELETE') { if (!adminAuth()) return; try { await q('DELETE FROM page_destination WHERE id = ?', [dstDel[1]]); return sendJSON(res, 200, { success: true }); } catch(e) { return sendJSON(res, 500, { error: '服务器错误，请稍后重试' }); } }

  if (path === '/api/admin/navigation' && method === 'GET') { if (!adminAuth()) return; try { return sendJSON(res, 200, await q('SELECT * FROM page_navigation ORDER BY nav_order')); } catch(e) { return sendJSON(res, 500, { error: '服务器错误，请稍后重试' }); } }
  if (path === '/api/admin/navigation' && method === 'POST') {
    if (!adminAuth()) return;
    try { const b = clean(await parseBody(req));  await q('INSERT INTO page_navigation (nav_name, nav_url, nav_order, nav_lang) VALUES (?,?,?,?)', [b.nav_name, b.nav_url, b.nav_order||0, b.nav_lang||'zh']); return sendJSON(res, 201, { success: true }); }
    catch(e) { return sendJSON(res, 500, { error: '服务器错误，请稍后重试' }); }
  }
  const navDel = path.match(/^\/api\/admin\/navigation\/(\w+)$/);
  if (navDel && method === 'DELETE') { if (!adminAuth()) return; try { await q('DELETE FROM page_navigation WHERE id = ?', [navDel[1]]); return sendJSON(res, 200, { success: true }); } catch(e) { return sendJSON(res, 500, { error: '服务器错误，请稍后重试' }); } }

  if (path === '/api/admin/password' && method === 'POST') { if (!adminAuth()) return; const b = await parseBody(req); if (!b.password || b.password.length < 6) return sendJSON(res, 400, { error: 'Min 6 chars' }); const bcrypt = require('bcrypt'); data.users[0].password = await bcrypt.hash(b.password, 10); fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2)); return sendJSON(res, 200, { success: true }); }

  if (path === '/admin' || path === '/admin/') {
    const adminPath = require('path').join(__dirname, 'admin.html');
    const adminContent = require('fs').readFileSync(adminPath, 'utf8');
    return sendHTML(res, 200, adminContent);
  }

  sendJSON(res, 404, { error: 'Not found' });
});

server.listen(PORT, '0.0.0.0', () => console.log('Admin API running on port ' + PORT));
