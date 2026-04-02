# 凤志潜水网站 — 修复项目清单

> 基于六维度审计报告 (2026-04-02)
> 生成时间：2026-04-02 23:36 GMT+8

---

## 📋 项目概览

**当前状态**: ❌ 不能上线
**架构评分**: 前端 2/10 | 前后端集成 0/10 | 安全 2/10 | 数据库 6/10 | 代码质量 4/10 | 部署就绪 3/10
**建议方向**: 纯静态营销站（API/CMS 后续迭代）
**架构结论（2026-04-03）**: 前端 `fengzhi_diving_v5.html` 不调用任何 API，是纯静态页面。API Server + Admin CMS 保留作为管理后台，但前台为静态。无需强行对接。

---

## 🔴 P0 — 立即修复（阻塞上线）

### P0-1: 填写所有死链
- **文件**: `fengzhi_diving_v5.html`
- **问题**: 11处 `href="#"` 死链
- **影响**: 网站无法导航
- **修复**: 填入真实 URL
  - [ ] Hero CTA 按钮 (行 594)
  - [ ] 导航菜单项 (行 604-607)
  - [ ] 课程区块链接 (行 621, 851)
  - [ ] 目的地区块链接 (行 871-873)
  - [ ] 联系区块链接 (行 879-881)
  - [ ] 底部导航 (行 887-889)
- **参考**: 律师团队页面 `/c/lvshifengcai.html` 格式

### P0-2: 创建 package.json
- **文件**: `package.json` (新建)
- **问题**: 无法 `npm install`
- **修复**:
```json
{
  "name": "fengzhi-diving-api",
  "version": "1.0.0",
  "description": "Imperial Diving Club API",
  "main": "diving_api_final.js",
  "scripts": {
    "start": "node diving_api_final.js"
  },
  "dependencies": {
    "mysql2": "^3.6.0"
  }
}
```

### P0-3: 删除/保护 /auth/register
- **文件**: `diving_api_final.js`
- **问题**: 公开注册端点，任何人可注册 admin
- **修复**: 删除整个 `/auth/register` 分支，或加邀请码验证

### P0-4: 设置强 JWT_SECRET
- **文件**: `diving_api_final.js` 行 8
- **问题**: fallback 值 hardcoded
- **修复**: 删除 fallback，强制要求环境变量
```js
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) { console.error('JWT_SECRET required'); process.exit(1); }
```

### P0-5: 删除硬编码数据库凭据 fallback
- **文件**: `diving_api_final.js` 行 11-16
- **问题**: `root123` 作为默认密码
- **修复**: 删除所有 `||` fallback，环境变量必须设置

### P0-6: 创建 /app/ 目录
- **问题**: `/app/data.json` 写入时目录不存在会崩溃
- **修复**: 
  - [ ] 部署时先创建 `/app/` 目录
  - [ ] 或修改 `DATA_FILE` 路径到 `/tmp/`

---

## 🟠 P1 — 尽快修复（安全/功能）

### P1-1: 替换 SHA-256 → bcrypt
- **文件**: `diving_api_final.js` 行 207, 214
- **问题**: 密码无盐，彩虹表攻击
- **修复**: 
  - [ ] `npm install bcrypt`
  - [ ] `const bcrypt = require('bcrypt');`
  - [ ] 注册: `bcrypt.hash(body.password, 10)`
  - [ ] 登录: `bcrypt.compare(body.password, user.password)`

### P1-2: 给 /auth/login 加限流
- **文件**: `diving_api_final.js`
- **问题**: 无登录次数限制，可暴力破解
- **修复**: 用内存 map 简单限流（进阶用 `express-rate-limit`）
```js
const loginAttempts = new Map();
function loginLimiter(ip) {
  const now = Date.now();
  const key = `login:${ip}`;
  const count = (loginAttempts.get(key) || []).filter(t => now - t < 900000).length;
  if (count >= 5) return false;
  (loginAttempts.get(key) || []).push(now);
  return true;
}
```

