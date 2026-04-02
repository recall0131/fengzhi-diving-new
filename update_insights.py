#!/usr/bin/env python3
import re

with open('/var/www/jsjunshao/insights.html', 'r') as f:
    content = f.read()

replacements = [
    '/images/article-1.jpg',
    '/images/article-2.jpg',
    '/images/article-3.jpg',
    '/images/article-4.png',
    '/images/article-5.png',
    '/images/article-6.png',
    '/images/article-7.jpg',
]

count = 0
def replacer(m):
    global count
    if count >= len(replacements):
        return m.group(0)
    img = f'<img src="{replacements[count]}" alt="文章封面" style="width:100%;height:100%;object-fit:cover;">'
    count += 1
    return img

new_content = re.sub(r'<div class="article-img">文章封面图</div>', replacer, content)

with open('/var/www/jsjunshao/insights.html', 'w') as f:
    f.write(new_content)

print(f"Replaced {count} article images")
