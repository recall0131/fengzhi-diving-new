#!/usr/bin/env python3
import re

with open('/var/www/jsjunshao/team.html', 'r') as f:
    content = f.read()

# The 10 page 2 original lawyers with their real photos
# DB has 11 associates: 10 match page 2 + 1 extra (李郑, no photo)
# For 10 lawyers with 10 photos: one must share
# Solution: 王文怡 reuses wangwenyi.jpg (she IS the photo owner, just no extra photo)
associates = [
    ("尚运动",   "shangyundong.jpg", "西南政法大学毕业、公司法、合同法、劳动争议 | 中国法学会会员"),
    ("王志康",   "wangzhikang.jpg",  "公司法、合同法、劳动争议 | 执业年限不详"),
    ("唐凌云",   "tanglingyun.jpg",   "公司法、合同法、劳动争议、企业法律顾问"),
    ("邓丽平",   "dengliping.jpg",   "执业律师 | 执业年限不详"),
    ("陈静",     "chenjing.jpg",     "法学学士 | 熟悉合同法、侵权法、婚姻法及相关法律法规"),
    ("胡彬",     "hubin.jpg",        "执业律师 | 执业年限不详"),
    ("王灵",     "wangling.jpg",     "北京交通大学毕业、律所专职律师"),
    ("王文怡",   "wangwenyi.jpg",    "企业运作与风险规避、婚姻家事、刑事辩护 | 执业年限不详"),
    ("郭范杰",   "guofanjie.png",    "公司法、合同法、劳动争议"),
    ("冉文春子", "ranwencuizi.jpg",  "东南大学法律硕士、心理咨询师、南京法律援助中心驻点律师 | 企业运作与风险规避、婚姻家事、刑事辩护"),
]

def make_card(name, photo, specialty):
    return f'''        <div class="team-card">
          <img class="team-photo" src="/images/lawyers/{photo}" alt="{name}">
          <div class="team-info">
            <h3>{name}</h3>
            <div class="title">执业律师</div>
            <p>{specialty}</p>
          </div>
        </div>'''

cards = '\n'.join(make_card(n, p, s) for n, p, s in associates)

# Replace from <div class="grid-4"> after 执业律师 section title to </div></div></section>
# Find the broken grid-4 section
start = content.find('<div class="grid-4">\n        <div class="team-card">')
end = content.find('</div>\n        </div>\n      </div>\n    </div>\n  </section>')

if start == -1 or end == -1:
    print(f"start={start}, end={end}")
else:
    new_content = content[:start] + f'<div class="grid-4">\n{cards}\n      </div>\n    </div>\n  </section>\n\n  <!-- Join CTA' + content[end+len('</div>\n        </div>\n      </div>\n    </div>\n  </section>'):]
    with open('/var/www/jsjunshao/team.html', 'w') as f:
        f.write(new_content)
    print("SUCCESS")

# Verify
with open('/var/www/jsjunshao/team.html', 'r') as f:
    txt = f.read()
h3s = re.findall(r'<h3>(.*?)</h3>', txt)
team = [h for h in h3s if '江苏' not in h]
photos = re.findall(r'src="/images/lawyers/([^"]+)" alt="([^"]+)"', txt)
print(f"\nTotal lawyers: {len(team)}")
for src, name in photos:
    print(f"  {name} -> {src}")
