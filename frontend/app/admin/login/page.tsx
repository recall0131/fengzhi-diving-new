'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
      if (data.ok) {
        router.push('/admin');
      } else {
        setError(data.error || '登录失败');
      }
    } catch {
      setError('网络错误');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-2xl font-bold text-[#006994] mb-2">奉旨潜水</div>
          <h1 className="text-xl font-semibold text-gray-800">管理后台登录</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006994] focus:border-transparent outline-none"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006994] focus:border-transparent outline-none"
              placeholder="••••••••"
              required
            />
          </div>
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#006994] text-white py-2 rounded-lg font-medium hover:bg-[#005a7f] transition-colors disabled:opacity-50"
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>
        <div className="mt-4 text-center text-xs text-gray-400">
          默认账号: admin / admin123
        </div>
      </div>
    </div>
  );
}
