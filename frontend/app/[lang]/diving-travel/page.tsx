'use client';

import Link from 'next/link';

export default function DivingTravelPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-[#006994] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              潜水旅行
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              探索世界顶级潜水目的地
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              我们精选全球最棒的潜水圣地，提供一站式潜水旅行服务。从热带天堂到神秘沉船，带您探索深蓝的无限魅力。
            </p>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#006994]">
              热门目的地
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              精选全球顶级潜水圣地
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/zh/destinations/palau" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="h-72 bg-gradient-to-br from-[#006994] to-[#004d6b] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <span className="text-8xl">🕳️</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">帕劳蓝洞</h3>
                  <p className="text-white/80 text-sm">世界顶级潜水圣地，壮观的蓝洞和丰富的海洋生物</p>
                </div>
              </div>
            </Link>

            <Link href="/zh/destinations/maldives" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="h-72 bg-gradient-to-br from-[#006994] to-[#005a7f] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <span className="text-8xl">🏝️</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">马尔代夫</h3>
                  <p className="text-white/80 text-sm">热带天堂，清澈的海水和绚丽的珊瑚礁</p>
                </div>
              </div>
            </Link>

            <Link href="/zh/destinations/great-barrier-reef" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="h-72 bg-gradient-to-br from-[#006994] to-[#003d52] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <span className="text-8xl">🐠</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">大堡礁</h3>
                  <p className="text-white/80 text-sm">世界最大的珊瑚礁系统，独特的海洋生态系统</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#006994]">
              为什么选择我们的潜水旅行
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#006994] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">专业向导</h3>
              <p className="text-gray-600">
                经验丰富的潜水向导，熟悉每个潜点的最佳路线和海洋生物
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#006994] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🏨️</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">一站式服务</h3>
              <p className="text-gray-600">
                机票、住宿、潜水安排全包，您只需享受潜水乐趣
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#006994] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">超值价格</h3>
              <p className="text-gray-600">
                与当地潜店直接合作，为您提供最具竞争力的价格
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#006994] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              准备好出发了吗？
            </h2>
            <p className="text-xl text-white/90 mb-8">
              联系我们，定制您的潜水旅行
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
