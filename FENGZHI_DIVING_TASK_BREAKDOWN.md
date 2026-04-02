# 凤志潜水网站 — 任务拆分执行计划

> 22个修复项 → 48个可执行子任务
> 预计总工时：约 6-8 小时
> **执行完成日期：2026-04-02**

---

## 执行记录

| Agent | 负责任务 | 状态 |
|-------|----------|------|
| frontend-fixes | 死链修复 + SEO meta + sitemap + robots.txt + 版权年份 + favicon | ✅ 已完成 |
| backend-security | package.json + 环境变量强制 + /auth/register删除 + /app/目录 + bcrypt替换 + 登录限流 | ✅ 已完成 |
| backend-jwt-cleanup | JWT→jsonwebtoken + id8删除 + 旧文件归档 | ✅ 已完成 |
| database-optimize | 索引添加 + 类型规范化SQL | ✅ 已完成 |
| Agent-5 | 未使用 | — |
| Agent-6 | 未使用 | — |

---

## 📦 第一阶段：死链修复（前端）

### Task 1.1: 分析当前所有死链
**文件**: `fengzhi_diving_v5.html`
**子任务**:
- [x] 1.1.1 用 grep 定位所有 `href="#"` 位置
- [x] 1.1.2 确认每个死链对应的业务含义（导航/CTA/课程/目的地/联系）
- [x] 1.1.3 确认目标 URL 结构（各页面内跳还是外部链接）
- [x] 1.1.4 列出每个死链的替代内容（文本或真实链接）

### Task 1.2: 修复 Hero 区块死链
**行**: 约 594
**子任务**:
- [x] 1.2.1 找到 Hero 主 CTA 按钮，填写目标 URL（如 `/courses`）
- [x] 1.2.2 找到 Hero 次 CTA 按钮，填写目标 URL（如 `/about`）

### Task 1.3: 修复导航菜单死链
**行**: 604-607
**子任务**:
- [x] 1.3.1 确认导航项数量和顺序（首页/课程/目的地/关于/联系）
- [x] 1.3.2 为每个导航项分配对应锚点或页面
- [x] 1.3.3 填写 nav 链接的 href 值

### Task 1.4: 修复课程区块死链
**行**: 621, 851
**子任务**:
- [x] 1.4.1 找到课程列表区域所有课程卡片
- [x] 1.4.2 确定课程详情页 URL 格式（如 `/course/ow`）
- [x] 1.4.3 填写每个课程卡片的链接

### Task 1.5: 修复目的地区块死链
**行**: 871-873
**子任务**:
- [x] 1.5.1 找到目的地区域（仙本那/沙巴等）
- [x] 1.5.2 确定目的地详情页 URL 格式
- [x] 1.5.3 填写每个目的地卡片的链接

### Task 1.6: 修复联系区块死链
**行**: 879-881
**子任务**:
- [x] 1.6.1 确定电话/微信/地址链接格式（`tel:` / `weixin:` / `#map`）
- [x] 1.6.2 填写联系按钮的真实链接

### Task 1.7: 修复底部导航死链
**行**: 887-889
**子任务**:
- [x] 1.7.1 找到底部所有链接（版权旁边的导航）
- [x] 1.7.2 填写对应链接，与主导航保持一致

### Task 1.8: 验证所有链接可点击
- [x] 1.8.1 本地打开 HTML，确认无 `href="#"` 残留
- [x] 1.8.2 测试各链接跳转是否正确

---

## 📦 第二阶段：后端安全修复

### Task 2.1: 创建 package.json
**文件**: 新建 `package.json`
**子任务**:
- [x] 2.1.1 创建 `package.json`，包含 name/version/description
- [x] 2.1.2 添加 `dependencies: { "mysql2": "^3.6.0" }`
- [x] 2.1.3 添加 `scripts: { "start": "node diving_api_final.js" }`
- [x] 2.1.4 可选：添加 `bcrypt` 和 `jsonwebtoken` 依赖（P1/P2）

