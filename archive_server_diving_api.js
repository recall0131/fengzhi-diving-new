const http = require('http');
const url = require('url');
const fs = require('fs');
const crypto = require('crypto');

const PORT = 3001;
const DATA_FILE = '/var/www/diving-admin/data.json';
const JWT_SECRET = process.env.JWT_SECRET || 'imperial-diving-secret-2024';
const JWT_EXPIRY_SECONDS = 7 * 24 * 60 * 60; // 7 days

// Load or init data
let data = { users: [], heroes: {}, columns: [] };
if (fs.existsSync(DATA_FILE)) {
  try { data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); } catch(e) {}
}
function save() { fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2)); }

// Seed defaults
if (!data.heroes.zh) {
  data.heroes.zh = {
    title: '奉旨潜水',
    subtitle: 'Imperial Diving',
    cta_text: '开始潜水之旅',
    cta_link: '/zh/diving-experience',
    cta_secondary_text: '查看课程',
    cta_secondary_link: '/zh/diving-courses'
  };
}
if (!data.heroes.en) {
  data.heroes.en = {
    title: 'Imperial Diving',
    subtitle: 'Premier Scuba Diving Experience',
    cta_text: 'Start Your Dive Journey',
    cta_link: '/en/diving-experience',
    cta_secondary_text: 'View Courses',
    cta_secondary_link: '/en/diving-courses'
  };
}
if (!data.columns.length) {
  data.columns = [
    { id: 1, lang: 'zh', icon: '🤿', title: '潜水体验', desc: 'PADI认证潜水体验，适合初学者', link: '/zh/diving-experience', sort_order: 1 },
    { id: 2, lang: 'zh', icon: '📚', title: '潜水课程', desc: 'OWD/AOWD/Rescue，专业教练', link: '/zh/diving-courses', sort_order: 2 },
    { id: 3, lang: 'zh', icon: '🌊', title: '潜水旅行', desc: '全球热门目的地，行程定制', link: '/zh/diving-travel', sort_order: 3 },
    { id: 4, lang: 'en', icon: '🤿', title: 'Diving Experience', desc: 'PADI certified experience dives for beginners', link: '/en/diving-experience', sort_order: 1 },
    { id: 5, lang: 'en', icon: '📚', title: 'Diving Courses', desc: 'OWD/AOWD/Rescue with professional instructors', link: '/en/diving-courses', sort_order: 2 },
    { id: 6, lang: 'en', icon: '🌊', title: 'Diving Travel', desc: 'World-class destinations, tailor-made itineraries', link: '/en/diving-travel', sort_order: 3 }
  ];
}
if (!data.users.length) {
  const hash = crypto.createHash('sha256').update('admin123').digest('hex');
  data.users.push({ id: 1, email: 'admin@imperialdiving.com', password: hash, name: 'Admin', role: 'ADMIN' });
  save();
}

function sendJSON(res, code, obj, extraHeaders) {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', ...extraHeaders };
  res.writeHead(code, headers);
  res.end(JSON.stringify(obj));
}
function sendHTML(res, code, html) {
  res.writeHead(code, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => { try { resolve(JSON.parse(body)); } catch { resolve({}); }});
    req.on('error', reject);
  });
}

function verifyToken(req) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = JSON.parse(Buffer.from(parts[0], 'base64').toString());
    // Check exp
    if (payload.exp && Date.now() / 1000 > payload.exp) return null;
    return payload;
  } catch { return null; }
}

function makeToken(payload) {
  const exp = Math.floor(Date.now() / 1000) + JWT_EXPIRY_SECONDS;
  const fullPayload = { ...payload, exp };
  const encoded = Buffer.from(JSON.stringify(fullPayload)).toString('base64');
  const sig = crypto.createHmac('sha256', JWT_SECRET).update(encoded).digest('hex');
  return encoded + '.' + sig;
}

function validateColumn(body) {
  const errors = [];
  if (!body.title || body.title.trim() === '') errors.push('title is required');
  if (!body.icon || body.icon.trim() === '') errors.push('icon is required');
  if (!body.desc || body.desc.trim() === '') errors.push('desc is required');
  if (!body.link || body.link.trim() === '') errors.push('link is required');
  return errors;
}

