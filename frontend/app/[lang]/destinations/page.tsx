'use client';

import Link from 'next/link';

export default function DestinationsPage() {
  return (
    <div className="pt-20">
      <section className="relative py-20 md:py-32 bg-[#00.6994] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              潜水目的地
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              探索世界顶级潜水圣地
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
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
    </div>
  );
}
