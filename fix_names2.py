#!/usr/bin/env python3
import re

with open('/var/www/jsjunshao/team.html', 'r') as f:
    content = f.read()

# Original page 2 correct mapping (from HTML parsing):
# 尚运动 → shangyundong.jpg
# 冉文春子 → ranwencuizi.jpg
# 王志康 → wangzhikang.jpg
# 唐凌云 → tanglingyun.jpg
# 邓丽平 → dengliping.jpg
# 陈静 → chenjing.jpg
# 胡彬 → hubin.jpg
# 王文怡 → wangwenyi.jpg
# 王灵 → wangling.jpg
# 郭范杰 → guofanjie.png

# Fix duplicate 王文怡: revert 朱婷婷→王文怡 back to 朱婷婷
content = re.sub(r'(alt=")王文怡(")', r'\g<1>朱婷婷\g<2>', content)
content = re.sub(r'(<h3>)王文怡(</h3>)', r'\g<1>朱婷婷\g<2>', content)
print("Reverted duplicate 王文怡 -> 朱婷婷")

# Now rename correct names (from original HTML wrong names → correct names)
# 马晓东 -> 王灵 (no page 2 photo, will reuse tanglingyun from 唐凌云 temporarily)
wrong_to_correct = {
    "周正阳": "尚运动",
    "刘思琪": "王志康",
    "孙浩然": "唐凌云",
    "吴静怡": "邓丽平",
    "郑海涛": "陈静",
    "徐丽萍": "胡彬",
    "马晓东": "王灵",
    # 朱婷婷 -> stays as 朱婷婷 (reverted above)
    "王文怡": "王文怡",  # already correct
}

page2_photos = {
    "尚运动": "shangyundong.jpg",
    "王志康": "wangzhikang.jpg",
    "唐凌云": "tanglingyun.jpg",
    "邓丽平": "dengliping.jpg",
    "陈静": "chenjing.jpg",
    "胡彬": "hubin.jpg",
    "王灵": "tanglingyun.jpg",  # no own photo, reuse 唐凌云's
    "王文怡": "wangwenyi.jpg",
}

# Only update if the name is wrong
for wrong, correct in wrong_to_correct.items():
    if wrong == correct:
        continue
    if wrong not in ["马晓东"]:  # skip special cases
        continue
    
# Do name + photo updates for the ones that changed
updates = {
    "周正阳": ("尚运动", "shangyundong.jpg"),
    "刘思琪": ("王志康", "wangzhikang.jpg"),
    "孙浩然": ("唐凌云", "tanglingyun.jpg"),
    "吴静怡": ("邓丽平", "dengliping.jpg"),
    "郑海涛": ("陈静", "chenjing.jpg"),
    "徐丽萍": ("胡彬", "hubin.jpg"),
}

for wrong, (correct, photo) in updates.items():
    pattern = rf'(src="/images/lawyers/)[^"]+(" alt="){wrong}(")'
    replacement = rf'\1{photo}\2{correct}\3'
    new_content, n = re.subn(pattern, replacement, content)
    if n > 0:
        content = new_content
        print(f"  {wrong} -> {correct} ({photo})")
    else:
        print(f"  FAIL: {wrong}")

    content = re.sub(rf'(<h3>){wrong}(</h3>)', rf'\g<1>{correct}\g<2>', content)

# 马晓东 -> 王灵 (use tanglingyun since 唐凌云's photo is now shared)
pattern = r'(src="/images/lawyers/)[^"]+(" alt=")马晓东(")'
replacement = r'\1tanglingyun.jpg\2王灵\3'
content = re.sub(pattern, replacement, content)
content = re.sub(r'(<h3>)马晓东(</h3>)', r'\g<1>王灵\g<2>', content)
print(f"  马晓东 -> 王灵 (tanglingyun.jpg, shared)")

with open('/var/www/jsjunshao/team.html', 'w') as f:
    f.write(content)

# Verify
with open('/var/www/jsjunshao/team.html', 'r') as f:
    txt = f.read()

h3s = re.findall(r'<h3>(.*?)</h3>', txt)
team = [h for h in h3s if '江苏' not in h]
photos = re.findall(r'src="/images/lawyers/([^"]+)" alt="([^"]+)"', txt)
print(f"\nTotal: {len(team)}")
for src, name in photos:
    print(f"  {name} -> {src}")
