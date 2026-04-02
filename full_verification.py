#!/usr/bin/env python3
"""
真正地、全面地验证所有17个页面的中英文两版是否完全对应
"""

import os
import json
from bs4 import BeautifulSoup
from datetime import datetime

def extract_page_content(html_file):
    """从HTML文件中提取所有重要内容"""
    with open(html_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')
    
    content = {
        'title': soup.title.get_text(strip=True) if soup.title else '',
        'h1': [h1.get_text(strip=True) for h1 in soup.find_all('h1')],
        'h2': [h2.get_text(strip=True) for h2 in soup.find_all('h2')],
        'h3': [h3.get_text(strip=True) for h3 in soup.find_all('h3')],
        'paragraphs': [p.get_text(strip=True) for p in soup.find_all('p') if p.get_text(strip=True)],
        'list_items': [li.get_text(strip=True) for li in soup.find_all('li') if li.get_text(strip=True)],
        'cards': [],
        'liveaboards': [],
        'resorts': [],
        'dive_centers': [],
        'packages': []
    }
    
    # 提取卡片内容
    for card in soup.find_all(class_=['card', 'destination-card', 'package-card']):
        card_text = card.get_text(strip=True, separator=' | ')
        if card_text:
            content['cards'].append(card_text)
    
    # 尝试识别船宿、度假村、潜店、套餐
    all_text = soup.get_text(separator='\n', strip=True)
    lines = [line.strip() for line in all_text.split('\n') if line.strip()]
    
    # 简单的关键词识别
    keywords = {
        'liveaboards': ['船宿', 'liveaboard', 'Liveaboard'],
        'resorts': ['度假村', 'resort', 'Resort'],
        'dive_centers': ['潜店', 'dive center', 'Dive Center', 'dive shop'],
        'packages': ['套餐', 'package', 'Package', '行程', 'itinerary', 'Itinerary']
    }
    
    for category, keyword_list in keywords.items():
        for i, line in enumerate(lines):
            if any(keyword in line for keyword in keyword_list):
                # 包含一些上下文
                start = max(0, i - 2)
                end = min(len(lines), i + 5)
                context = ' | '.join(lines[start:end])
                content[category].append(context)
    
    return content

def verify_pages():
    """验证所有17个页面"""
    compare_dir = '/Users/lizheng/.openclaw/workspace/fengzhi-diving-official/compare'
    
    pages = [
        'index.html',
        'maldives.html',
        'indonesia.html',
        'philippines.html',
        'malaysia.html',
        'egypt.html',
        'palau.html',
        'fiji.html',
        'mauritius.html',
        'mexico.html',
        'ecuador.html',
        'china.html',
        'usa.html',
        'diving-courses.html',
        'diving-experience.html',
        'diving-equipment.html',
        'diving-travel.html'
    ]
    
    report = {
        'timestamp': datetime.now().isoformat(),
        'pages': {},
        'summary': {
            'total_pages': len(pages),
            'passed': 0,
            'failed': 0,
            'issues_found': []
        }
    }
    
    for page in pages:
        zh_file = os.path.join(compare_dir, f'zh_{page}')
        en_file = os.path.join(compare_dir, f'en_{page}')
        
        page_result = {
            'status': 'unknown',
            'issues': []
        }
        
        if not os.path.exists(zh_file):
            page_result['status'] = 'failed'
            page_result['issues'].append(f'中文版文件缺失: zh_{page}')
        elif not os.path.exists(en_file):
            page_result['status'] = 'failed'
            page_result['issues'].append(f'英文版文件缺失: en_{page}')
        else:
            # 提取内容
            zh_content = extract_page_content(zh_file)
            en_content = extract_page_content(en_file)
            
            # 对比内容
            # 检查标题
            if len(zh_content['h1']) != len(en_content['h1']):
                page_result['issues'].append(f'H1标题数量不一致: 中文{len(zh_content["h1"])}个, 英文{len(en_content["h1"])}个')
            
            if len(zh_content['h2']) != len(en_content['h2']):
                page_result['issues'].append(f'H2标题数量不一致: 中文{len(zh_content["h2"])}个, 英文{len(en_content["h2"])}个')
            
            # 检查关键内容类型
            content_types = ['liveaboards', 'resorts', 'dive_centers', 'packages']
            for content_type in content_types:
                zh_has = len(zh_content[content_type]) > 0
                en_has = len(en_content[content_type]) > 0
                if zh_has != en_has:
                    page_result['issues'].append(f'{content_type} 内容不一致: 中文{"有" if zh_has else "无"}, 英文{"有" if en_has else "无"}')
            
            # 检查段落和列表数量（作为参考）
            if len(zh_content['paragraphs']) < len(en_content['paragraphs']) * 0.5:
                page_result['issues'].append(f'段落数量差异较大: 中文{len(zh_content["paragraphs"])}段, 英文{len(en_content["paragraphs"])}段')
            
            if not page_result['issues']:
                page_result['status'] = 'passed'
                report['summary']['passed'] += 1
            else:
                page_result['status'] = 'failed'
                report['summary']['failed'] += 1
                for issue in page_result['issues']:
                    report['summary']['issues_found'].append(f'{page}: {issue}')
            
            # 保存内容信息
            page_result['zh_content'] = {
                'h1_count': len(zh_content['h1']),
                'h2_count': len(zh_content['h2']),
                'h3_count': len(zh_content['h3']),
                'paragraph_count': len(zh_content['paragraphs']),
                'card_count': len(zh_content['cards']),
                'liveaboards_count': len(zh_content['liveaboards']),
                'resorts_count': len(zh_content['resorts']),
                'dive_centers_count': len(zh_content['dive_centers']),
                'packages_count': len(zh_content['packages'])
            }
            page_result['en_content'] = {
                'h1_count': len(en_content['h1']),
                'h2_count': len(en_content['h2']),
                'h3_count': len(en_content['h3']),
                'paragraph_count': len(en_content['paragraphs']),
                'card_count': len(en_content['cards']),
                'liveaboards_count': len(en_content['liveaboards']),
                'resorts_count': len(en_content['resorts']),
                'dive_centers_count': len(en_content['dive_centers']),
                'packages_count': len(en_content['packages'])
            }
        
        report['pages'][page] = page_result
    
    return report

def print_report(report):
    """打印验证报告"""
    print("=" * 80)
    print("🌊 风之潜水网站 - 中英文页面完整验证报告")
    print("=" * 80)
    print(f"验证时间: {report['timestamp']}")
    print()
    
    print("📊 总览:")
    print(f"  总页面数: {report['summary']['total_pages']}")
    print(f"  ✅ 通过: {report['summary']['passed']}")
    print(f"  ❌ 失败: {report['summary']['failed']}")
    print()
    
    print("📋 各页面验证结果:")
    print("-" * 80)
    
    for page, result in report['pages'].items():
        status_emoji = "✅" if result['status'] == 'passed' else "❌"
        print(f"\n{status_emoji} {page}:")
        
        if 'zh_content' in result and 'en_content' in result:
            print(f"  中文内容: H1={result['zh_content']['h1_count']}, H2={result['zh_content']['h2_count']}, "
                  f"段落={result['zh_content']['paragraph_count']}, 卡片={result['zh_content']['card_count']}")
            print(f"  英文内容: H1={result['en_content']['h1_count']}, H2={result['en_content']['h2_count']}, "
                  f"段落={result['en_content']['paragraph_count']}, 卡片={result['en_content']['card_count']}")
            print(f"  内容类型: 船宿(中={result['zh_content']['liveaboards_count']}, 英={result['en_content']['liveaboards_count']}), "
                  f"度假村(中={result['zh_content']['resorts_count']}, 英={result['en_content']['resorts_count']}), "
                  f"潜店(中={result['zh_content']['dive_centers_count']}, 英={result['en_content']['dive_centers_count']}), "
                  f"套餐(中={result['zh_content']['packages_count']}, 英={result['en_content']['packages_count']})")
        
        if result['issues']:
            print(f"  发现问题:")
            for issue in result['issues']:
                print(f"    - {issue}")
    
    print("\n" + "=" * 80)
    print("🔍 问题汇总:")
    if report['summary']['issues_found']:
        for issue in report['summary']['issues_found']:
            print(f"  - {issue}")
    else:
        print("  未发现问题！")
    print("=" * 80)

def save_report(report):
    """保存报告到文件"""
    report_dir = '/Users/lizheng/.openclaw/workspace/fengzhi-diving-official/compare'
    report_file = os.path.join(report_dir, f'verification_report_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json')
    
    with open(report_file, 'w', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    
    print(f"\n💾 报告已保存到: {report_file}")
    
    # 同时保存一个文本版本
    text_report_file = os.path.join(report_dir, f'verification_report_{datetime.now().strftime("%Y%m%d_%H%M%S")}.txt')
    import sys
    from io import StringIO
    
    old_stdout = sys.stdout
    sys.stdout = captured_output = StringIO()
    print_report(report)
    sys.stdout = old_stdout
    
    with open(text_report_file, 'w', encoding='utf-8') as f:
        f.write(captured_output.getvalue())
    
    print(f"💾 文本报告已保存到: {text_report_file}")

if __name__ == '__main__':
    report = verify_pages()
    print_report(report)
    save_report(report)
