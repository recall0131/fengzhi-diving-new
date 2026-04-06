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

// Login page has NO layout wrapper - rendered directly
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load Inter font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    document.body.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

  // Auth check - only run on non-login pages
  useEffect(() => {
    // Skip auth check for login page entirely
    if (pathname === '/admin/login') {
      setChecking(false);
      return;
    }

    // Check auth status
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/auth/me');
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          setChecking(false);
        } else {
          router.push('/admin/login');
        }
      } catch {
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [pathname, router]);

  async function handleLogout() {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
    } catch {}
    router.push('/admin/login');
  }

  // Login page - no layout wrapper
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Loading state
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: PADI.bg}}>
        <div className="text-center">
          <div 
            className="w-12 h-12 rounded-full border-4 border-t-transparent mx-auto mb-4 animate-spin" 
            style={{borderColor: `${PADI.blue} transparent transparent transparent`}} 
          />
          <p style={{color: PADI.gray, fontSize: '14px', fontFamily: 'Inter, sans-serif'}}>加载中...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - will redirect
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex" style={{background: PADI.bg}}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 shadow-2xl flex flex-col transform transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{background: PADI.dark}}>
        {/* Brand */}
        <div className="px-5 py-5 border-b" style={{borderColor: 'rgba(255,255,255,0.06)'}}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl" style={{background: PADI.yellow, color: PADI.dark}}>P</div>
            <div>
              <div className="text-white font-bold text-lg leading-tight">Imperial Diving</div>
              <div className="text-white/40 text-xs tracking-widest uppercase">管理后台</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map(item => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 mx-3 px-3 py-2.5 rounded-lg mb-1 transition-all ${isActive ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
                style={isActive ? {background: `${PADI.blue}20`} : {}}
                onClick={() => setSidebarOpen(false)}>
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                </svg>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t" style={{borderColor: 'rgba(255,255,255,0.06)'}}>
          <button onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/5 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-sm font-medium">退出登录</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="h-14 bg-white border-b flex items-center justify-between px-4 lg:px-6" style={{borderColor: PADI.border}}>
          <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="text-sm font-medium" style={{color: PADI.gray}}>
            {navItems.find(n => pathname === n.href || (n.href !== '/admin' && pathname.startsWith(n.href)))?.label || '管理后台'}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{background: PADI.blue}}>A</div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
