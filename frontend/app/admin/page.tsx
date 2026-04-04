'use client';

import { useEffect, useState } from 'react';

const cards = [
  { key: 'courses', label: '潜水课程', iconPath: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', iconColor: 'text-blue-500' },
  { key: 'destinations', label: '目的地', iconPath: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50', iconColor: 'text-emerald-500' },
  { key: 'travel', label: '潜水旅行', iconPath: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50', iconColor: 'text-orange-500' },
  { key: 'equipment', label: '装备租售', iconPath: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50', iconColor: 'text-purple-500' },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [username, setUsername] = useState('Admin');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/auth/me')
      .then(r => r.json())
      .then(data => { if (data.username) setUsername(data.username); });

    Promise.all([
      fetch('/api/admin/courses').then(r => r.json()),
      fetch('/api/admin/destinations').then(r => r.json()),
      fetch('/api/admin/travel').then(r => r.json()),
      fetch('/api/admin/equipment').then(r => r.json()),
    ]).then(([courses, destinations, travel, equipment]) => {
      setStats({
        courses: Array.isArray(courses) ? courses.length : 0,
        destinations: Array.isArray(destinations) ? destinations.length : 0,
        travel: Array.isArray(travel) ? travel.length : 0,
        equipment: Array.isArray(equipment) ? equipment.length : 0,
      });
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-600/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">管理后台</p>
            <h1 className="text-2xl font-bold mt-1">欢迎回来，{username}</h1>
            <p className="text-blue-200 text-sm mt-1">以下是您的数据概览</p>
          </div>
          <div className="hidden md:block">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => (
          <div key={card.key} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center`}>
                <svg className={`w-5 h-5 ${card.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.iconPath} />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-800">{loading ? '-' : stats[card.key] || 0}</div>
            <p className="text-sm text-slate-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-base font-bold text-slate-800 mb-4">快速操作</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: '/admin/courses', label: '+ 新增课程', color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
            { href: '/admin/destinations', label: '+ 新增目的地', color: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' },
            { href: '/admin/travel', label: '+ 新增旅行套餐', color: 'bg-orange-50 text-orange-600 hover:bg-orange-100' },
            { href: '/admin/equipment', label: '+ 新增装备', color: 'bg-purple-50 text-purple-600 hover:bg-purple-100' },
          ].map(action => (
            <a key={action.href} href={action.href}
              className={`flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${action.color}`}>
              {action.label}
            </a>
          ))}
        </div>
      </div>

      {/* System info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-base font-bold text-slate-800 mb-4">系统状态</h2>
          <div className="space-y-3">
            {[
              { label: '数据库', status: '运行中', ok: true },
              { label: 'API 服务', status: '运行中', ok: true },
              { label: '前台网站', status: '运行中', ok: true },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{item.label}</span>
                <span className="flex items-center gap-1.5 text-sm font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-600">{item.status}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-base font-bold text-slate-800 mb-4">快捷链接</h2>
          <div className="space-y-2">
            <a href="/" target="_blank" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 py-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              查看前台网站
            </a>
            <a href="/admin/courses" className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 py-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              管理潜水课程
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