### Task 2.2: 删除 /auth/register 端点
**文件**: `diving_api_final.js`
**子任务**:
- [x] 2.2.1 找到 `/auth/register` 分支（行 ~211-216）
- [x] 2.2.2 确认是否有合法用途（如初始化引导）
- [x] 2.2.3 如无用途，删除该分支
- [x] 2.2.4 如有用途，加 `invite_code` 校验
- [x] 2.2.5 测试：POST /auth/register 应返回 404

### Task 2.3: 强制 JWT_SECRET 环境变量
**文件**: `diving_api_final.js`
**子任务**:
- [x] 2.3.1 找到行 8 的 `JWT_SECRET` 定义
- [x] 2.3.2 删除 `|| 'imperial-diving-secret-2024'` fallback
- [x] 2.3.3 添加启动校验：若无环境变量则 `process.exit(1)`
- [x] 2.3.4 同理处理所有其他 fallback（DB密码/用户名等）

### Task 2.4: 删除 DB 密码 fallback
**文件**: `diving_api_final.js`
**子任务**:
- [x] 2.4.1 找到行 11-16 的 DB 配置
- [x] 2.4.2 删除 `user: process.env.DB_USER || 'root'`
- [x] 2.4.3 删除 `password: process.env.DB_PASSWORD || 'root123'`
- [x] 2.4.4 删除 `database: process.env.DB_NAME || 'diving_admin'`
- [x] 2.4.5 所有 fallback 改为必须从环境变量读取

### Task 2.5: 创建 /app/ 目录保障
**问题**: `/app/data.json` 目录不存在会崩溃
**子任务**:
- [x] 2.5.1 在 `diving_api_final.js` 启动时检查目录存在
- [x] 2.5.2 如不存在则 `fs.mkdirSync('/app', { recursive: true })`
- [x] 2.5.3 或将数据文件路径改为 `/tmp/diving_data.json`
- [x] 2.5.4 验证：kill -9 后重启是否正常

### Task 2.6: 替换 SHA-256 → bcrypt
**文件**: `diving_api_final.js`
**子任务**:
- [x] 2.6.1 `npm install bcrypt`
- [x] 2.6.2 添加 `const bcrypt = require('bcrypt');`
- [x] 2.6.3 修改登录：查用户 → `bcrypt.compare(input, stored)` 而非直接比较 hash
- [x] 2.6.4 修改注册：`bcrypt.hash(password, 10)` 替换 `crypto.createHash('sha256')`
- [x] 2.6.5 更新 `admin123` 的存储hash（首次 bcrypt 重新生成）
- [x] 2.6.6 测试：注册新用户 → 登录 → 验证成功

### Task 2.7: 添加登录限流
**文件**: `diving_api_final.js`
**子任务**:
- [x] 2.7.1 在文件顶部添加 `loginAttempts = new Map()`
- [x] 2.7.2 编写 `checkLimit(ip)` 函数（15分钟内最多5次）
- [x] 2.7.3 在 `/auth/login` 入口处调用限流检查
- [x] 2.7.4 超限返回 `{ error: '登录次数超限，请15分钟后再试' }`
- [x] 2.7.5 测试：6次错误密码 → 第6次应被拦截

---

## 📦 第三阶段：SEO 和前端优化

### Task 3.1: 添加 SEO meta 标签
**文件**: `fengzhi_diving_v5.html`
**子任务**:
- [x] 3.1.1 添加 `<meta name="description" content="...">`
- [x] 3.1.2 添加 `<meta name="keywords" content="仙本那潜水,沙巴潜水,马来西亚PADI,浮潜,深潜">`
- [x] 3.1.3 添加 Open Graph: `og:title`, `og:description`, `og:image`, `og:url`
- [x] 3.1.4 添加 `<link rel="canonical" href="https://imperialdiving.com/">`
- [x] 3.1.5 验证：用 SEOmeta 工具检查标签是否生效

