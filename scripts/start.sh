#!/bin/bash
cd infra
cp .env.example .env
docker-compose up -d --build
echo "服务启动完成，访问地址：https://your-domain.com"