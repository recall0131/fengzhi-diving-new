'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { href: '/admin', label: '控制台', icon: '📊' },
  { href: '/admin/courses', label: '潜水课程', icon: '🏊' },
  { href: '/admin/destinations', label: '目的地', icon: '🌍' },
  { href: '/admin/travel', label: '潜水旅行', icon: '✈️' },
  { href: '/admin/equipment', label: '装备租售', icon: '🤿' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setChecking(false);
      return;
    }
    fetch('/api/admin/auth/me')
      .then(r => r.json())
      .then(data => {
        if (!data.authenticated) {
          router.push('/admin/login');
        } else {
          setChecking(false);
        }
      })
      .catch(() => {
        router.push('/admin/login');
      });
  }, [pathname, router]);

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a2d46] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="text-xl font-bold">奉旨潜水</div>
          <div className="text-xs text-white/50 mt-1">管理后台</div>
        </div>
        <nav className="flex-1 py-4">
          {navItems.map(item => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                  active
                    ? 'bg-white/10 text-white border-r-2 border-[#008ECC]'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full text-left text-sm text-white/50 hover:text-white py-2 transition-colors"
          >
            退出登录
          </button>
          <Link
            href="/"
            className="block text-xs text-white/30 hover:text-white/50 mt-1 transition-colors"
          >
            ← 返回网站
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