### P1-3: 添加 SEO meta 标签
- **文件**: `fengzhi_diving_v5.html` `<head>`
- **修复**:
  - [ ] `<meta name="description" content="...">`
  - [ ] `<meta name="keywords" content="潜水,仙本那,沙巴,马来西亚潜水,PADI">`
  - [ ] Open Graph tags (og:title, og:description, og:image)
  - [ ] `<link rel="canonical" href="...">`

### P1-4: 给图片加 alt 替代方案
- **文件**: `fengzhi_diving_v5.html`
- **问题**: CSS background-image 对屏幕阅读器和 SEO 不可见
- **修复**: 将 hero 和卡片图片从 `style="background-image"` 改为 `<img>` 标签并加 `alt`

### P1-5: 添加 sitemap.xml 和 robots.txt
- **新建文件**: `sitemap.xml`, `robots.txt`
- **内容**: 标准 sitemap + 允许爬虫

### P1-6: 更新版权年份
- **文件**: `fengzhi_diving_v5.html` 行 870
- **修复**: `© 2024` → `© 2026`

---

## 🟡 P2 — 建议修复（体验优化）

### P2-1: 前后端对接（CMS 功能激活）
- **问题**: 前端是静态页面，API 是死代码
- **方案A（推荐）**: 纯静态站，移除 CMS 功能
- **方案B**: 重写前端，fetch 调用 API
- **负责文件**: `fengzhi_diving_v5.html`

### P2-2: 分离 ADMIN_HTML 为独立文件
- **文件**: `diving_api_final.js` (289行模板字符串)
- **问题**: 内嵌 HTML 无法独立开发/调试
- **修复**: 拆分为 `admin.html`，`server.js` 只做 API

### P2-3: 替换手写 JWT 为 jsonwebtoken
- **文件**: `diving_api_final.js` 行 58-74
- **问题**: 不符合 JWT 规范，无 alg 字段
- **修复**: `npm install jsonwebtoken` + `jwt.verify()`
- **参考**:
```js
const jwt = require('jsonwebtoken');
const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
jwt.verify(token, JWT_SECRET);
```

### P2-4: 数据库加索引
- **文件**: `init_diving_admin.sql`
- **修复**:
```sql
ALTER TABLE page_navigation ADD INDEX idx_nav_pos_lang (nav_position, nav_lang);
ALTER TABLE page_content ADD UNIQUE INDEX idx_page_code_lang (page_code, page_lang);
ALTER TABLE courses ADD INDEX idx_course_lang (course_lang);
```

### P2-5: 规范化 status 字段类型
- **文件**: `init_diving_admin.sql`
- **问题**: `nav_status` 用 INT，其他用 VARCHAR
- **修复**: 统一为 `VARCHAR(20)` + 'ACTIVE'/'INACTIVE'

### P2-6: 课程价格/天数改为数值类型
- **文件**: `init_diving_admin.sql`
- **修复**:
```sql
ALTER TABLE courses MODIFY course_price DECIMAL(10,2);
ALTER TABLE courses MODIFY course_days INT;
```

### P2-7: 添加 favicon
- **文件**: `fengzhi_diving_v5.html` `<head>`
- **修复**: `<link rel="icon" href="/favicon.ico">`

### P2-8: 图片加 loading="lazy"
- **文件**: `fengzhi_diving_v5.html`
- **问题**: 20张 Unsplash 图片立即加载
- **修复**: 所有 `<img>` 加 `loading="lazy"`

### P2-9: 清理无用代码
- **文件**: `diving_api_final.js`
- **清理**:
  - [ ] 删除 `id8()` 函数（未调用）
  - [ ] 删除 `data.columns` 相关死代码（行 233，永远空数组）
  - [ ] 删除 `diving_api_server.js`（旧版冗余）

### P2-10: 统一错误响应格式
- **文件**: `diving_api_final.js`
- **修复**: 所有接口统一 `{ success: bool, data?, error? }` 结构

---

