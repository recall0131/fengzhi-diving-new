#!/bin/bash
git reset --hard HEAD~1
cd infra
docker-compose up -d --build backend frontend
echo "服务回滚完成"