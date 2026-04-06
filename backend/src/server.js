const http = require('http');
const url = require('url');
const fs = require('fs');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = 7 * 24 * 60 * 60;

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'diving_admin',
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4',
  supportBigNumbers: true,
  bigNumberStrings: true,
});

function q(sql, vals) {
  return new Promise((resolve, reject) => {
    pool.query(sql, vals || [], (err, rows) => err ? reject(err) : resolve(rows));
  });
}

const DATA_FILE = '/app/data.json';
let data = { users: [], heroes: {}, columns: [] };
if (fs.existsSync(DATA_FILE)) {
  try { data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); } catch(e) {}
}
if (!data.heroes.zh) {
  data.heroes.zh = { title: '奉旨潜水', subtitle: 'Imperial Diving', cta_text: '开始潜水之旅', cta_link: '/zh/diving-experience', cta_secondary_text: '查看课程', cta_secondary_link: '/zh/diving-courses' };
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}
(async () => {
  if (!data.users.length) {
    const initPassword = process.env.ADMIN_INIT_PASSWORD;
    if (!initPassword) {
      console.error('FATAL: ADMIN_INIT_PASSWORD env var is required but not set');
      process.exit(1);
    }
    const hash = await bcrypt.hash(initPassword, 10);
    data.users.push({ id: 1, email: 'admin@imperialdiving.com', password: hash, name: 'Admin', role: 'ADMIN' });
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  }
})();

function sendJSON(res, code, obj) {
  res.writeHead(code, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': (process.env.ALLOWED_ORIGINS || ''), 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization' });
  res.end(JSON.stringify(obj));
}
function sendHTML(res, code, html) {
  res.writeHead(code, { 'Content-Type': 'text/html; charset=utf-8', 'Access-Control-Allow-Origin': (process.env.ALLOWED_ORIGINS || '') });
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
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = JSON.parse(Buffer.from(parts[0], 'base64').toString());
    if (payload.exp && Date.now() / 1000 > payload.exp) return null;
    return payload;
  } catch { return null; }
}
function makeToken(payload) {
  const exp = Math.floor(Date.now() / 1000) + JWT_EXPIRY;
  const enc = Buffer.from(JSON.stringify({ ...payload, exp })).toString('base64');
  return enc + '.' + crypto.createHmac('sha256', JWT_SECRET).update(enc).digest('hex');
}
function clean(obj) {
  const r = {};
  for (const [k, v] of Object.entries(obj)) r[k] = (v === undefined || v === '') ? null : v;
  return r;
}
function id8() { return Math.random().toString(36).substr(2, 8) + Date.now().toString(36); }

const LOGIN_HTML = `<!DOCTYPE html><html lang="zh"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>管理后台登录</title><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Noto Sans SC',sans-serif;background:linear-gradient(135deg,#006994 0%,#004466 100%);min-height:100vh;display:flex;align-items:center;justify-content:center}.login-box{background:#fff;border-radius:16px;padding:40px;width:100%;max-width:380px;box-shadow:0 20px 60px rgba(0,0,0,.3)}.login-box h1{color:#006994;font-size:24px;text-align:center;margin-bottom:8px}.login-box p{color:#888;font-size:14px;text-align:center;margin-bottom:30px}.login-box label{color:#333;font-size:13px;font-weight:500;display:block;margin-bottom:6px}.login-box input{width:100%;padding:12px 16px;border:2px solid #e0e0e0;border-radius:10px;font-size:15px;margin-bottom:16px;transition:border-color .3s}.login-box input:focus{border-color:#006994;outline:none}.login-box button{width:100%;padding:14px;background:#006994;color:#fff;border:none;border-radius:10px;font-size:16px;cursor:pointer}.login-box button:hover{background:#005a7f}.login-box .error{background:#fee;color:#c33;padding:12px;border-radius:8px;margin-bottom:16px;font-size:13px;display:none}.login-box .copyright{text-align:center;margin-top:24px;font-size:12px;color:#aaa}</style></head><body><div class="login-box"><h1>潜水管理后台</h1><p>请登录以继续</p><div class="error" id="error"></div><form id="loginForm"><label>邮箱</label><input type="text" id="email" autocomplete="username" placeholder="admin@imperialdiving.com" required><label>密码</label><input type="password" id="password" placeholder="请输入密码" required><button type="submit">登录</button></form><div class="copyright">© 2026 Imperial Diving</div></div><script>document.getElementById('loginForm').addEventListener('submit',async(e)=>{e.preventDefault();const email=document.getElementById('email').value;const password=document.getElementById('password').value;const error=document.getElementById('error');error.style.display='none';try{const r=await fetch('/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});const d=await r.json();if(d.token){localStorage.setItem('admin_token',d.token);localStorage.setItem('admin_user',JSON.stringify(d.user));window.location.href='/admin/';}else{error.textContent=d.error||'登录失败';error.style.display='block';}}catch(err){error.textContent='网络错误，请重试';error.style.display='block';}});</script></body></html>`;

