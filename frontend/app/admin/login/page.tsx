'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PADI = { blue: '#0098B3', blueDark: '#007591', yellow: '#FFB600', orange: '#FF6B00', dark: '#1A1A2E' };

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.ok) router.push('/admin');
      else setError(data.error || '登录失败');
    } catch { setError('网络错误'); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel - decorative */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12" style={{background: `linear-gradient(135deg, ${PADI.dark} 0%, ${PADI.blueDark} 100%)`}}>
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-base" style={{background: PADI.yellow, color: PADI.dark}}>P</div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">Imperial Diving</h2>
              <p className="text-white/50 text-xs">管理后台</p>
            </div>
          </div>
          <h1 className="text-4xl font-black text-white leading-tight mb-4">
            欢迎回来<br/>
            <span style={{color: PADI.yellow}}>专业潜水管理</span>
          </h1>
          <p className="text-white/60 text-base max-w-md leading-relaxed">
            管理您的潜水课程、目的地、旅行套餐和装备库存。所有数据实时同步到前台网站。
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{background: 'rgba(255,255,255,0.1)'}}>
            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div className="text-white/40 text-xs">PADI Certified Training Center</div>
        </div>
      </div>

      {/* Right panel - login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-base" style={{background: PADI.yellow, color: PADI.dark}}>P</div>
            <div>
              <h2 className="font-bold text-lg" style={{color: PADI.dark}}>Imperial Diving</h2>
              <p className="text-gray-400 text-xs">管理后台</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold" style={{color: PADI.dark}}>登录</h2>
            <p className="text-sm mt-1" style={{color: '#9CA3AF'}}>输入您的管理员账号信息</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{color: '#374151'}}>用户名</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="admin"
                required
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2"
                style={{borderColor: '#E5E7EB', '--tw-ring-color': PADI.blue} as any}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{color: '#374151'}}>密码</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2"
                style={{borderColor: '#E5E7EB'} as any}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl text-white text-sm font-semibold shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              style={{background: PADI.blue}}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  登录中...
                </>
              ) : '登录管理后台'}
            </button>
          </form>

          <p className="text-center text-xs mt-6" style={{color: '#9CA3AF'}}>
            默认账号: <span className="font-mono">admin</span> / <span className="font-mono">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
