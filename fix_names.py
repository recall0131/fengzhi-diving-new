#!/usr/bin/env python3
import re

with open('/var/www/jsjunshao/team.html', 'r') as f:
    content = f.read()

# Original site page 2 photos mapped to correct names
page2_correct = {
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
}

# Current wrong names -> correct names
wrong_to_correct = {
    "周正阳": "尚运动",
    "刘思琪": "王志康",
    "孙浩然": "唐凌云",
    "吴静怡": "邓丽平",
    "郑海涛": "陈静",
    "徐丽萍": "胡彬",
    "马晓东": "王灵",
    "朱婷婷": "王文怡",
}

# For each wrong name: change name AND update photo to correct
for wrong, correct in wrong_to_correct.items():
    correct_photo = page2_correct[correct]
    # Update alt and src
    # Pattern: src="SOMEFILE" alt="WRONG"
    pattern = rf'(src="/images/lawyers/)[^"]+(" alt="){wrong}(")'
    replacement = rf'\1{correct_photo}\2{correct}\3'
    new_content, n = re.subn(pattern, replacement, content)
    if n > 0:
        content = new_content
        print(f"  {wrong} -> {correct} ({correct_photo})")
    else:
        print(f"  FAIL: {wrong} -> {correct}")

    # Update h3
    content = re.sub(rf'(<h3>){wrong}(</h3>)', rf'\g<1>{correct}\g<2>', content)

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
