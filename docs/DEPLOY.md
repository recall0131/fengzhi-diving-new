# 奉旨潜水官网 部署指南
## 前置依赖
- Docker & Docker Compose
- 域名解析指向服务器IP
- SSL证书（可通过Certbot自动申请）

## 部署步骤
1. 克隆仓库到部署服务器
2. 复制 `.env.example` 为 `.env` 并配置环境变量
3. 执行 `./scripts/start.sh` 启动所有服务
4. 配置Nginx反向代理与SSL证书
5. 验证站点访问与功能正常