const ADMIN_HTML = `<!DOCTYPE html>
<html lang="zh"><head><meta charset="UTF-8"><title>潜水网站管理后台</title>
<style>
body{font-family:'Noto Sans SC',sans-serif;background:#f5f5f5;margin:0;padding:20px}
.panel{background:#fff;border-radius:12px;padding:24px;margin-bottom:20px;max-width:800px;box-shadow:0 2px 8px rgba(0,0,0,.08)}
h2{color:#006994;margin-top:0;font-size:18px;border-bottom:1px solid #eee;padding-bottom:12px}
label{display:block;margin:8px 0 4px;font-size:13px;color:#666}
input,textarea,select{width:100%;padding:10px 12px;border:1px solid #ddd;border-radius:8px;box-sizing:border-box;font-size:14px}
input:focus,textarea:focus,select:focus{outline:none;border-color:#006994}
.btn{background:#006994;color:#fff;border:none;padding:10px 24px;border-radius:8px;cursor:pointer;font-size:14px;margin-top:12px}
.btn:hover{background:#005a7f}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.item{background:#f8f8f8;padding:12px;border-radius:8px;border:1px solid #eee;margin-bottom:8px}
.item h4{margin:0 0 6px;font-size:14px}
.item p{font-size:12px;color:#888;margin:4px 0}
.msg{color:#888;font-size:13px;margin-top:8px;display:block}
.err{color:#dc3545}
.succ{color:#28a745}
</style></head><body>
<h1 style="color:#006994;font-size:22px;margin-bottom:24px">🤿 潜水网站管理后台</h1>

<div class="panel">
<h2>首页 Hero 设置（中文）</h2>
<div class="grid">
<div><label>主标题</label><input id="hero_title" placeholder="如：奉旨潜水"></div>
<div><label>副标题</label><input id="hero_subtitle" placeholder="如：Imperial Diving"></div>
<div><label>主按钮文字</label><input id="hero_cta" placeholder="如：开始潜水之旅"></div>
<div><label>主按钮链接</label><input id="hero_cta_link" placeholder="如：/zh/diving-experience"></input></div>
<div><label>次按钮文字</label><input id="hero_cta2" placeholder="如：查看课程"></div>
<div><label>次按钮链接</label><input id="hero_cta2_link" placeholder="如：/zh/diving-courses"></div>
</div>
<button class="btn" onclick="saveHero('zh')">保存中文 Hero</button>
<span class="msg" id="hero_msg"></span>
</div>

<div class="panel">
<h2>首页 Hero 设置（英文）</h2>
<div class="grid">
<div><label>主标题</label><input id="hero_en_title" placeholder="如：Imperial Diving"></div>
<div><label>副标题</label><input id="hero_en_subtitle" placeholder="如：Premier Scuba Diving"></div>
<div><label>主按钮文字</label><input id="hero_en_cta" placeholder="如：Start Your Dive Journey"></div>
<div><label>主按钮链接</label><input id="hero_en_cta_link" placeholder="如：/en/diving-experience"></div>
<div><label>次按钮文字</label><input id="hero_en_cta2" placeholder="如：View Courses"></div>
<div><label>次按钮链接</label><input id="hero_en_cta2_link" placeholder="如：/en/diving-courses"></div>
</div>
<button class="btn" onclick="saveHero('en')">保存英文 Hero</button>
<span class="msg" id="hero_en_msg"></span>
</div>

<div class="panel">
<h2>首页 CTA 栏（中文）</h2>
<p style="font-size:12px;color:#888">仅显示中文栏目 | 英文栏目在英文 Hero 设置区管理</p>
<div id="col_list"></div>
<h3 style="font-size:14px;color:#666;margin-top:16px">新增中文 CTA 项</h3>
<div class="grid">
<div><label>图标（Emoji）</label><input id="col_icon" placeholder="🤿"></div>
<div><label>标题</label><input id="col_title" placeholder="如：潜水体验"></div>
<div><label>描述</label><input id="col_desc" placeholder="简短描述"></div>
<div><label>链接</label><input id="col_link" placeholder="如：/zh/diving-experience"></div>
</div>
<div id="col_error" class="err msg" style="display:none;margin-top:8px"></div>
<button class="btn" onclick="addCol()">添加 CTA 项</button>
</div>

<div class="panel">
<h2>账号信息</h2>
<p style="font-size:13px;color:#666">邮箱：admin@imperialdiving.com</p><p style="font-size:13px;color:#666">密码：admin123（当前密码）</p>
<h3 style="font-size:14px;color:#666;margin-top:16px">改密码</h3>
<div class="grid">
<div><label>新密码</label><input type="password" id="new_password" placeholder="留空则不改"></div>
</div>
<button class="btn" onclick="changePassword()" style="background:#28a745">确认修改密码</button>
<span class="msg" id="pwd_msg"></span>
</div>

<script>
let colError = document.getElementById('col_error');
async function load() {
  const [h, c] = await Promise.all([
    fetch('/api/admin/heroes').then(r=>r.json()),
    fetch('/api/admin/columns').then(r=>r.json())
  ]);
  // ZH hero
  const zh = h.zh || {};
  document.getElementById('hero_title').value = zh.title||'';
  document.getElementById('hero_subtitle').value = zh.subtitle||'';
  document.getElementById('hero_cta').value = zh.cta_text||'';
  document.getElementById('hero_cta_link').value = zh.cta_link||'';
  document.getElementById('hero_cta2').value = zh.cta_secondary_text||'';
  document.getElementById('hero_cta2_link').value = zh.cta_secondary_link||'';
  // EN hero
  const en = h.en || {};
  document.getElementById('hero_en_title').value = en.title||'';
  document.getElementById('hero_en_subtitle').value = en.subtitle||'';
  document.getElementById('hero_en_cta').value = en.cta_text||'';
  document.getElementById('hero_en_cta_link').value = en.cta_link||'';
  document.getElementById('hero_en_cta2').value = en.cta_secondary_text||'';
  document.getElementById('hero_en_cta2_link').value = en.cta_secondary_link||'';
  // Columns - only zh
  const zhCols = (c.zh || []).filter(x=>x.lang==='zh');
  renderCols(zhCols);
}
function renderCols(cols) {
  document.getElementById('col_list').innerHTML = cols.map(c =>
    \`<div class="item"><h4>\${c.icon} \${c.title}</h4><p>\${c.desc}</p><p><a href="\${c.link}">\${c.link}</a></p>
    <button onclick="delCol(\${c.id})" style="background:#dc3545;padding:4px 12px;border:none;color:#fff;border-radius:4px;cursor:pointer;font-size:12px">删除</button></div>\`
  ).join('');
}
async function saveHero(lang) {
  const msg = document.getElementById(lang === 'zh' ? 'hero_msg' : 'hero_en_msg');
  const prefix = lang === 'zh' ? 'hero_' : 'hero_en_';
  const data = {
    title: document.getElementById(prefix+'title').value,
    subtitle: document.getElementById(prefix+'subtitle').value,
    cta_text: document.getElementById(prefix+'cta').value,
    cta_link: document.getElementById(prefix+'cta_link').value,
    cta_secondary_text: document.getElementById(prefix+'cta2').value,
    cta_secondary_link: document.getElementById(prefix+'cta2_link').value
  };
  const res = await fetch('/api/admin/heroes/'+lang, {method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  msg.textContent = res.ok ? '✅ 已保存' : '❌ 保存失败';
  msg.className = res.ok ? 'msg succ' : 'msg err';
}
async function addCol() {
  colError.style.display = 'none';
  const body = {
    lang: 'zh',
    icon: document.getElementById('col_icon').value,
    title: document.getElementById('col_title').value,
    desc: document.getElementById('col_desc').value,
    link: document.getElementById('col_link').value
  };
  const res = await fetch('/api/admin/columns', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  const json = await res.json();
  if (!res.ok) {
    colError.textContent = '❌ ' + (json.errors ? json.errors.join(', ') : json.error);
    colError.style.display = 'block';
    return;
  }
  document.getElementById('col_icon').value = '';
  document.getElementById('col_title').value = '';
  document.getElementById('col_desc').value = '';
  document.getElementById('col_link').value = '';
  const c = await fetch('/api/admin/columns?lang=zh').then(r=>r.json());
  renderCols(c.zh || []);
}
async function delCol(id) {
  await fetch('/api/admin/columns/'+id, {method:'DELETE'});
  const c = await fetch('/api/admin/columns?lang=zh').then(r=>r.json());
  renderCols(c.zh || []);
}
async function changePassword() {
  const np = document.getElementById('new_password').value;
  if (!np) return;
  const res = await fetch('/api/admin/password', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:np})});
  const msg = document.getElementById('pwd_msg');
  if (res.ok) { msg.textContent = '✅ 密码已修改'; msg.className='msg succ'; } else { msg.textContent = '❌ 修改失败'; msg.className='msg err'; }
}
load();
</script></body></html>`;

