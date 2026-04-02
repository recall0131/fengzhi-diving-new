'use client';

import Link from 'next/link';

export default function DivingCoursesPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-[#006994] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              潜水课程
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              专业认证，全球认可，开启您的潜水之旅
            </p>
            <p className="text-lg text-white/white/80 max-w-2xl mx-auto">
              从入门到进阶，我们提供完整的潜水培训体系。获得国际认可的PADI证书，让您的潜水之旅更加精彩。
            </p>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* OWD */}
            <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200 hover:border-[#006994] transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-800">OWD 开放水域潜水员</h3>
                <span className="px-3 py-1 bg-[#006994] text-white rounded-full text-sm font-semibold">入门</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                最受欢迎的入门课程，学习基础潜水技能，获得全球认可的PADI证书。包含理论、泳池练习和开放水域潜水。
              </p>
              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-2">课程内容：</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• 潜水理论知识</li>
                  <li>• 泳池技能练习</li>
                  <li>• 开放水域4次潜水</li>
                  <li>• 装备使用与维护</li>
                </ul>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-300">
                <span className="text-3xl font-bold text-[#006994]">¥2,800</span>
                <Link href="/zh/contact" className="px-6 py-2 bg-[#006994] text-white font-semibold rounded hover:bg-[#005a7f] transition-colors">
                  报名
                </Link>
              </div>
            </div>

            {/* AOWD */}
            <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200 hover:border-[#006994] transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-800">AOWD 进阶开放水域</h3>
                <span className="px-3 py-1 bg-[#006994] text-white rounded-full text-sm font-semibold">进阶</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                提升潜水技能，尝试夜潜、深潜、沉船潜等精彩项目。丰富您的潜水体验，探索更多水下世界。
              </p>
              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-2">课程内容：</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• 深潜（最大30米）</li>
                  <li>• 水下导航</li>
                  <li>• 夜潜体验</li>
                  <li>• 沉船潜探索</li>
                </ul>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-300">
                <span className="text-3xl font-bold text-[#006994]">¥2,200</span>
                <Link href="/zh/contact" className="px-6 py-2 bg-[#006994] text-white font-semibold rounded hover:bg-[#005a7f] transition-colors">
                  报名
                </Link>
              </div>
            </div>

            {/* Rescue */}
            <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200 hover:border-[#006994] transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-800">Rescue 救援潜水员</h3>
                <span className="px-3 py-1 bg-[#006994] text-white rounded-full text-sm font-semibold">高级</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                学习紧急救援技能，提升安全意识和自救互救能力。成为更负责任的潜水员，保护自己和同伴。
              </p>
              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-2">课程内容：</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• 自救技巧</li>
                  <li>• 疲劳潜水员救援</li>
                  <li>• 紧急情况处理</li>
                  <li>• 急救与CPR</li>
                </ul>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-300">
                <span className="text-3xl font-bold text-[#006994]">¥1,800</span>
                <Link href="/zh/contact" className="px-6 py-2 bg-[#006994] text-white font-semibold rounded hover:bg-[#005a7f] transition-colors">
                  报名
                </Link>
              </div>
            </div>

            {/* Divemaster */}
            <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200 hover:border-[#006994] transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-800">DM 潜水长</h3>
                <span className="px-3 py-1 bg-[#006994] text-white rounded-full text-sm font-semibold">专业</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                成为专业潜水员的第一步，学习领导潜水活动、协助教练教学。开启您的潜水职业道路。
              </p>
              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-2">课程内容：</</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• 潜水活动组织</li>
                  <li>• 学员辅导技巧</li>
                  <li>• 装备管理</li>
                  <li>• 潜水理论深化</li>
                </ul>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-300">
                <span className="text-3xl font-bold text-[#006994]">¥3,800</span>
                <Link href="/zh/contact" className="px-6 py-2 bg-[#006994] text-white font-semibold rounded hover:bg-[#005a7f] transition-colors">
                  报名
                </Link>
              </div>
            </div>

            {/* Specialties */}
            <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200 hover:border-[#006994] transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-800">专长课程</h3>
                <span className="px-3 py-1 bg-[#006994] text-white rounded-full text-sm font-semibold">进阶</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                专攻您感兴趣的领域，成为特定领域的专家。包括高氧潜水、沉船潜水、水下摄影等。
              </p>
              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-2">可选专长：</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• 高氧潜水（Nitrox）</li>
                  <li>• 沉船潜水</li>
                  <li>• 水下摄影</li>
                  <li>• 深潜专长</li>
                </ul>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-300">
                <span className="text-3xl font-bold text-[#006994]">¥800起</span>
                <Link href="/zh/contact" className="px-6 py-2 bg-[#006994] text-white font-semibold rounded hover:bg-[#005a7f] transition-colors">
                  报名
                </Link>
              </div>
            </div>

            {/* Instructor */}
            <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200 hover:border-[#006994] transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-800">IDC 教练发展课程</h3>
                <span className="px-3 py-1 bg-[#006994] text-white rounded-full text-sm font-semibold">大师</span>
              </div>
              <p className="text-gray-600[ leading-relaxed mb-6">
                成为PADI开放水域教练，教授潜水课程，分享您的潜水热情。开启您的潜水教学职业生涯。
              </p>
              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-2">课程内容：</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• 教学技巧</li>
                  <li>• 课程规划</li>
                  <li>• 学员评估</li>
                  <li>• 营销与推广</li>
                </ul>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-300">
                <span className="text-3xl font-bold text-[#006994]">¥8,800</span>
                <Link href="/zh/contact" className="px-6 py-2 bg-[#006994] text-white font-semibold rounded hover:bg-[#005a7f] transition-colors">
                  报名
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#006994]">
              为什么选择我们
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              专业、安全、全面的潜水培训
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#006994] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎓</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">PADI认证教练</h3>
              <p className="text-gray-600">
                所有教练均持有PADI专业认证，经验丰富，教学专业
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#006994] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">全球认可证书</h3>
              <p className="text-gray-600">
                PADI证书全球通用，在世界任何地方都可以潜水
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#006994] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">安全第一</h3>
              <p className="text-gray-600">
                严格的安全标准，完善的安全措施，让您学得放心
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#006994] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              准备好开始您的潜水与其他之旅了吗？
            </h2>
            <p className="text-xl text-white/90 mb-8">
              联系我们，选择适合您的课程
            </p>
            <Link href="/zh/contact" className="inline-block px-10 py-5 bg-white text-[#006994] font-bold text-xl rounded-lg hover:bg-gray-100 transition-all shadow-lg">
              联系我们
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