const ADMIN_HTML = `<!DOCTYPE html><html lang="zh"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>潜水管理后台</title><style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Noto Sans SC',sans-serif;background:#f4f6f8;padding:20px;color:#333}
.panel{background:#fff;border-radius:12px;padding:24px;margin-bottom:20px;max-width:900px;box-shadow:0 2px 8px rgba(0,0,0,.06)}
h2{color:#006994;font-size:17px;margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid #eee}
h3{font-size:14px;color:#555;margin:16px 0 8px}
label{display:block;font-size:13px;color:#666;margin:8px 0 4px}
input,textarea{width:100%;padding:9px 12px;border:1px solid #ddd;border-radius:8px;font-size:14px}
input:focus{outline:none;border-color:#006994}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.btn{background:#006994;color:#fff;border:none;padding:9px 22px;border-radius:8px;cursor:pointer;font-size:14px;display:inline-block}
.btn:hover{background:#005a7f}.btn-green{background:#28a745}.btn-green:hover{background:#1e7e34}.btn-red{background:#dc3545}.btn-red:hover{background:#c82333}
.item{background:#f8f9fa;padding:14px;border-radius:8px;border:1px solid #eee;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center}
.item-info h4{font-size:14px;margin-bottom:4px}.item-info p{font-size:12px;color:#888}
.item-actions{display:flex;gap:8px}
.msg{font-size:13px;margin-top:8px;display:block}.msg.ok{color:#28a745}.msg.err{color:#dc3545}
table{width:100%;border-collapse:collapse;font-size:13px}
th,td{padding:10px 12px;text-align:left;border-bottom:1px solid #eee}
th{background:#f8f9fa;color:#666;font-weight:500}
.tab-nav{display:flex;gap:4px;margin-bottom:20px;flex-wrap:wrap}
.tab{background:#e9ecef;border:none;padding:8px 18px;border-radius:8px;cursor:pointer;font-size:14px}
.tab.active{background:#006994;color:#fff}
.tab-content{display:none}.tab-content.active{display:block}
</style></head><body>
<div style="background:#fff;padding:15px 20px;margin-bottom:20px;border-radius:8px;display:flex;justify-content:space-between;align-items:center">
<span>登录为: <b id="userEmail">-</b></span>
<button onclick="logout()" style="background:#dc3545;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer">退出登录</button>
</div>
<h1 style="color:#006994;font-size:20px;margin-bottom:20px">🤿 潜水网站管理后台</h1>
<div class="tab-nav">
  <button class="tab active" onclick="showTab('hero')">Hero</button>
  <button class="tab" onclick="showTab('services')">服务</button>
  <button class="tab" onclick="showTab('courses')">课程</button>
  <button class="tab" onclick="showTab('destinations')">目的地</button>
  <button class="tab" onclick="showTab('nav')">导航</button>
  <button class="tab" onclick="showTab('pwd')">账号</button>
</div>
<div class="tab-content active" id="tab-hero">
  <div class="panel"><h2>Hero（中文）</h2><div class="grid">
    <div><label>主标题</label><input id="h_zh_title"></div>
    <div><label>副标题</label><input id="h_zh_sub"></div>
    <div><label>主按钮文字</label><input id="h_zh_cta"></div>
    <div><label>主按钮链接</label><input id="h_zh_cta_lnk"></div>
    <div><label>次按钮文字</label><input id="h_zh_cta2"></div>
    <div><label>次按钮链接</label><input id="h_zh_cta2_lnk"></div>
  </div><button class="btn" onclick="saveHero('zh')">保存</button> <span class="msg" id="hmsg"></span></div>
  <div class="panel"><h2>Hero（英文）</h2><div class="grid">
    <div><label>主标题</label><input id="h_en_title"></div>
    <div><label>副标题</label><input id="h_en_sub"></div>
    <div><label>主按钮文字</label><input id="h_en_cta"></div>
    <div><label>主按钮链接</label><input id="h_en_cta_lnk"></div>
    <div><label>次按钮文字</label><input id="h_en_cta2"></div>
    <div><label>次按钮链接</label><input id="h_en_cta2_lnk"></div>
  </div><button class="btn" onclick="saveHero('en')">保存</button> <span class="msg" id="hemsg"></span></div>
</div>
<div class="tab-content" id="tab-services">
  <div class="panel"><h2>服务列表</h2><div id="svc_list"></div>
    <h3>新增服务</h3><div class="grid">
    <div><label>名称</label><input id="svc_name" placeholder="如：潜水体验"></div>
    <div><label>描述</label><input id="svc_desc" placeholder="简短描述"></div></div>
    <button class="btn btn-green" onclick="addSvc()">添加</button> <span class="msg" id="svcmsg"></span></div>
</div>
<div class="tab-content" id="tab-courses">
  <div class="panel"><h2>课程列表</h2><table><thead><tr><th>名称</th><th>标签</th><th>价格</th><th>天数</th><th>操作</th></tr></thead><tbody id="crs_list"></tbody></table>
    <h3>新增课程</h3><div class="grid">
    <div><label>名称</label><input id="crs_name" placeholder="如：OW 开放水域潜水员"></div>
    <div><label>标签</label><input id="crs_tag" placeholder="零基础/进阶/高级"></div>
    <div><label>价格</label><input id="crs_price" placeholder="如：¥2,800"></div>
    <div><label>天数</label><input id="crs_days" placeholder="如：4天"></div>
  </div><div style="margin-top:12px"><label>描述</label><input id="crs_desc" placeholder="课程描述"></div>
    <button class="btn btn-green" onclick="addCrs()">添加课程</button> <span class="msg" id="crsmsg"></span></div>
</div>
<div class="tab-content" id="tab-destinations">
  <div class="panel"><h2>目的地管理</h2>
    <div id="dst_edit_panel" style="display:none;background:#f5f5f5;padding:15px;margin:10px 0;border-radius:8px">
      <h4>编辑目的地: <span id="dst_edit_name"></span></h4>
      <input type="hidden" id="dst_edit_id">
      <div class="grid">
        <div><label>标签</label><input id="dst_edit_tag" placeholder="如：蓝洞潜水圣地"></div>
        <div><label>图片路径</label><input id="dst_edit_image" placeholder="/images/dest-xxx.jpg"></div>
        <div><label>图片Alt</label><input id="dst_edit_image_alt" placeholder="如：帕劳潜水"></div>
      </div>
      <div style="margin-top:10px"><label>描述</label><textarea id="dst_edit_desc" rows="2" style="width:100%" placeholder="简短描述，用于列表页显示"></textarea></div>
      <div style="margin-top:10px"><label>详细内容</label><textarea id="dst_edit_content" rows="4" style="width:100%" placeholder="详细内容，用于详情页"></textarea></div>
      <div style="margin-top:10px">
        <button class="btn btn-green" onclick="saveDst()">保存</button>
        <button class="btn" onclick="cancelDstEdit()">取消</button>
        <span class="msg" id="dst_save_msg"></span>
      </div>
    </div>
    <h3>目的地列表</h3>
    <table><thead><tr><th>名称</th><th>标签</th><th>CODE</th><th>操作</th></tr></thead><tbody id="dst_list"></tbody></table>
    <h3>新增目的地</h3><div class="grid">
    <div><label>名称</label><input id="dst_name" placeholder="如：帕劳"></div>
    <div><label>标签</label><input id="dst_tag" placeholder="如：蓝洞 · 海洋生物"></div>
    <div><label>CODE</label><input id="dst_code" placeholder="如：palau"></div>
  </div><button class="btn btn-green" onclick="addDst()">添加</button> <span class="msg" id="dstmsg"></span></div>
</div><div class="tab-content" id="tab-nav">
  <div class="panel"><h2>导航菜单</h2><div id="nav_list"></div>
    <h3>新增菜单项</h3><div class="grid">
    <div><label>名称</label><input id="nav_name" placeholder="如：课程"></div>
    <div><label>链接</label><input id="nav_url" placeholder="如：/zh/diving-courses"></div>
  </div><button class="btn btn-green" onclick="addNav()">添加</button> <span class="msg" id="navmsg"></span></div>
</div>
<div class="tab-content" id="tab-pwd">
  <div class="panel"><h2>账号信息</h2><p style="color:#888;font-size:13px">请联系系统管理员获取账号信息</p>
    <h3>改密码</h3><div><label>新密码</label><input type="password" id="npwd" placeholder="留空不改"></div>
    <button class="btn btn-green" onclick="chPwd()">确认修改</button> <span class="msg" id="pwdmsg"></span></div>
</div>
<script>
function showTab(id){document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));document.getElementById('tab-'+id).classList.add('active');document.querySelectorAll('.tab').forEach(t=>{if(t.getAttribute('onclick').includes(id))t.classList.add('active');});}
function getToken(){return localStorage.getItem('admin_token');}
function logout(){localStorage.removeItem('admin_token');localStorage.removeItem('admin_user');window.location.href='/admin/login';}
function init(){var t=getToken();if(!t){window.location.href='/admin/login';return;}var u=localStorage.getItem('admin_user');if(u)document.getElementById('userEmail').textContent=JSON.parse(u).email;load();}
async function load(){const t=getToken();if(!t){window.location.href='/admin/login';return;}const h=await fetch('/api/admin/heroes',{headers:{'Authorization':'Bearer '+t}}).then(r=>r.json());['zh','en'].forEach(l=>{const s=h[l]||{};document.getElementById('h_'+l+'_title').value=s.title||'';document.getElementById('h_'+l+'_sub').value=s.subtitle||'';document.getElementById('h_'+l+'_cta').value=s.cta_text||'';document.getElementById('h_'+l+'_cta_lnk').value=s.cta_link||'';document.getElementById('h_'+l+'_cta2').value=s.cta_secondary_text||'';document.getElementById('h_'+l+'_cta2_lnk').value=s.cta_secondary_link||'';});loadSvcs();loadCrss();loadDsts();loadNav();}
async function saveHero(l){const d={};['title','subtitle','cta_text','cta_link','cta_secondary_text','cta_secondary_link'].forEach(k=>{d[k]=document.getElementById('h_'+l+'_'+k).value;});const r=await fetch('/api/admin/heroes/'+l,{method:'PUT',headers:{'Content-Type':'application/json','Authorization':'Bearer '+getToken()},body:JSON.stringify(d)});const m=document.getElementById(l==='zh'?'hmsg':'hemsg');m.textContent=r.ok?'✅ 已保存':'❌ 保存失败';m.className=r.ok?'msg ok':'msg err';}
async function loadSvcs(){const r=await fetch('/api/admin/services',{headers:{'Authorization':'Bearer '+getToken()}}).then(r=>r.json());document.getElementById('svc_list').innerHTML=(r||[]).map(s=>'<div class="item"><div class="item-info"><h4>'+s.feature_title+'</h4><p>'+(s.feature_description||'')+'</p></div><button class="btn btn-red" onclick="delSvc(\''+s.id+'\')">删除</button></div>').join('')||'<p style="color:#888;font-size:13px">暂无数据</p>';}
async function addSvc(){const d={feature_title:document.getElementById('svc_name').value,feature_description:document.getElementById('svc_desc').value,feature_lang:'zh'};const r=await fetch('/api/admin/services',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+getToken()},body:JSON.stringify(d)});const m=document.getElementById('svcmsg');if(r.ok){m.textContent='✅ 已添加';m.className='msg ok';document.getElementById('svc_name').value='';document.getElementById('svc_desc').value='';loadSvcs();}else{m.textContent='❌ 添加失败';m.className='msg err';}}
async function delSvc(id){if(!confirm('确认删除?'))return;await fetch('/api/admin/services/'+id,{method:'DELETE',headers:{'Authorization':'Bearer '+getToken()}});loadSvcs();}
async function loadCrss(){const r=await fetch('/api/admin/courses',{headers:{'Authorization':'Bearer '+getToken()}}).then(r=>r.json());document.getElementById('crs_list').innerHTML=(r||[]).map(c=>'<tr><td>'+c.course_name+'</td><td>'+c.course_tag+'</td><td>'+c.course_price+'</td><td>'+c.course_days+'</td><td><button class="btn btn-red" onclick="delCrs(\''+c.id+'\')">删除</button></td></tr>').join('')||'<tr><td colspan="5" style="color:#888">暂无数据</td></tr>';}
async function addCrs(){const d={course_name:document.getElementById('crs_name').value,course_tag:document.getElementById('crs_tag').value,course_price:document.getElementById('crs_price').value,course_days:document.getElementById('crs_days').value,course_description:document.getElementById('crs_desc').value,course_lang:'zh'};const r=await fetch('/api/admin/courses',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+getToken()},body:JSON.stringify(d)});const m=document.getElementById('crsmsg');if(r.ok){m.textContent='✅ 已添加';m.className='msg ok';['crs_name','crs_tag','crs_price','crs_days','crs_desc'].forEach(id=>document.getElementById(id).value='');loadCrss();}else{m.textContent='❌ 添加失败';m.className='msg err';}}
async function delCrs(id){if(!confirm('确认删除?'))return;await fetch('/api/admin/courses/'+id,{method:'DELETE',headers:{'Authorization':'Bearer '+getToken()}});loadCrss();}
async function loadDsts(){const r=await fetch('/api/admin/destinations',{headers:{'Authorization':'Bearer '+getToken()}}).then(r=>r.json());document.getElementById('dst_list').innerHTML=(r||[]).map(d=>'<tr><td>'+d.dest_name+'</td><td>'+d.dest_tag+'</td><td><code>'+d.dest_code+'</code></td><td><button class="btn btn-red" onclick="delDst(\''+d.id+'\')">删除</button></td></tr>').join('')||'<tr><td colspan="4" style="color:#888">暂无数据</td></tr>';}
async function addDst(){const d={dest_name:document.getElementById('dst_name').value,dest_tag:document.getElementById('dst_tag').value,dest_code:document.getElementById('dst_code').value,dest_lang:'zh'};const r=await fetch('/api/admin/destinations',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+getToken()},body:JSON.stringify(d)});const m=document.getElementById('dstmsg');if(r.ok){m.textContent='✅ 已添加';m.className='msg ok';['dst_name','dst_tag','dst_code'].forEach(id=>document.getElementById(id).value='');loadDsts();}else{m.textContent='❌ 添加失败';m.className='msg err';}}
async function delDst(id){if(!confirm('确认删除?'))return;await fetch('/api/admin/destinations/'+id,{method:'DELETE',headers:{'Authorization':'Bearer '+getToken()}});loadDsts();}
async function loadNav(){const r=await fetch('/api/admin/navigation',{headers:{'Authorization':'Bearer '+getToken()}}).then(r=>r.json());document.getElementById('nav_list').innerHTML=(r||[]).map(n=>'<div class="item"><div class="item-info"><h4>'+n.nav_name+'</h4><p>'+n.nav_url+'</p></div><button class="btn btn-red" onclick="delNav(\''+n.id+'\')">删除</button></div>').join('')||'<p style="color:#888;font-size:13px">暂无数据</p>';}
async function addNav(){const d={nav_name:document.getElementById('nav_name').value,nav_url:document.getElementById('nav_url').value,nav_lang:'zh'};const r=await fetch('/api/admin/navigation',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+getToken()},body:JSON.stringify(d)});const m=document.getElementById('navmsg');if(r.ok){m.textContent='✅ 已添加';m.className='msg ok';document.getElementById('nav_name').value='';document.getElementById('nav_url').value='';loadNav();}else{m.textContent='❌ 添加失败';m.className='msg err';}}
async function delNav(id){if(!confirm('确认删除?'))return;await fetch('/api/admin/navigation/'+id,{method:'DELETE',headers:{'Authorization':'Bearer '+getToken()}});loadNav();}
async function chPwd(){const np=document.getElementById('npwd').value;if(!np)return;const r=await fetch('/api/admin/password',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+getToken()},body:JSON.stringify({password:np})});const m=document.getElementById('pwdmsg');if(r.ok){m.textContent='✅ 密码已修改';m.className='msg ok';document.getElementById('npwd').value='';}else{m.textContent='❌ 修改失败';m.className='msg err';}}
init();
</script></body></html>`;

