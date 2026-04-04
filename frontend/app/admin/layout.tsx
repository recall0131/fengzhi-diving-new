'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { href: '/admin', label: '控制台', iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { href: '/admin/courses', label: '潜水课程', iconPath: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' },
  { href: '/admin/destinations', label: '目的地', iconPath: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { href: '/admin/travel', label: '潜水旅行', iconPath: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { href: '/admin/equipment', label: '装备租售', iconPath: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
];

// PADI colors: primary blue, PADI yellow, accent orange
const PADI = {
  blue: '#0098B3',      // PADI teal blue
  blueDark: '#007591',
  blueLight: '#E6F4F7',
  yellow: '#FFB600',    // PADI yellow
  orange: '#FF6B00',    // PADI orange
  dark: '#1A1A2E',
  gray: '#6B7280',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setChecking(false);
      return;
    }
    fetch('/api/admin/auth/me')
      .then(r => r.json())
      .then(data => {
        if (!data.authenticated) router.push('/admin/login');
        else setChecking(false);
      })
      .catch(() => router.push('/admin/login'));
  }, [pathname, router]);

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: '#F3F4F6'}}>
        <div className="text-center">
          <div className="inline-block w-12 h-12 rounded-full border-4 border-t-transparent mb-4" style={{borderColor: `${PADI.blue} transparent transparent transparent`, animation: 'spin 0.8s linear infinite'}} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p className="text-sm" style={{color: PADI.gray}}>加载中...</p>
        </div>
      </div>
    );
  }

  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <div className="min-h-screen flex" style={{background: '#F3F4F6'}}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 shadow-xl transform transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{background: PADI.dark}}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b" style={{borderColor: 'rgba(255,255,255,0.08)'}}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm" style={{background: PADI.yellow, color: PADI.dark}}>
              P
            </div>
            <div>
              <h1 className="text-white font-bold text-base leading-tight">Imperial</h1>
              <p className="text-white/40 text-xs">Diving Center</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="p-3 space-y-0.5">
          {navItems.map(item => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'text-white shadow-lg'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
                style={active ? {background: PADI.blue} : {}}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.5} d={item.iconPath} />
                </svg>
                <span>{item.label}</span>
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t" style={{borderColor: 'rgba(255,255,255,0.08)'}}>
          <div className="space-y-2">
            <Link href="/" target="_blank" className="flex items-center gap-2 text-sm text-white/40 hover:text-white py-1.5 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              查看网站
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-white/40 hover:text-red-400 py-1.5 w-full transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              退出登录
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 lg:pl-64">
        {/* Top bar */}
        <header className="h-16 bg-white shadow-sm flex items-center px-6 gap-4 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1">
            <h2 className="text-base font-semibold text-gray-800">
              {navItems.find(n => n.href === pathname)?.label || '管理后台'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full" style={{background: PADI.blueLight, color: PADI.blue}}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background: PADI.blue}} />
              系统正常
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
