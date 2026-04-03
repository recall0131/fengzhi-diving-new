import Link from 'next/link';

const footerLinks = {
  zh: [
    { label: '潜水体验', href: '/zh/diving-experience' },
    { label: '潜水课程', href: '/zh/diving-courses' },
    { label: '潜水旅行', href: '/zh/diving-travel' },
    { label: '潜水目的地', href: '/zh/destinations' },
    { label: '关于我们', href: '/zh/about' },
  ],
  en: [
    { label: 'Dive Experience', href: '/en/diving-experience' },
    { label: 'Dive Courses', href: '/en/diving-courses' },
    { label: 'Dive Travel', href: '/en/diving-travel' },
    { label: 'Destinations', href: '/en/destinations' },
    { label: 'About', href: '/en/about' },
  ],
};

export default function Footer({ lang }: { lang: string }) {
  const isZh = lang === 'zh';
  const links = isZh ? footerLinks.zh : footerLinks.en;

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <svg className="w-8 h-8 text-[#008ECC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <ellipse cx="12" cy="7" rx="5" ry="3.5"/>
                <path d="M7 7L5 4M17 7l2-3"/>
                <path d="M12 10.5v6"/>
                <path d="M8 22c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5"/>
              </svg>
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-white">
                  {isZh ? '奉旨潜水' : 'Imperial Diving'}
                </h3>
                <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">
                  {isZh ? 'Imperial Diving' : 'PADI Certified Center'}
                </span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              {isZh
                ? '专业潜水服务提供商，为您提供安全、专业、精彩的潜水体验。从入门到进阶，我们陪伴您的每一次深蓝探索。'
                : 'Professional diving services for safe, expert, and unforgettable underwater experiences. From beginner to advanced, we accompany every step of your deep blue journey.'}
            </p>
            <div className="flex space-x-4">
              <a href="https://mp.weixin.qq.com/s/IMPERIAL2026" className="w-10 h-10 bg-gray-800 hover:bg-[#006994] rounded-lg flex items-center justify-center transition-all duration-300" aria-label="WeChat">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M8.5 12.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5.5 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM12 2C6.477 2 2 6.145 2 11.243c0 2.936 1.526 5.55 3.926 7.227l-.926 3.073a.5.5 0 0 0 .648.552l3.092-1.79A11.2 11.2 0 0 0 12 18.973c5.523 0 10-4.145 10-9.73S17.523 2 12 2z"/></svg>
              </a>
              <a href="https://weibo.com/imperialdiving" className="w-10 h-10 bg-gray-800 hover:bg-[#006994] rounded-lg flex items-center justify-center transition-all duration-300" aria-label="Weibo">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.194 14.197c0 4.306-5.144 7.803-11.486 7.803-6.342 0-11.486-3.497-11.486-7.803 0-4.306 5.144-7.803 11.486-7.803 6.342 0 11.486 3.497 11.486 7.803z"/></svg>
              </a>
              <a href="https://www.douyin.com/user/IMPERIAL2026" className="w-10 h-10 bg-gray-800 hover:bg-[#006994] rounded-lg flex items-center justify-center transition-all duration-300" aria-label="Douyin">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20l1.54-5.92a4.25 4.25 0 0 1 4.08-3.14c2.83 0 5.12 2.66 5.12 5.95v.7h3.45V9.77a4.83 4.83 0 0 1-1.6-3.08z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">
              {isZh ? '快速链接' : 'Quick Links'}
            </h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#008ECC] transition-colors duration-300 flex items-center gap-2 group">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">
              {isZh ? '联系方式' : 'Contact'}
            </h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center space-x-3">
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.17h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>+86 400-888-8288</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>info@imperialdiving.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>
                  {isZh
                    ? '海南省三亚市海棠区潜水度假区88号'
                    : '88 Diving Resort Area, Haitang Bay, Sanya, Hainan, China'}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>{isZh ? '周一至周日 08:00 - 20:00' : 'Mon — Sun, 08:00 — 20:00'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-center md:text-left text-sm">
              © 2024 {isZh ? '奉旨潜水' : 'Imperial Diving'} — {isZh ? '官方网站' : 'Official Website'} | All Rights Reserved
            </p>
            <div className="flex items-center space-x-2 text-gray-500 text-sm">
              <span>{isZh ? 'PADI 国际认证潜水中心' : 'PADI Certified Diving Center'}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