const server = http.createServer(async (req, res) => {
  const pathname = url.parse(req.url).pathname;
  const method = req.method;
  const query = url.parse(req.url, true).query;
  const path = pathname.replace(/\/$/, '');

  if (method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': (process.env.ALLOWED_ORIGINS || ''), 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization' });
    return res.end();
  }

  // Auth
  if (path.startsWith('/auth/')) {
    const body = await parseBody(req);
    if (path === '/auth/login' && method === 'POST') {
      const user = data.users.find(u => u.email === body.email);
      const hash = crypto.createHash('sha256').update(body.password || '').digest('hex');
      if (!user || user.password !== hash) return sendJSON(res, 401, { error: 'Invalid credentials' });
      return sendJSON(res, 200, { token: makeToken({ id: user.id, email: user.email, role: user.role }), user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    }
    if (path === '/auth/register' && method === 'POST') {
      if (!body.email || !body.password) return sendJSON(res, 400, { error: 'Email and password required' });
      if (data.users.find(u => u.email === body.email)) return sendJSON(res, 400, { error: 'Email exists' });
      const hash = crypto.createHash('sha256').update(body.password).digest('hex');
      data.users.push({ id: data.users.length + 1, email: body.email, password: hash, name: body.name || '', role: 'USER' });
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
      return sendJSON(res, 200, { token: makeToken({ id: data.users.length, email: body.email, role: 'USER' }), user: { id: data.users.length, email: body.email, name: body.name || '', role: 'USER' } });
    }
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
    const items = data.columns.filter(c => c.lang === (query.lang || 'zh'));
    return sendJSON(res, 200, { title: '我们的服务', items });
  }
  if (path === '/api/services' && method === 'GET') {
    try { const rows = await q('SELECT * FROM page_feature WHERE feature_lang = ? ORDER BY feature_sort', [query.lang || 'zh']); return sendJSON(res, 200, rows); }
    catch(e) { return sendJSON(res, 500, { error: e.message }); }
  }
  if (path === '/api/courses' && method === 'GET') {
    try { const rows = await q('SELECT * FROM courses WHERE course_lang = ? ORDER BY course_sort', [query.lang || 'zh']); return sendJSON(res, 200, rows); }
    catch(e) { return sendJSON(res, 500, { error: e.message }); }
  }
  if (path === '/api/destinations' && method === 'GET') {
    try { const rows = await q('SELECT * FROM page_destination WHERE dest_lang = ? AND enabled = 1 ORDER BY dest_order', [query.lang || 'zh']); return sendJSON(res, 200, rows); }
    catch(e) { return sendJSON(res, 500, { error: e.message }); }
  }
  if (path === '/api/navigation' && method === 'GET') {
    try { const rows = await q('SELECT * FROM page_navigation WHERE nav_lang = ? AND nav_status = 1 ORDER BY nav_order', [query.lang || 'zh']); return sendJSON(res, 200, rows); }
    catch(e) { return sendJSON(res, 500, { error: e.message }); }
  }

  // Admin
  if (path === '/api/admin/heroes' && method === 'GET') { if (!adminAuth()) return; return sendJSON(res, 200, data.heroes); }
  const heroMatch = path.match(/^\/api\/admin\/heroes\/([a-z]{2})$/);
  if (heroMatch && method === 'PUT') { if (!adminAuth()) return; const lang = heroMatch[1]; const body = await parseBody(req); if (!data.heroes[lang]) data.heroes[lang] = {}; data.heroes[lang] = { ...data.heroes[lang], ...clean(body), updated_at: new Date().toISOString() }; fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2)); return sendJSON(res, 200, { ok: true }); }

  if (path === '/api/admin/services' && method === 'GET') { if (!adminAuth()) return; try { return sendJSON(res, 200, await q('SELECT * FROM page_feature ORDER BY feature_sort')); } catch(e) { return sendJSON(res, 500, { error: e.message }); } }
  if (path === '/api/admin/services' && method === 'POST') {
    if (!adminAuth()) return;
    try { const b = clean(await parseBody(req));  await q('INSERT INTO page_feature (feature_lang, feature_title, feature_description, feature_sort) VALUES (?,?,?,?)', [b.feature_lang||'zh', b.feature_title, b.feature_description, b.feature_sort||0]); return sendJSON(res, 201, { ok: true }); }
    catch(e) { return sendJSON(res, 500, { error: e.message }); }
  }
  const svcDel = path.match(/^\/api\/admin\/services\/(\w+)$/);
  if (svcDel && method === 'DELETE') { if (!adminAuth()) return; try { await q('DELETE FROM page_feature WHERE id = ?', [svcDel[1]]); return sendJSON(res, 200, { ok: true }); } catch(e) { return sendJSON(res, 500, { error: e.message }); } }

  if (path === '/api/admin/courses' && method === 'GET') { if (!adminAuth()) return; try { return sendJSON(res, 200, await q('SELECT * FROM courses ORDER BY course_sort')); } catch(e) { return sendJSON(res, 500, { error: e.message }); } }
  if (path === '/api/admin/courses' && method === 'POST') {
    if (!adminAuth()) return;
    try { const b = clean(await parseBody(req));  await q('INSERT INTO courses (course_code, course_lang, course_name, course_tag, course_description, course_price, course_days, course_sort) VALUES (?,?,?,?,?,?,?,?)', [b.course_code||null, b.course_lang||'zh', b.course_name, b.course_tag, b.course_description, b.course_price, b.course_days, b.course_sort||0]); return sendJSON(res, 201, { ok: true }); }
    catch(e) { return sendJSON(res, 500, { error: e.message }); }
  }
  const crsDel = path.match(/^\/api\/admin\/courses\/(\w+)$/);
  if (crsDel && method === 'DELETE') { if (!adminAuth()) return; try { await q('DELETE FROM courses WHERE id = ?', [crsDel[1]]); return sendJSON(res, 200, { ok: true }); } catch(e) { return sendJSON(res, 500, { error: e.message }); } }

  if (path === '/api/admin/destinations' && method === 'GET') { if (!adminAuth()) return; try { return sendJSON(res, 200, await q('SELECT * FROM page_destination ORDER BY dest_order')); } catch(e) { return sendJSON(res, 500, { error: e.message }); } }
  if (path === '/api/admin/destinations' && method === 'POST') {
    if (!adminAuth()) return;
    try { const b = clean(await parseBody(req));  await q('INSERT INTO page_destination (dest_code, dest_lang, dest_name, dest_tag, dest_order) VALUES (?,?,?,?,?)', [b.dest_code||null, b.dest_lang||'zh', b.dest_name, b.dest_tag, b.dest_order||0]); return sendJSON(res, 201, { ok: true }); }
    catch(e) { return sendJSON(res, 500, { error: e.message }); }
  }
  const dstPut = path.match(/^\/api\/admin\/destinations\/(\d+)$/);
  if (dstPut && method === 'PUT') { if (!adminAuth()) return; try { const b = clean(await parseBody(req)); const fields = [], vals = []; if(b.dest_name!==undefined){fields.push('dest_name=?');vals.push(b.dest_name);} if(b.dest_tag!==undefined){fields.push('dest_tag=?');vals.push(b.dest_tag);} if(b.dest_code!==undefined){fields.push('dest_code=?');vals.push(b.dest_code);} if(b.dest_description!==undefined){fields.push('dest_description=?');vals.push(b.dest_description);} if(b.dest_content!==undefined){fields.push('dest_content=?');vals.push(b.dest_content);} if(b.dest_image!==undefined){fields.push('dest_image=?');vals.push(b.dest_image);} if(b.dest_image_alt!==undefined){fields.push('dest_image_alt=?');vals.push(b.dest_image_alt);} if(b.dest_order!==undefined){fields.push('dest_order=?');vals.push(b.dest_order);} if(b.featured!==undefined){fields.push('featured=?');vals.push(b.featured);} if(fields.length===0) return sendJSON(res, 400, {error:'No fields to update'}); vals.push(dstPut[1]); await q('UPDATE page_destination SET '+fields.join(',')+' WHERE id=?', vals); return sendJSON(res, 200, {ok:true}); } catch(e) { return sendJSON(res, 500, {error:e.message}); } }
  const dstDel = path.match(/^\/api\/admin\/destinations\/(\w+)$/);
  if (dstDel && method === 'DELETE') { if (!adminAuth()) return; try { await q('DELETE FROM page_destination WHERE id = ?', [dstDel[1]]); return sendJSON(res, 200, { ok: true }); } catch(e) { return sendJSON(res, 500, { error: e.message }); } }

  if (path === '/api/admin/navigation' && method === 'GET') { if (!adminAuth()) return; try { return sendJSON(res, 200, await q('SELECT * FROM page_navigation ORDER BY nav_order')); } catch(e) { return sendJSON(res, 500, { error: e.message }); } }
  if (path === '/api/admin/navigation' && method === 'POST') {
    if (!adminAuth()) return;
    try { const b = clean(await parseBody(req));  await q('INSERT INTO page_navigation (nav_name, nav_url, nav_order, nav_lang) VALUES (?,?,?,?)', [b.nav_name, b.nav_url, b.nav_order||0, b.nav_lang||'zh']); return sendJSON(res, 201, { ok: true }); }
    catch(e) { return sendJSON(res, 500, { error: e.message }); }
  }
  const navDel = path.match(/^\/api\/admin\/navigation\/(\w+)$/);
  if (navDel && method === 'DELETE') { if (!adminAuth()) return; try { await q('DELETE FROM page_navigation WHERE id = ?', [navDel[1]]); return sendJSON(res, 200, { ok: true }); } catch(e) { return sendJSON(res, 500, { error: e.message }); } }

  if (path === '/api/admin/password' && method === 'POST') { if (!adminAuth()) return; const b = await parseBody(req); if (!b.password || b.password.length < 6) return sendJSON(res, 400, { error: 'Min 6 chars' }); data.users[0].password = crypto.createHash('sha256').update(b.password).digest('hex'); fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2)); return sendJSON(res, 200, { ok: true }); }

  if (path === '/admin/login' || path === '/admin/login/') return sendHTML(res, 200, LOGIN_HTML);
  if (path === '/admin/logout' || path === '/admin/logout/') {
    return sendJSON(res, 200, { ok: true });
  }
  if (path === '/admin' || path === '/admin/' || path === '/admin/index.html') {
    // Serve admin page - client-side JS checks for token
    return sendHTML(res, 200, ADMIN_HTML);
  }

  sendJSON(res, 404, { error: 'Not found' });
});

server.listen(PORT, '0.0.0.0', () => console.log('Admin API running on port ' + PORT));