const server = http.createServer(async (req, res) => {
  const pathname = url.parse(req.url).pathname;
  const method = req.method;
  const query = url.parse(req.url, true).query;

  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization'
    });
    return res.end();
  }

  // Auth routes
  if (pathname.startsWith('/auth/')) {
    const body = await parseBody(req);
    if (pathname === '/auth/login' && method === 'POST') {
      const user = data.users.find(u => u.email === body.email);
      const hash = crypto.createHash('sha256').update(body.password || '').digest('hex');
      if (!user || user.password !== hash) return sendJSON(res, 401, { error: 'Invalid credentials' });
      const token = makeToken({ id: user.id, email: user.email, role: user.role });
      sendJSON(res, 200, { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } else if (pathname === '/auth/register' && method === 'POST') {
      if (!body.email || !body.password) return sendJSON(res, 400, { error: 'Email and password required' });
      if (data.users.find(u => u.email === body.email)) return sendJSON(res, 400, { error: 'Email exists' });
      const hash = crypto.createHash('sha256').update(body.password).digest('hex');
      const user = { id: data.users.length+1, email: body.email, password: hash, name: body.name||'', role: 'ADMIN' };
      data.users.push(user); save();
      const token = makeToken({ id: user.id, email: user.email, role: user.role });
      sendJSON(res, 200, { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    }
    return;
  }

  // Admin auth middleware
  if (pathname.startsWith('/api/admin/')) {
    const user = verifyToken(req);
    if (!user) return sendJSON(res, 401, { error: 'Unauthorized' });
  }

  // ── Public API ──
  if (pathname === '/api/heroes' && method === 'GET') {
    const lang = query.lang || 'zh';
    const hero = data.heroes[lang] || data.heroes.zh;
    return sendJSON(res, 200, hero);
  }
  if (pathname === '/api/columns' && method === 'GET') {
    const lang = query.lang || 'zh';
    const items = data.columns.filter(c => c.lang === lang);
    return sendJSON(res, 200, { title: lang === 'zh' ? '我们的服务' : 'Our Services', items });
  }

  // ── Admin API ──
  // GET /api/admin/heroes → { zh: {}, en: {} }
  if (pathname === '/api/admin/heroes' && method === 'GET') {
    return sendJSON(res, 200, data.heroes);
  }
  // PUT /api/admin/heroes/:lang
  if (pathname.match(/^\/api\/admin\/heroes\/[a-z]{2}$/) && method === 'PUT') {
    const lang = pathname.split('/')[4];
    const body = await parseBody(req);
    if (!data.heroes[lang]) data.heroes[lang] = {};
    data.heroes[lang] = { ...data.heroes[lang], ...body, updated_at: new Date().toISOString() };
    save();
    return sendJSON(res, 200, { ok: true });
  }
  // GET /api/admin/columns?lang=zh|en
  if (pathname === '/api/admin/columns' && method === 'GET') {
    const lang = query.lang || 'zh';
    const items = data.columns.filter(c => c.lang === lang);
    return sendJSON(res, 200, { [lang]: items });
  }
  // POST /api/admin/columns
  if (pathname === '/api/admin/columns' && method === 'POST') {
    const body = await parseBody(req);
    const errors = validateColumn(body);
    if (errors.length) return sendJSON(res, 400, { error: 'Validation failed', errors });
    const col = {
      id: Date.now(),
      lang: body.lang || 'zh',
      icon: body.icon.trim(),
      title: body.title.trim(),
      desc: body.desc.trim(),
      link: body.link.trim(),
      sort_order: data.columns.filter(c => c.lang === (body.lang || 'zh')).length + 1
    };
    data.columns.push(col);
    save();
    return sendJSON(res, 200, { id: col.id });
  }
  // DELETE /api/admin/columns/:id
  if (pathname.match(/^\/api\/admin\/columns\/\d+$/) && method === 'DELETE') {
    const id = parseInt(pathname.split('/')[4]);
    const idx = data.columns.findIndex(c => c.id === id);
    if (idx === -1) return sendJSON(res, 404, { error: 'Not found' });
    data.columns.splice(idx, 1);
    save();
    return sendJSON(res, 200, { ok: true });
  }
  // POST /api/admin/password
  if (pathname === '/api/admin/password' && method === 'POST') {
    const body = await parseBody(req);
    if (!body.password || body.password.length < 6) return sendJSON(res, 400, { error: 'Password must be at least 6 characters' });
    const user = data.users[0];
    user.password = crypto.createHash('sha256').update(body.password).digest('hex');
    save();
    return sendJSON(res, 200, { ok: true });
  }

  if (pathname === '/api/health' && method === 'GET') {
    return sendJSON(res, 200, { status: 'ok' });
  }

  // Admin UI
  if (pathname === '/admin' || pathname === '/admin/') {
    return sendHTML(res, 200, ADMIN_HTML);
  }

  sendJSON(res, 404, { error: 'Not found' });
});

server.listen(PORT, '0.0.0.0', () => console.log('Admin API running on port '+PORT));
