# MEMORY.md - 长期记忆

## 🖥️ 服务器基础设施（2026-04-02 更新）

### Tailscale 节点状态（2026-04-02 12:48）

| 节点 | Tailscale IP | 公网接入 | 机房 | OS | 状态 | OpenClaw |
|------|-------------|---------|------|----|------|-----------|
| x260 | 100.98.229.6 | - | 本地 | Linux | ✅ online | ✅ 运行中（81 sessions） |
| web | 100.90.115.40 | web.lizheng.info (38.146.25.30) | LA | Ubuntu 22.04 | ✅ online | ❌ Gateway stopped（4h无活动） |
| 10cent | 100.77.86.107 | 10cent.lizheng.info (140.143.237.110) | 德国 | Ubuntu 24.04 | ✅ online | ⚠️ SSH不通（Tailscale SSH可尝试） |
| aus | 100.118.10.11 | aus.lizheng.info (67.219.108.10) | 悉尼 | CentOS 7 | ✅ online | ❌ 无OpenClaw（GLIBC不兼容） |
| joburg | 100.93.159.101 | joburg.lizheng.info (139.84.228.52) | 约翰内斯堡 | Ubuntu 24.04 | ✅ online | ✅ 运行中（68 sessions，活跃） |
| **dejavu** | 100.115.174.1 | - | LA | CentOS 7 | ✅ online | ❌ 无OpenClaw（GLIBC不兼容） |
| gmk1 | 100.98.82.42 | - | 内网 | Ubuntu 24.04 | ✅ online（InEngine） | ✅ 运行中（5 sessions，systemd） |
| gmk2 | 100.100.4.38 | - | 内网 | Ubuntu 24.04 | ✅ online | ❌ Gateway stopped（24 sessions） |
| macm1 | 100.90.170.24 | - | 内网 | macOS | ✅ online | ⚠️ PATH无node，需修复 |
| mac2015 | 100.95.205.66 | - | 内网 | macOS | ✅ online | ❓ 未检测 |
| nas | 100.73.132.74 | - | 内网 | Linux | ✅ online | ❌ 无OpenClaw |
| lizheng-g15 | 100.94.52.50 | - | 内网 | Windows | ✅ online | ❓ 未检测 |

**hostname 一览：**
- x260: recall-x260（本地）
- web: srv884857451 | 10cent: VM-0-5-ubuntu
- aus: vultr.guest | joburg: vultr | **dejavu: lax-sm5038ml-h24trf-2-15**
- gmk1: recall-gmk | gmk2: gmk-2 | nas: RecallsDS
- macm1: MacBookPro | mac2015: Recall的MacBook2015 | lizheng-g15: DESKTOP-ISN6609

**DERP 中继延迟（x260 本地）：**
- 最近：Tokyo 61ms | Singapore 82ms | Hong Kong 96ms
- 远程：Johannesburg 293ms | São Paulo 371ms

**Tailscale Funnel：** 已开启 443/8443/10000 端口映射（x260）

**exit node IP：** 38.75.137.61（dejavu）

**dejavu 运行服务：** diving-api (Docker node:18-slim, :3001)、Next.js (:3002)、MySQL (宿主机)

**SSH登录方式：**
- 用户：root
- **Tailscale SSH**：所有节点均在线，可通过 `ssh <hostname>` 直连
- macm1：Tailscale SSH 可达，但 node PATH 有问题（`env: node: No such file or directory`）
- 10cent：公网 SSH 22 端口不通，Tailscale SSH 可尝试
- mac2015 / lizheng-g15：Tailscale 在线，SSH 认证问题
- aus / dejavu：CentOS 7，GLIBC 2.17，不支持 Node 22，无 OpenClaw
- Tailscale Funnel：x260 已开启 443/8443/10000

## 🔑 GitHub
- 用户名：recall0131
- 主页：https://github.com/recall0131

## 🌐 网站项目

### dejavu.lizheng.info
- **类型：** 潜水度假村网站（中英双语）
- **地址：** https://dejavu.lizheng.info:4443/
- **中文版：** /zh/ | **英文版：** /en/
- **部署路径：** /home/resort_deja_vu_deploy/
- **文件位置：** /home/resort_deja_vu_deploy/index.html
- **备份：** index.html.backup.YYYYMMDD_HHMMSS
- **已完成优化（2026-02-25）：**
  - SEO优化、结构化数据、PWA支持
  - 移动端响应式设计、图片懒加载
  - UI改进、WhatsApp/微信联系按钮

