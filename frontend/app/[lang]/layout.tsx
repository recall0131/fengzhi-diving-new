import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

const meta = {
  zh: {
    title: '奉旨潜水 - 专业潜水服务官方网站',
    description: '奉旨潜水 - 专业潜水服务提供商，提供OWD开放水域、AOWD进阶潜水、Rescue救援潜水等课程，帕劳、马尔代夫、大堡礁等热门目的地潜水旅游服务。',
    keywords: ['潜水', '潜水课程', 'OWD', 'AOWD', '潜水旅游', '帕劳潜水', '马尔代夫潜水', '大堡礁潜水', '浮潜', '水肺潜水'],
    siteName: '奉旨潜水',
  },
  en: {
    title: 'Imperial Diving - Professional Scuba Diving Services',
    description: 'Professional diving services: PADI Open Water, Advanced, Rescue courses. Dive trips to Palau, Maldives, Great Barrier Reef and more.',
    keywords: ['diving', 'scuba', 'PADI', 'dive courses', 'dive travel', 'Palau', 'Maldives', 'diving certification'],
    siteName: 'Imperial Diving',
  },
};

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = params.lang || 'zh';
  const m = meta[lang as keyof typeof meta] || meta.zh;
  return {
    metadataBase: new URL('https://imperialdiving.lizheng.info'),
    title: `${m.title} | ${m.siteName}`,
    description: m.description,
    keywords: m.keywords,
    authors: [{ name: m.siteName }],
    creator: m.siteName,
    publisher: m.siteName,
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'zh_CN',
      alternateLocale: lang === 'en' ? 'zh_CN' : 'en_US',
      url: `https://imperialdiving.lizheng.info/${lang}`,
      siteName: m.siteName, title: m.title, description: m.description,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: m.siteName }],
    },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description, images: ['/og-image.jpg'] },
  };
}

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  const lang = params.lang || 'zh';
  return (
    <>
      <Navbar lang={lang} />
      <main>{children}</main>
      <Footer lang={lang} />
    </>
  );
}