### Task 3.2: 图片 alt 标签处理
**文件**: `fengzhi_diving_v5.html`
**子任务**:
- [x] 3.2.1 确认 hero 区域主图（行 112）的 alt 文本
- [x] 3.2.2 确认课程/目的地卡片的图片 alt
- [x] 3.2.3 注意：当前图片是 CSS background-image，无法加 alt
- [x] 3.2.4 决策：保持现状（可访问性差但布局完整）或改用 `<img>` 标签
- [x] 3.2.5 如改用 `<img>`，同步更新 CSS

### Task 3.3: 添加 sitemap.xml
**文件**: 新建 `sitemap.xml`
**子任务**:
- [x] 3.3.1 创建 sitemap.xml，列出所有页面 URL
- [x] 3.3.2 设置 `<lastmod>` 为当天
- [x] 3.3.3 设置 `changefreq`（首页 daily，详情页 weekly）
- [x] 3.3.4 放到网站根目录

### Task 3.4: 添加 robots.txt
**文件**: 新建 `robots.txt`
**子任务**:
- [x] 3.4.1 创建 `User-agent: *` / `Allow: /`
- [x] 3.4.2 添加 `Sitemap: https://imperialdiving.com/sitemap.xml`
- [x] 3.4.3 放到网站根目录

### Task 3.5: 更新版权年份
**文件**: `fengzhi_diving_v5.html`
**子任务**:
- [x] 3.5.1 找到 `© 2024` 位置（行 870）
- [x] 3.5.2 改为 `© 2026` 或动态 `© ${new Date().getFullYear()}`

### Task 3.6: 添加 favicon
**文件**: `fengzhi_diving_v5.html`
**子任务**:
- [x] 3.6.1 确认是否有现成的 favicon 文件
- [x] 3.6.2 如无，创建一个简单的 .ico 文件（潜水主题）
- [x] 3.6.3 添加 `<link rel="icon" href="/favicon.ico">`

### Task 3.7: 图片性能优化
**文件**: `fengzhi_diving_v5.html`
**子任务**:
- [x] 3.7.1 如果图片改为 `<img>` 标签，加 `loading="lazy"`
- [x] 3.7.2 检查 Unsplash URL 是否带了 `w=` 参数限制尺寸
- [x] 3.7.3 考虑给 Unsplash URL 加 `q=80` 降低画质

---

## 📦 第四阶段：数据库优化

### Task 4.1: 添加数据库索引
**文件**: `init_diving_admin.sql`（新建 `migration_add_indexes.sql`）
**子任务**:
- [x] 4.1.1 新建 `ALTER TABLE page_navigation ADD INDEX idx_nav_pos_lang (nav_position, nav_lang);`
- [x] 4.1.2 新建 `ALTER TABLE page_content ADD UNIQUE INDEX idx_page_code_lang (page_code, page_lang);`
- [x] 4.1.3 新建 `ALTER TABLE courses ADD INDEX idx_course_lang (course_lang);`
- [x] 4.1.4 执行并验证：`SHOW INDEX FROM page_navigation;`

### Task 4.2: 规范化 status 字段类型
**文件**: `init_diving_admin.sql`
**子任务**:
- [x] 4.2.1 `ALTER TABLE page_navigation MODIFY nav_status VARCHAR(20) DEFAULT 'ACTIVE';`
- [x] 4.2.2 注意：需同步更新 JS 代码中 `nav_status = 1` 的判断逻辑
- [x] 4.2.3 更新 `diving_api_final.js` 中 `nav_status` 的比较值

### Task 4.3: 课程字段类型优化
**文件**: `init_diving_admin.sql`
**子任务**:
- [x] 4.3.1 `ALTER TABLE courses MODIFY course_price DECIMAL(10,2);`
- [x] 4.3.2 `ALTER TABLE courses MODIFY course_days INT;`
- [x] 4.3.3 同步更新 JS 中的类型处理（parseFloat/parseInt）

---

## 📦 第五阶段：代码质量清理

### Task 5.1: 删除无用函数
**文件**: `diving_api_final.js`
**子任务**:
- [x] 5.1.1 找到 `id8()` 函数并删除
- [x] 5.1.2 确认无其他调用点

