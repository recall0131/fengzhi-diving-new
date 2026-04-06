'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const PADI = {
  blue: '#0098B3',
  blueDark: '#007591',
  blueLight: '#E8F4F7',
  yellow: '#FFB600',
  orange: '#FF6B00',
  dark: '#0F1923',
  darkMid: '#1A2B3C',
  gray: '#64748B',
  grayLight: '#94A3B8',
  border: '#E2E8F0',
  bg: '#F1F5F9',
};

const navItems = [
  { href: '/admin', label: '控制台', sub: 'Dashboard', iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { href: '/admin/courses', label: '潜水课程', sub: 'Courses', iconPath: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' },
  { href: '/admin/destinations', label: '目的地', sub: 'Destinations', iconPath: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { href: '/admin/travel', label: '潜水旅行', sub: 'Travel', iconPath: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { href: '/admin/equipment', label: '装备租售', sub: 'Equipment', iconPath: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load Inter font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    document.body.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
    return () => { document.head.removeChild(link); };
  }, []);

  useEffect(() => {
    if (pathname === '/admin/login') { setChecking(false); return; }
    fetch('/api/admin/auth/me')
      .then(r => r.json())
      .then(data => { if (!data.authenticated) router.push('/admin/login'); else setChecking(false); })
      .catch(() => router.push('/admin/login'));
  }, [pathname, router]);

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-t-transparent mx-auto mb-4" style={{borderColor: `${PADI.blue} transparent transparent transparent`, animation: 'spin 0.8s linear infinite'}} />
          <p style={{color: PADI.gray, fontSize: '14px', fontFamily: "'Inter', sans-serif"}}>加载中...</p>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      </div>
    );
  }

  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 shadow-2xl flex flex-col transform transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{background: PADI.dark}}>
        {/* Brand */}
        <div className="px-5 py-5 border-b" style={{borderColor: 'rgba(255,255,255,0.06)'}}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg" style={{background: PADI.yellow, color: PADI.dark}}>
              P
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-tight tracking-tight">Imperial</div>
              <div className="text-white/30 text-xs tracking-widest uppercase">Diving Center</div>
            </div>
          </div>
        </div>

        {/* Nav section label */}
        <div className="px-5 pt-5 pb-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/20">Navigation</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 pb-4">
          {navItems.map(item => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium mb-0.5 transition-all duration-150 ${
                  active ? 'text-white shadow-lg' : 'text-white/45 hover:text-white/80 hover:bg-white/5'
                }`}
                style={active ? {background: PADI.blue} : {}}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.5} d={item.iconPath} />
                </svg>
                <span className="flex-1">{item.label}</span>
                {active && <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom links */}
        <div className="p-4 border-t" style={{borderColor: 'rgba(255,255,255,0.06)'}}>
          <Link href="/" target="_blank" className="flex items-center gap-2.5 text-sm text-white/25 hover:text-white/50 py-1.5 transition-colors mb-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            访问前台网站
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2.5 text-sm text-white/25 hover:text-red-400 py-1.5 w-full transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            退出登录
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-14 bg-white flex items-center px-6 shadow-sm flex-shrink-0 sticky top-0 z-20 border-b" style={{borderColor: PADI.border}}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-1.5 -ml-1.5 rounded-lg hover:bg-gray-100 transition-colors mr-3">
            <svg className="w-5 h-5" style={{color: PADI.gray}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1">
            <h2 className="text-sm font-semibold" style={{color: '#1E293B'}}>
              {navItems.find(n => n.href === pathname)?.label || '管理后台'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium" style={{background: PADI.blueLight, color: PADI.blue}}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background: PADI.blue}} />
              运行正常
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
