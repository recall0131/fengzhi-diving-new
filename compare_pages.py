
import os
from bs4 import BeautifulSoup

def extract_sections(html_file):
    with open(html_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')
    sections = []
    for h2 in soup.find_all('h2'):
        section_title = h2.get_text(strip=True)
        sections.append(section_title)
    return sections

compare_dir = os.path.expanduser('~/.openclaw/workspace/fengzhi-diving-official/compare')
zh_files = [f for f in os.listdir(compare_dir) if f.startswith('zh_') and f.endswith('.html')]

for zh_file in zh_files:
    en_file = zh_file.replace('zh_', 'en_')
    zh_path = os.path.join(compare_dir, zh_file)
    en_path = os.path.join(compare_dir, en_file)
    
    if os.path.exists(en_path):
        zh_sections = extract_sections(zh_path)
        en_sections = extract_sections(en_path)
        
        missing = [s for s in zh_sections if s not in en_sections]
        if missing:
            print(f"Missing in {en_file}: {missing}")
        else:
            print(f"{en_file}: All sections present")
    else:
        print(f"Missing file: {en_file}")