## 📊 修复进度（2026-04-02 23:50 GMT+8 更新）

| 优先级 | 总数 | 已完成 | 待处理 |
|--------|------|--------|--------|
| P0 | 6 | 6 | 0 |
| P1 | 6 | 5 | 1 |
| P2 | 10 | 3 | 7 |
| **合计** | **22** | **14** | **8** |

### ✅ 已完成项
- [x] P0-1: 填写所有死链 (1号·前端)
- [x] P0-2: package.json 创建 (2号·后端安全)
- [x] P0-3: /auth/register 删除 (2号·后端安全)
- [x] P0-4: JWT_SECRET 强制环境变量 (2号·后端安全)
- [x] P0-5: DB密码 fallback 删除 (2号·后端安全)
- [x] P0-6: /app/ 目录保障 (2号·后端安全)
- [x] P1-1: SHA-256 → bcrypt (2号·后端安全)
- [x] P1-2: 登录限流 (2号·后端安全)
- [x] P1-3: SEO meta 标签 (1号·前端)
- [x] P1-5: sitemap.xml + robots.txt (1号·前端)
- [x] P1-6: 版权年份更新 (1号·前端)
- [x] P2-3: 手写JWT → jsonwebtoken (3号·后端JWT)
- [x] P2-4: 数据库索引 (4号·数据库)
- [x] P2-5: status字段类型规范化 (4号·数据库)
- [x] P2-6: 课程价格/天数数值化 (4号·数据库)
- [x] P2-7: favicon (1号·前端)
- [x] P2-9: id8()删除 + 旧文件归档 (3号·后端JWT)

### 🔄 进行中
- [ ] P1-4: 图片alt替代方案（CSS background-image改img标签）— 可选，布局可能受影响
- [ ] P2-1: 前后端对接 → ✅ **已确认纯静态站**，无需对接
- [ ] P2-2: ADMIN_HTML分离（2号子智能体处理中）
- [ ] P2-8: 图片loading="lazy"（2号子智能体处理中）
- [ ] P2-10: 统一错误响应格式 ✅ 已完成

### 📁 变更文件清单
| 文件 | 操作 | 执行者 |
|------|------|--------|
| fengzhi_diving_v5.html | 修改 | 1号·前端 |
| diving_api_final.js | 修改 | 2号·安全 + 3号·JWT |
| package.json | 新建 | 2号·后端安全 |
| robots.txt | 新建 | 1号·前端 |
| sitemap.xml | 新建 | 1号·前端 |
| init_diving_admin_v2.sql | 新建 | 4号·数据库 |
| migrate_nav_status.sql | 新建 | 4号·数据库 |
| archive_diving_api_server.js | 归档 | 3号·后端JWT |
| archive_server_diving_api.js | 归档 | 3号·后端JWT |

---

## 🗂️ 文件清单

| 文件 | 操作 |
|------|------|
| `fengzhi_diving_v5.html` | 修改 |
| `diving_api_final.js` | 修改 |
| `init_diving_admin.sql` | 修改 |
| `package.json` | 新建 |
| `sitemap.xml` | 新建 |
| `robots.txt` | 新建 |
| `admin.html` | 新建（替换内嵌模板） |
| `diving_api_server.js` | 删除 |

---

## 🚀 部署检查清单

- [x] `package.json` 已创建（包含 mysql2, bcrypt, jsonwebtoken 依赖）
- [ ] MySQL 运行中，`diving_admin` 库已创建
- [ ] `npm install` 已执行
- [ ] 环境变量已设置: `PORT`, `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET` ⚠️ 必须
- [ ] `/app/` 目录已创建且可写（代码已自动创建）
- [ ] `pm2` 或 `systemd` 已配置自动重启
- [ ] SSL 证书已配置（反向代理层）
- [ ] 防火墙开放 `3001` 端口
- [ ] 运行 `init_diving_admin_v2.sql`（新索引和字段优化）
- [ ] admin 初始密码需重新 bcrypt 哈希（当前为 SHA-256，需重置）