### 管理后台框架（2026-03-31突破性进展）
- **状态：** 后端API上线，管理UI已部署，数据已录入
- **公网：** https://imperialdiving.lizheng.info/admin/ | 账号：admin@imperialdiving.com / admin123
- **后端：** diving-api容器，Node.js原生，MySQL Docker（diving_admin库）
- **API Server：** /home/diving-admin/src/server.js
- **详情：** 见 memory/2026-03-31.md

## 📋 任务管理原则

### 任务分类（2026-03-03确立）
1. **开发相关** - 网站开发、前后端、数据库
2. **测试相关** - 功能/兼容性/性能/安全测试
3. **部署相关** - 环境部署、配置管理、发布
4. **运维相关** - 系统维护、安全更新、故障处理
5. **验收相关** - 用户验收、质量验收、交付验收
6. **行政相关** - 文档整理、日程安排

### 每个任务独立session原则（2026-03-03确立）
- 新任务开启独立session
- 任务完成后关闭session并记录到记忆
- 保持任务间清晰边界

### 记忆管理原则（2026-03-11用户提出）
- **精简原则：** 只保留真正重要的学习，定期清理过时的
- **分层记忆：** 日常细节放daily memory，核心原则才进SOUL.md
- **定期蒸馏：** 把多条类似学习合并成一条原则
- **按需加载：** 不是所有学习都要每次对话加载

## 🔧 工具安装记录
- **Agent Reach**（2026-03-02）：AI代理互联网访问能力
  - 安装路径：`/Users/lizheng/Library/Python/3.9/bin/agent-reach`
  - 技能位置：`/Users/lizheng/.openclaw/skills/agent-reach`
  - 状态：4/12渠道可用

## 🌐 全节点代理服务（已知基础设施）
- **5588端口**：trojan 代理，多节点部署（web、joburg、dejavu）
- 属于用户自建代理体系，非漏洞，正常放行

## 🔒 SSH安全升级（2026-03-03）
- **已完成：** web.lizheng.info、10cent.lizheng.info、joburg.lizheng.info
- **Ubuntu 24.04：** 支持后量子Kex算法（无警告）
- **CentOS Stream 9：** OpenSSH 9.9p1，无后量子支持（仍有警告）
- **CentOS 7：** OpenSSH 7.4p1，需要系统升级
- **重要发现：** Ubuntu 24.04默认支持后量子算法，CentOS/RHEL需源码编译

## 🧠 Agent经验教训（累计41条）

### 执行与速度
1. 用户说"赶紧/快速/搞定"时，用最快方法达成，完美可以迭代
2. 翻译完一个页面立即部署，再翻译下一个，不要等
3. 批量处理类似任务，保持效率

### 质量检查
4. 验证翻译质量，不只检查有无中文字符，要检查语法/标点/完整性
5. 理解用户实际需求，不只做最低限度
6. 报告前先验证，检查用户实际要的是什么

### 错误处理
7. 犯错了立即承认，不找借口
8. 从错误中学习，确保不再发生
9. 主动日志监控，寻找模式不只看单个错误
10. 发现节点/服务故障，应立即尝试本地修复（sudo systemctl restart ssh 等），无法修复才上报；不要只报告问题而不尝试解决

### 配置检查
10. 检查配置文件要仔细阅读所有内容，不只搜索关键词
11. 改配置后要用适当命令验证（如openclaw models status）

### 备份原则
12. 修改重要配置前先备份
13. 从备份恢复比修复损坏系统更容易

### 沟通节奏
14. 保持用户更新但不要滥发
15. 尽早提出澄清问题
16. 每次任务完成后清晰标记为已完成

### 上下文切换
17. 任务间切换时心理上重置上下文
18. 使用记忆文件跟踪每个任务完成内容
19. 不要留下未完成任务，打断时留清晰笔记

### 进度汇报
20. 列出确切完成内容，用✅标记进度
21. 完全完成一个任务后再进行下一个

## ⚠️ 安全提醒（2026-03-10）
- **browser-use技能有严重安全隐患**：可执行任意Python/JS代码、读写本地文件
- **建议：**
  1. 强化网络控制，不将管理端口直接暴露公网
  2. 加强凭证管理，避免明文存储密钥
  3. 严格管理插件来源，禁用自动更新
  4. 及时进行版本更新和安全补丁

## 📊 待处理任务
- [ ] 前端Next.js页面对接管理后台API（数据驱动）
- [ ] 管理后台完善编辑/删除功能
- [ ] 英文版数据录入
- [ ] ISR缓存配置（内容更新后自动刷新）
- [ ] 高德地图API密钥配置
- [ ] 高德地图API密钥配置
- [ ] QQ邮箱授权码获取
- [ ] 英文页面翻译质量深度优化（剩余~6151字符）
- [ ] CentOS 7服务器SSH升级
