import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://dejavu.lizheng.info:4443'),
  title: {
    default: '奉旨潜水 - 专业潜水服务官方网站',
    template: '%s | 奉旨潜水',
  },
  description: '奉旨潜水 - 专业潜水服务提供商，提供OWD开放水域、AOWD进阶潜水、Rescue救援潜水等课程，帕劳、马尔代夫、大堡礁等热门目的地潜水旅游服务。',
  keywords: ['潜水', '潜水课程', 'OWD', 'AOWD', '潜水旅游', '帕劳潜水', '马尔代夫潜水', '大堡礁潜水', '浮潜', '水肺潜水'],
  authors: [{ name: '奉旨潜水' }],
  creator: '奉旨潜水',
  publisher: '奉旨潜水',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    url: 'https://dejavu.lizheng.info:4443',
    siteName: '奉旨潜水',
    title: '奉旨潜水 - 专业潜水服务官方网站',
    description: '专业潜水服务提供商，提供潜水课程、潜水旅游、潜水体验服务。',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '奉旨潜水',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '奉旨潜水 - 专业潜水服务官方网站',
    description: '专业潜水服务提供商，提供潜水课程、潜水旅游、潜水体验服务。',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
};

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
