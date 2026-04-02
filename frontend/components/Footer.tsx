import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-4xl">🤿</span>
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-white">
                  奉旨潜水
                </h3>
                <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">
                  Imperial Diving
                </span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              专业潜水服务提供商，为您提供安全、专业、精彩的潜水体验。
              从入门到进阶，我们陪伴您的每一次深蓝探索。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[#006994] rounded-lg flex items-center justify-center transition-all duration-300" aria-label="WeChat">
                💬
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[#006994] rounded-lg flex items-center justify-center transition-all duration-300" aria-label="Weibo">
                📱
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[#006994] rounded-lg flex items-center justify-center transition-all duration-300" aria-label="Douyin">
                🎵
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">
              快速链接
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/zh/diving-experience" className="text-gray-400 hover:text-[#006994] transition-colors duration-300 flex items-center gap-2 group">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  潜水体验
                </Link>
              </li>
              <li>
                <Link href="/zh/diving-courses" className="text-gray-400 hover:text-[#006994] transition-colors duration-300 flex items-center gap-2 group">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  潜水课程
                </Link>
              </li>
              <li>
                <Link href="/zh/diving-travel" className="text-gray-400 hover:text-[#006994] transition-colors duration-300 flex items-center gap-2 group">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  潜水旅行
                </Link>
              </li>
              <li>
                <Link href="/zh/destinations" className="text-gray-400 hover:text-[#006994] transition-colors duration-300 flex items-center gap-2 group">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  潜水目的地
                </Link>
              </li>
              <li>
                <Link href="/zh/about" className="text-gray-400 hover:text-[#006994] transition-colors duration-300 flex items-center gap-2 group">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  关于我们
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">
              联系方式
            </h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start space-x-3 group">
                <span className="text-xl group-hover:scale-110 transition-transform">📞</span>
                <span className="group-hover:text-white transition-colors">+86 138-0000-0000</span>
              </li>
              <li className="flex items-start space-x-3 group">
                <span className="text-xl group-hover:scale-110 transition-transform">📧</span>
                <span className="group-hover:text-white transition-colors">info@fengzhidiving.com</span>
              </li>
              <li className="flex items-start space-x-3 group">
                <span className="text-xl group-hover:scale-110 transition-transform">📍</span>
                <span className="group-hover:text-white transition-colors">中国·海南省三亚市</span>
              </li>
              <li className="flex items-start space-x-3 group">
                <span className="text-xl group-hover:scale-110 transition-transform">⏰</span>
                <span className="group-hover:text-white transition-colors">周一至周日 08:00 - 20:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-center md:text-left text-sm">
              © 2026 奉旨潜水 - 官方网站 | All Rights Reserved
            </p>
            <div className="flex items-center space-x-2 text-gray-500 text-sm">
              <span>Designed with</span>
              <span className="animate-pulse">💙</span>
              <span>by OpenClaw</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
