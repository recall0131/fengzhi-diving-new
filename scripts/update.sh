#!/bin/bash
git pull origin main
cd infra
docker-compose up -d --build backend frontend
echo "服务更新完成"