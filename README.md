# 奉旨潜水官方网站
> 全球专业潜水服务平台，提供潜水培训、潜水旅行、潜水体验等服务

## 网站信息
- **网站地址：** https://dejavu.lizheng.info:4443
- **部署方式：** 静态HTML + Nginx
- **技术栈：** 纯静态HTML + CSS + JavaScript
- **SSL证书：** Let's Encrypt（自动续期）
- **联系邮箱：** imperialdiving2015@gmail.com

## 网站内容
### 主页
- 网站介绍
- 服务概览（潜水体验、潜水课程、潜水旅行）
- 12个热门国家目的地
- 联系表单

### 服务页面
- 潜水体验 (diving-experience.html)
- 潜水课程 (diving-courses.html)
- 潜水旅行 (diving-travel.html)

### 国家详情页面（12个）
1. 马尔代夫 (maldives.html) - 马累环礁、阿里环礁、南马累环礁等
2. 印度尼西亚 (indonesia.html) - 巴厘岛、四王群岛、苏拉威西等
3. 菲律宾 (philippines.html) - 阿尼洛、宿务、薄荷岛等
4. 马来西亚 (malaysia.html) - 诗巴丹、马布岛、仙本那等
5. 埃及 (egypt.html) - 赫尔尔格达、沙姆沙伊赫、马萨阿拉姆等
6. 帕劳 (palau.html) - 水母湖、德罗切水道、珊瑚礁等
7. 斐济 (fiji.html) - 太平洋港、塔韦乌尼岛、瓦努阿岛等
8. 毛里求斯 (mauritius.html) - 鹿岛、马埃岛、卡特拉岛等
9. 墨西哥 (mexico.html) - 坎昆、普拉亚德尔卡曼、尤卡坦半岛等
10. 厄瓜多尔 (ecuador.html) - 圣克鲁斯岛、伊莎贝拉岛、费尔南迪纳岛等
11. 中国 (china.html) - 南沙群岛、海南岛、三亚、涠洲岛
12. 美国 (usa.html) - 瓦胡岛、毛伊岛、大岛、考爱岛

## 部署信息
- **服务器：** root@dejavu.lizheng.info
- **部署路径：** /home/fengzhi_diving_deploy/
- **Nginx配置：** /etc/nginx/conf.d/diving.conf
- **SSL证书：** /etc/nginx/certs/

## 快速部署
```bash
# 1. 连接服务器
ssh -i ~/.ssh/lizheng.info.ed25519 root@dejavu.lizheng.info

# 2. 上传文件
scp -i ~/.ssh/lizheng.info.ed25519 *.html root@dejavu.lizheng.info:/home/fengzhi_diving_deploy/

# 3. 重启Nginx
systemctl restart nginx

# 4. 验证网站
curl -k https://dejavu.lizheng.info:4443
```

## 表单配置
- **表单服务：** Formspree
- **表单ID：** xwvnzkol
- **提交地址：** https://formspree.io/f/xwvnzkol
- **反洪水保护：** 60秒冷却期，每小时最多5次提交

## 项目分工
- M1：总控/架构/代码生成/文案生成/任务调度
- dejavu：主站部署+文件归档（主力节点）

## 待办事项
- [ ] 添加中英文语言切换功能
- [ ] 优化移动端体验
- [ ] 添加更多潜水目的地
- [ ] 集成在线预订系统
- [ ] 添加博客/新闻模块

## 文档目录
- docs/PRD.md：产品需求文档
- docs/SITEMAP.md：站点地图与线框
- docs/ROADMAP.md：开发路线图
- docs/DEPLOY.md：部署指南
- docs/CHECKLIST.md：上线检查清单

## 许可证
Copyright © 2026 奉旨潜水. All rights reserved.
