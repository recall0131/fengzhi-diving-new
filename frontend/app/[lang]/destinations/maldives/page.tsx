'use client';

import Link from 'next/link';

export default function MaldivesPage() {
  return (
    <div className="pt-20">
      <section className="relative py-20 md:py-32 bg-[#006994] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              马尔代夫
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              热带天堂，清澈的海水和绚丽的珊瑚礁
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
                马尔代夫是印度洋上的岛国，由26个环礁组成，被誉为"热带天堂"。这里拥有清澈见底的海水、绚丽的珊瑚礁和丰富的海洋生物，是潜水爱好者的梦想之地。
              </div>
              <p className="mb-6">
                马尔代夫的潜水以其能见度高、珊瑚礁完整、海洋生物丰富而闻名。您可以看到鲨鱼、魔鬼鱼、海龟、色彩斑斓的热带鱼群等。
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
                <h3 className="text-xl font-bold mb-3 text-gray-800">马累环礁</h3>
                <p className="text-gray-600">
                  首都附近的环礁，拥有多个优秀的潜水点，可以看到鲨鱼、魔鬼鱼等大型海洋生物。
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-800">阿里环礁</h3>
                <p className="text-gray-600">
                  以其丰富的海洋生物和壮观的珊瑚礁而闻名，是观赏魔鬼鱼的最佳地点。
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-800">芭环礁</h3>
                <p className="text-gray-600">
                  以其清澈的海水和丰富的海洋生物而闻名，是潜水和浮潜的绝佳地点。
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-800">瓦武环礁</h3>
                <p className="text-gray-600">
                  以其壮观的珊瑚礁和丰富的海洋生物而闻名，是潜水和浮潜的绝佳地点。
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-8 text-[#006994]">
              旅行套餐
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200 hover:border-[#006994] transition-all duration-300">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">5天4晚套餐</h3>
                <div className="text-4xl font-bold text-[#006994] mb-6">¥12,800</div>
                <ul className="space-y-3 mb-8 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    4晚水上屋住宿
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
                <div className="text-4xl font-bold mb-6">¥18,800</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-400">✓</span>
                    6晚水上屋住宿
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
