'use client';

import { useEffect, useState } from 'react';

const PADI = { blue: '#0098B3', blueDark: '#007591', blueLight: '#E6F4F7', yellow: '#FFB600', orange: '#FF6B00', dark: '#1A1A2E', gray: '#6B7280' };

const statCards = [
  { key: 'courses', label: '潜水课程', iconPath: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z', bg: '#E6F4F7', color: PADI.blue },
  { key: 'destinations', label: '目的地', iconPath: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', bg: '#FFF8E6', color: PADI.orange },
  { key: 'travel', label: '潜水旅行', iconPath: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', bg: '#E8FFF9', color: '#0D9488' },
  { key: 'equipment', label: '装备租售', iconPath: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', bg: '#F3E8FF', color: '#9333EA' },
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
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-2xl p-6 flex items-center justify-between" style={{background: `linear-gradient(135deg, ${PADI.dark} 0%, ${PADI.blueDark} 100%)`}}>
        <div>
          <p className="text-white/50 text-sm font-medium">管理后台</p>
          <h1 className="text-2xl font-black text-white mt-1">
            你好，<span style={{color: PADI.yellow}}>{username}</span> 👋
          </h1>
          <p className="text-white/50 text-sm mt-1">以下是您的数据概览</p>
        </div>
        <div className="hidden md:block">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{background: 'rgba(255,255,255,0.1)'}}>
            🤿
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(card => (
          <div key={card.key} className="bg-white rounded-2xl p-5 border hover:shadow-md transition-shadow" style={{borderColor: '#F0F0F0'}}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{background: card.bg}}>
              <svg className="w-5 h-5" fill="none" stroke={card.color} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.iconPath} />
              </svg>
            </div>
            <div className="text-3xl font-black" style={{color: PADI.dark}}>{loading ? '-' : (stats[card.key] || 0)}</div>
            <p className="text-sm font-medium mt-0.5" style={{color: PADI.gray}}>{card.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions + System Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 border" style={{borderColor: '#F0F0F0'}}>
          <h2 className="text-base font-bold mb-4" style={{color: PADI.dark}}>快速操作</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: '/admin/courses', label: '+ 新增课程', bg: '#E6F4F7', color: PADI.blue },
              { href: '/admin/destinations', label: '+ 新增目的地', bg: '#FFF8E6', color: PADI.orange },
              { href: '/admin/travel', label: '+ 新增旅行套餐', bg: '#E8FFF9', color: '#0D9488' },
              { href: '/admin/equipment', label: '+ 新增装备', bg: '#F3E8FF', color: '#9333EA' },
            ].map(action => (
              <a key={action.href} href={action.href}
                className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold border transition-all hover:shadow-sm"
                style={{background: action.bg, color: action.color, borderColor: action.bg}}
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border" style={{borderColor: '#F0F0F0'}}>
          <h2 className="text-base font-bold mb-4" style={{color: PADI.dark}}>系统状态</h2>
          <div className="space-y-3">
            {[
              { label: '数据库连接', status: '运行中', ok: true },
              { label: 'API 服务', status: '运行中', ok: true },
              { label: '前台网站', status: '运行中', ok: true },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm" style={{color: PADI.gray}}>{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{background: item.ok ? '#22C55E' : '#EF4444'}} />
                  <span className="text-sm font-medium" style={{color: item.ok ? '#22C55E' : '#EF4444'}}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