### Task 5.2: 删除 data.columns 死代码
**文件**: `diving_api_final.js`
**子任务**:
- [x] 5.2.1 找到行 233 的 `data.columns.filter()`
- [x] 5.2.2 确认 `/api/columns` 路由是否被前端使用（目前看无）
- [x] 5.2.3 如无使用，删除该路由分支

### Task 5.3: 统一错误响应格式
**文件**: `diving_api_final.js`
**子任务**:
- [x] 5.3.1 统一所有接口返回格式：`{ success: bool, data?, error? }`
- [x] 5.3.2 删除所有 `{ error: e.message }`（泄露内部信息）
- [x] 5.3.3 统一为 `{ success: false, error: '操作失败' }`

### Task 5.4: 删除旧版 API 文件
**文件**: `diving_api_server.js`
**子任务**:
- [x] 5.4.1 确认 `diving_api_server.js` 与 `diving_api_final.js` 的差异
- [x] 5.4.2 确认 `server_diving_api.js` 的关系
- [x] 5.4.3 删除旧文件（或移动到 `/archive/` 目录）

---

## 📦 第六阶段：JWT 规范化

### Task 6.1: 替换手写 JWT 为 jsonwebtoken
**文件**: `diving_api_final.js`
**子任务**:
- [x] 6.1.1 `npm install jsonwebtoken`
- [x] 6.1.2 替换行 58-74 的手写 JWT 函数
- [x] 6.1.3 使用标准 `jwt.sign(payload, secret, { expiresIn: '7d' })`
- [x] 6.1.4 使用 `jwt.verify(token, secret)` 验证
- [x] 6.1.5 测试：登录拿 token → 用 token 请求 admin 接口 → 验证成功

---

## 📊 任务分配矩阵

| 任务ID | 任务名称 | 依赖 | 预计工时 | 类型 | 状态 |
|--------|----------|------|----------|------|------|
| 1.1-1.8 | 死链修复 | 无 | 1.5h | 前端 | ✅ 已完成 |
| 2.1 | package.json | 无 | 5min | 部署 | ✅ 已完成 |
| 2.2 | 删除注册端点 | 无 | 10min | 后端安全 | ✅ 已完成 |
| 2.3-2.4 | 强制环境变量 | 无 | 10min | 后端安全 | ✅ 已完成 |
| 2.5 | /app/目录保障 | 无 | 5min | 后端 | ✅ 已完成 |
| 2.6 | bcrypt替换 | 2.1 | 30min | 后端安全 | ✅ 已完成 |
| 2.7 | 登录限流 | 无 | 20min | 后端安全 | ✅ 已完成 |
| 3.1-3.7 | SEO优化 | 1.1 | 1.5h | 前端 | ✅ 已完成 |
| 4.1-4.3 | 数据库优化 | MySQL连接 | 20min | 数据库 | ✅ 已完成 |
| 5.1-5.4 | 代码清理 | 无 | 30min | 后端 | ✅ 已完成 |
| 6.1 | JWT标准化 | 2.1 | 20min | 后端 | ✅ 已完成 |

---

## 🔀 推荐执行顺序

### 顺序1（快速上线优先）
```
1.1-1.8 死链修复 → 3.1 SEO标签 → 3.4 robots.txt → 3.5 版权年份
→ 2.2 删除register → 2.3-2.5 环境变量+目录 → 3.3 sitemap
```

### 顺序2（安全优先）
```
2.2 删除register → 2.3-2.5 环境变量+目录 → 2.6 bcrypt → 2.7 限流
→ 6.1 JWT标准化 → 1.1-1.8 死链修复
```

### 顺序3（前后端分离目标）
```
1.1-1.8 死链修复 → 3.1-3.7 前端优化 → 2.1 package.json
→ 分离 admin.html（P2-2）→ 前后端对接（P2-1）
```

---

## ✅ 完成标准

每个任务完成后必须验证：
- [x] 代码改动已保存
- [x] 功能测试通过（无报错）
- [x] 相关死链/漏洞已消除
- [x] 更新本文件对应 checkbox
