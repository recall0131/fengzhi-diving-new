import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://imperialdiving.lizheng.info'),
  robots: { index: true, follow: true },
};

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  return (
    <html lang={params?.lang || 'zh'}>
      <body>{children}</body>
    </html>
  );
}
