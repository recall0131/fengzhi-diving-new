#!/usr/bin/env python3
"""
深入对比几个关键页面的实际内容
"""

import os
from bs4 import BeautifulSoup

def extract_main_content(html_file):
    """提取主要内容部分"""
    with open(html_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')
    
    # 移除导航、脚本等不需要的部分
    for nav in soup.find_all('nav', class_='navbar'):
        nav.decompose()
    for script in soup.find_all('script'):
        script.decompose()
    for style in soup.find_all('style'):
        style.decompose()
    
    # 获取所有文本内容，按段落组织
    paragraphs = []
    for p in soup.find_all('p'):
        text = p.get_text(strip=True)
        if text and len(text) > 20:  # 只保留有意义的段落
            paragraphs.append(text)
    
    # 获取所有标题
    headings = []
    for tag in ['h1', 'h2', 'h3']:
        for heading in soup.find_all(tag):
            text = heading.get_text(strip=True)
            if text:
                headings.append((tag, text))
    
    # 获取所有列表项
    list_items = []
    for li in soup.find_all('li'):
        text = li.get_text(strip=True)
        if text and len(text) > 10:
            list_items.append(text)
    
    return {
        'headings': headings,
        'paragraphs': paragraphs,
        'list_items': list_items
    }

def deep_compare_page(page_name):
    """深入对比单个页面"""
    compare_dir = '/Users/lizheng/.openclaw/workspace/fengzhi-diving-official/compare'
    zh_file = os.path.join(compare_dir, f'zh_{page_name}')
    en_file = os.path.join(compare_dir, f'en_{page_name}')
    
    print(f"\n{'='*80}")
    print(f"🔍 深入对比: {page_name}")
    print(f"{'='*80}")
    
    zh_content = extract_main_content(zh_file)
    en_content = extract_main_content(en_file)
    
    print(f"\n📌 标题对比:")
    print(f"  中文标题数: {len(zh_content['headings'])}")
    print(f"  英文标题数: {len(en_content['headings'])}")
    
    print(f"\n📄 段落对比:")
    print(f"  中文段落数: {len(zh_content['paragraphs'])}")
    print(f"  英文段落数: {len(en_content['paragraphs'])}")
    
    print(f"\n📋 列表项对比:")
    print(f"  中文列表项数: {len(zh_content['list_items'])}")
    print(f"  英文列表项数: {len(en_content['list_items'])}")
    
    # 显示前几个标题的对应关系
    print(f"\n🎯 标题对应 (前5个):")
    max_h = min(5, len(zh_content['headings']), len(en_content['headings']))
    for i in range(max_h):
        zh_tag, zh_text = zh_content['headings'][i]
        en_tag, en_text = en_content['headings'][i]
        print(f"  [{zh_tag}] {zh_text[:50]}...")
        print(f"  [{en_tag}] {en_text[:50]}...")
        print()
    
    # 检查段落数量的差异
    para_ratio = len(en_content['paragraphs']) / max(1, len(zh_content['paragraphs']))
    if 0.8 < para_ratio < 1.2:
        print(f"✅ 段落数量比例合理 ({para_ratio:.2f})")
    else:
        print(f"⚠️ 段落数量比例需要注意 ({para_ratio:.2f})")
    
    return {
        'page': page_name,
        'zh_headings': len(zh_content['headings']),
        'en_headings': len(en_content['headings']),
        'zh_paragraphs': len(zh_content['paragraphs']),
        'en_paragraphs': len(en_content['paragraphs']),
        'zh_list_items': len(zh_content['list_items']),
        'en_list_items': len(en_content['list_items'])
    }

if __name__ == '__main__':
    # 重点对比几个页面
    key_pages = [
        'index.html',
        'maldives.html',
        'diving-courses.html',
        'diving-travel.html'
    ]
    
    results = []
    for page in key_pages:
        results.append(deep_compare_page(page))
    
    print(f"\n{'='*80}")
    print("📊 深入对比总结")
    print(f"{'='*80}")
    for result in results:
        print(f"\n{result['page']}:")
        print(f"  标题: {result['zh_headings']} (中) vs {result['en_headings']} (英)")
        print(f"  段落: {result['zh_paragraphs']} (中) vs {result['en_paragraphs']} (英)")
        print(f"  列表项: {result['zh_list_items']} (中) vs {result['en_list_items']} (英)")
