'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PADI = { blue: '#0098B3', blueDark: '#007591', yellow: '#FFB600', orange: '#FF6B00', dark: '#0F1923', gray: '#64748B', border: '#E2E8F0' };

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
    <div className="min-h-screen flex" style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"}}>

      {/* Left panel - decorative */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 xl:p-16"
        style={{background: `linear-gradient(160deg, ${PADI.dark} 0%, ${PADI.blueDark} 100%)`}}>
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-xl" style={{background: PADI.yellow, color: PADI.dark}}>P</div>
            <div>
              <div className="text-white font-bold text-xl leading-tight tracking-tight">Imperial Diving</div>
              <div className="text-white/30 text-xs tracking-widest uppercase">PADI Certified Center</div>
            </div>
          </div>
          <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight mb-4">
            专业潜水<br/>
            <span style={{color: PADI.yellow}}>管理后台</span>
          </h1>
          <p className="text-white/40 text-base max-w-md leading-relaxed">
            管理潜水课程、目的地、旅行套餐和装备库存。所有内容实时同步到前台网站。
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: 'rgba(255,255,255,0.08)'}}>
            <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <p className="text-white/30 text-xs">Imperial Diving Center — 管理后台</p>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50/50">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg" style={{background: PADI.yellow, color: PADI.dark}}>P</div>
            <div>
              <div className="font-bold text-lg" style={{color: PADI.dark}}>Imperial Diving</div>
              <div className="text-xs tracking-widest uppercase" style={{color: PADI.gray}}>管理后台</div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight" style={{color: '#0F172A'}}>登录</h2>
            <p className="text-sm mt-1.5" style={{color: PADI.gray}}>输入您的管理员账号信息</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{color: '#475569'}}>用户名</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="admin" required
                className="w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none"
                style={{borderColor: PADI.border, color: '#1E293B', background: '#FFFFFF'}}
                onFocus={e => { e.target.style.borderColor = PADI.blue; e.target.style.boxShadow = `0 0 0 3px ${PADI.blue}20`; }}
                onBlur={e => { e.target.style.borderColor = PADI.border; e.target.style.boxShadow = 'none'; }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{color: '#475569'}}>密码</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                className="w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none"
                style={{borderColor: PADI.border, color: '#1E293B', background: '#FFFFFF'}}
                onFocus={e => { e.target.style.borderColor = PADI.blue; e.target.style.boxShadow = `0 0 0 3px ${PADI.blue}20`; }}
                onBlur={e => { e.target.style.borderColor = PADI.border; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl text-white text-sm font-semibold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 active:scale-98"
              style={{background: PADI.blue}}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = PADI.blueDark}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = PADI.blue}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  登录中...
                </>
              ) : '登录管理后台'}
            </button>
          </form>

          <p className="text-center text-xs mt-8" style={{color: '#94A3B8'}}>
            默认账号: <span className="font-mono font-semibold" style={{color: PADI.gray}}>admin</span>
            {' / '}
            <span className="font-mono font-semibold" style={{color: PADI.gray}}>admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
