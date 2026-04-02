'use client';

import Link from 'next/link';

export default function PalauPage() {
  return (
    <div className="pt-20">
      <section className="relative py-20 md:py-32 bg-[#006994] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              帕劳蓝洞
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              世界顶级潜水圣地，探索神秘蓝洞和丰富海洋生物
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-[#006994]">
              目的地介绍
            </h2>
            <div className="prose prose-lg text-gray-700 mb-12">
              <p className="mb-6">
                帕劳位于西太平洋，被誉为世界顶级潜水圣地之一。这里拥有壮观的蓝洞、丰富的海洋生物和清澈见底的海水，是潜水爱好者的梦想之地。
              </p>
              <p className="mb-6">
                帕劳最著名的潜水点包括蓝洞（Blue Hole）、鲨鱼城（Shark City）、水母湖（Jellyfish Lake）等。每个潜水点都有其独特的魅力，让您流连忘返。
              </p>
              <p>
                最佳潜水季节是11月至次年4月，此时海水能见度最高，海洋生物也最为活跃。
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-8 text-[#006994]">
              热门潜水点
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-800">蓝洞</h3>
                <p className="text-gray-600">
                  帕劳最著名的潜水点，巨大的水下洞穴连接着外海，是鲨鱼和其他大型海洋生物的聚集地。
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-800">鲨鱼城</h3>
                <p className="text-gray-600">
                  这里聚集了大量鲨鱼，包括白鳍鲨、灰礁鲨等，是近距离观察鲨鱼的绝佳地点。
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-800">水母湖</h3>
                <p className="text-gray-600">
                  独特的无毒水母湖，数百万只水母在湖中漂浮，是浮潜和摄影的绝佳地点。
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-800">德国水道</h3>
                <p className="text-gray-600">
                  二战时期遗留的沉船和补给通道，现在是探索历史遗迹和观赏大型鱼群的潜水点。
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-8 text-[#006994]">
              旅行套餐
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200 hover:border-[#006994] transition-all duration-300">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">5天4晚套餐</h3>
                <div className="text-4xl font-bold text-[#006994] mb-6">¥8,800</div>
                <ul className="space-y-3 mb-8 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    4晚五星级酒店住宿
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    3天潜水（每天2潜）
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    全套潜水装备
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    专业潜水向导
                  </li>
                </ul>
                <Link href="/zh/contact" className="block text-center px-6 py-3 bg-[#006994] text-white font-bold rounded-lg hover:bg-[#005a7f] transition-colors">
                  立即预订
                </Link>
              </div>

              <div className="bg-[#006994] p-8 rounded-lg text-white relative transform scale-105 shadow-xl">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                  热门推荐
                </div>
                <h3 className="text-2xl font-bold mb-4">7天6晚套餐</h3>
                <div className="text-4xl font-bold mb-6">¥12,800</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-400">✓</span>
                    6晚五星级酒店住宿
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-400">✓</span>
                    5天潜水（每天2-3潜）
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-400">✓</span>
                    全套潜水装备
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-400">✓</span>
                    专业潜水向导
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-400">✓</span>
                    机场接送
                  </li>
                </ul>
                <Link href="/zh/contact" className="block text-center px-6 py-3 bg-white text-[#006994] font-bold rounded-lg hover:bg-gray-100 transition-colors">
                  立即预订
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
