#!/usr/bin/env python3
import re

with open('/var/www/jsjunshao/insights.html', 'r') as f:
    content = f.read()

# Correct mapping
mapping = [
    '/images/article-1.jpg',  # featured公司法
    '/images/article-2.jpg',  # 建设工程
    '/images/article-3.jpg',  # 知识产权
    '/images/article-4.png',  # 金融保险
    '/images/article-5.png',  # 刑事法务
    '/images/article-6.png',  # 劳动法务
    '/images/article-7.jpg',  # 建设工程
]

pattern = r'<img src="/images/article-\d+\.(jpg|png)" alt="文章封面"[^>]*>'

def replacer(m):
    idx = 0
    for match in re.finditer(pattern, content):
        if match.start() >= len(content):
            break
    return m.group(0)

# Better approach - sequential replacement
idx = 0
def replace_func(m):
    global idx
    if idx >= len(mapping):
        idx += 1
        return m.group(0)
    replacement = f'<img src="{mapping[idx]}" alt="文章封面" style="width:100%;height:100%;object-fit:cover;">'
    idx += 1
    return replacement

new_content = re.sub(pattern, replace_func, content)

with open('/var/www/jsjunshao/insights.html', 'w') as f:
    f.write(new_content)

print(f"Fixed {idx} article images")
# Verify
with open('/var/www/jsjunshao/insights.html', 'r') as f:
    txt = f.read()
for i in range(1, 8):
    ext = 'png' if i in [4, 5, 6] else 'jpg'
    count = txt.count(f'/images/article-{i}.{ext}')
    print(f"  article-{i}.{ext}: {count} occurrence(s)")
