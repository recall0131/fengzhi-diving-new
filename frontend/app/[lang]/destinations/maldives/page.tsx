'use client';

export default function MaldivesPage() {
  return (
    <div className="pt-20">
      <section className="relative py-20 md:py-32 min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1920&q=85" alt="Maldives" className="w-full h-full object-cover object-center"/>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              马尔代夫
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              印度洋 · 热带天堂 · 珊瑚礁王国
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">印度洋的珍珠</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              马尔代夫位于印度洋深处，由26个环礁和1192个珊瑚岛屿组成，是世界上最奢华的海岛度假目的地之一。这里海水清澈见底，珊瑚礁保存完好，海洋生物种类繁多，是潜水爱好者的天堂。
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              马尔代夫的潜水特色是蝠鲼（Manta Ray）和鲸鲨（Whale Shark）同游。知名的哈尼法鲁湾（Hanifaru Bay）是世界上最大的蝠鲼聚集地之一，每年5月至11月吸引大量潜水爱好者前来。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-900">最佳潜水季节</h3>
                <p className="text-gray-600">12月至次年4月。水温26-30°C，干燥季节能见度极佳。</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-900">难度等级</h3>
                <p className="text-gray-600">OW及以上级别。部分潜点有水流，需要有经验。</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-900">著名潜点</h3>
                <p className="text-gray-600">哈尼法鲁湾、布朗夫岛、马累环礁等。</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-900">特色体验</h3>
                <p className="text-gray-600">蝠鲼同游、鲸鲨同游、放流潜水、夜潜。</p>
              </div>
            </div>

            <div className="bg-[#006994] text-white p-8 rounded-xl mb-8">
              <h3 className="text-xl font-bold mb-4">为什么选择马尔代夫？</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">01</span>
                  <span>蝠鲼和鲸鲨同游的机会，世界独一无二</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">02</span>
                  <span>一岛一酒店，水上别墅体验极致奢华</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">03</span>
                  <span>珊瑚礁健康，海洋生物极其丰富</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">04</span>
                  <span>全年可潜水，不同季节有不同亮点</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <a href="/zh/contact" className="inline-block px-10 py-4 bg-[#006994] text-white font-bold text-lg rounded-lg hover:bg-[#005577] transition-colors">
                咨询马尔代夫潜水行程
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
