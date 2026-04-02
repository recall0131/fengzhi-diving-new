#!/usr/bin/env python3
import re

with open('/var/www/jsjunshao/team.html', 'r') as f:
    content = f.read()

# Correct mapping from original site photos
# tanglingyun confirmed = 唐凌云 (large Canon photo)
photo_map = {
    # 创始合伙人 (4)
    "李正武": "lizhengwu.jpg",
    "蔡安明": "caianming.jpg",
    "冯伟": "fengwei.jpg",
    "高磊": "gaolei.jpg",
    # 合伙人 (6)
    "李伟根": "liweigen.jpg",
    "王晓红": "wangxiaohong.jpg",
    "成文芳": "chengwenfang.jpg",
    "蒋旭": "jiangxu.jpg",
    "卜卜布": "bobobubu.jpg",
    "周晓玉": "zhouxiaoyu.jpg",
    # 执业律师 - page 2 originals
    "尚运动": "shangyundong.jpg",
    "冉文春子": "ranwencuizi.jpg",
    "王志康": "wangzhikang.jpg",
    "唐凌云": "tanglingyun.jpg",
    "邓丽平": "dengliping.jpg",
    "陈静": "chenjing.jpg",
    "胡彬": "hubin.jpg",
    "王文怡": "wangwenyi.jpg",
    "王灵": "wangling.jpg",
    "郭范杰": "guofanjie.png",
    # 执业律师 - no page 2 photo, reuse partners
    "周正阳": "jiangxu.jpg",
    "刘思琪": "wangxiaohong.jpg",
    "孙浩然": "liweigen.jpg",
    "吴静怡": "chengwenfang.jpg",
    "郑海涛": "bobobubu.jpg",
    "徐丽萍": "zhouxiaoyu.jpg",
    "马晓东": "jiangxu.jpg",
    "朱婷婷": "wangling.jpg",
}

count = 0
missing = []
for name, new_photo in photo_map.items():
    pattern = rf'(src="/images/lawyers/)[^"]+(" alt="{re.escape(name)}")'
    new_content, n = re.subn(pattern, rf'\1{new_photo}\2', content)
    if n > 0:
        content = new_content
        count += 1
        print(f"  {name} -> {new_photo}")
    else:
        missing.append(f"  MISSING: {name} -> {new_photo}")

with open('/var/www/jsjunshao/team.html', 'w') as f:
    f.write(content)

print(f"\nUpdated: {count}")
for m in missing:
    print(m)

# Verify
with open('/var/www/jsjunshao/team.html', 'r') as f:
    txt = f.read()
matches = re.findall(r'src="/images/lawyers/([^"]+)" alt="([^"]+)"', txt)
print(f"\nFinal ({len(matches)}):")
for src, name in matches:
    print(f"  {name} -> {src}")
