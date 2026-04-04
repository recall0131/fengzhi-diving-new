'use client';

import { useEffect, useState } from 'react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ courses: 0, destinations: 0, travel: 0, equipment: 0, enrollments: 0 });
  const [username, setUsername] = useState('Admin');

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
        enrollments: 0,
      });
    }).catch(() => {});
  }, []);

  const cards = [
    { label: '潜水课程', value: stats.courses, icon: '🏊', href: '/admin/courses', bg: 'bg-blue-50', color: 'text-blue-600' },
    { label: '目的地', value: stats.destinations, icon: '🌍', href: '/admin/destinations', bg: 'bg-green-50', color: 'text-green-600' },
    { label: '潜水旅行', value: stats.travel, icon: '✈️', href: '/admin/travel', bg: 'bg-orange-50', color: 'text-orange-600' },
    { label: '装备租售', value: stats.equipment, icon: '🤿', href: '/admin/equipment', bg: 'bg-purple-50', color: 'text-purple-600' },
    { label: '报名记录', value: stats.enrollments, icon: '📋', href: '#', bg: 'bg-red-50', color: 'text-red-600' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">控制台</h1>
        <p className="text-gray-500 text-sm mt-1">欢迎回来，{username}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map(card => (
          <a key={card.href} href={card.href} className={`block p-5 rounded-lg border border-gray-200 hover:shadow-md transition-shadow ${card.bg}`}>
            <div className={`text-3xl mb-2`}>{card.icon}</div>
            <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
            <div className={`text-sm font-medium mt-1 ${card.color} opacity-80`}>{card.label}</div>
          </a>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-800 mb-4">快速操作</h2>
          <div className="grid grid-cols-2 gap-3">
            <a href="/admin/courses" className="px-4 py-3 bg-[#006994] text-white text-sm rounded-lg text-center hover:bg-[#005a7f] transition-colors">+ 新增课程</a>
            <a href="/admin/destinations" className="px-4 py-3 bg-[#006994] text-white text-sm rounded-lg text-center hover:bg-[#005a7f] transition-colors">+ 新增目的地</a>
            <a href="/admin/travel" className="px-4 py-3 bg-[#006994] text-white text-sm rounded-lg text-center hover:bg-[#005a7f] transition-colors">+ 新增旅行套餐</a>
            <a href="/admin/equipment" className="px-4 py-3 bg-[#006994] text-white text-sm rounded-lg text-center hover:bg-[#005a7f] transition-colors">+ 新增装备</a>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-800 mb-4">系统信息</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between"><span>数据库</span><span className="text-green-600">SQLite 已连接</span></div>
            <div className="flex justify-between"><span>管理后台</span><span className="text-green-600">运行中</span></div>
            <div className="flex justify-between"><span>前台网站</span><a href="/" target="_blank" className="text-[#006994] hover:underline">查看 →</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}
