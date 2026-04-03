'use client';

export default function OkinawaPage() {
  return (
    <div className="pt-20">
      <section className="relative py-20 md:py-32 min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=85" alt="Okinawa" className="w-full h-full object-cover object-center"/>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              冲绳潜水
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              日本 Okinawa · 青洞 · 亚洲顶级潜水目的地
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">日本最美潜水胜地</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              冲绳位于日本最南端，由众多岛屿组成，拥有清澈见底的海水和世界上最北端的珊瑚礁系统。独特的亚热带海洋环境孕育了丰富多样的海洋生物，是日本最受欢迎的潜水目的地。
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              冲绳本岛著名的青洞（蓝洞）是世界闻名的潜水点，阳光透过洞穴顶部洒下，在水下形成梦幻的蓝色光芒。独特的地理位置使其全年都适合潜水，冬季还能看到座头鲸迁徙。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-900">最佳潜水季节</h3>
                <p className="text-gray-600">4月至10月最佳。水温20-28°C，7-9月可与座头鲸同游。</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-900">难度等级</h3>
                <p className="text-gray-600">OW及以上级别。青洞适合初学者，其他潜点需AOW以上。</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-900">著名潜点</h3>
                <p className="text-gray-600">青洞、砂辺海岸、万座毛、庆良间诸岛等。</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-900">特色体验</h3>
                <p className="text-gray-600">青洞光影、座头鲸同游、珊瑚花园、夜潜。</p>
              </div>
            </div>

            <div className="bg-[#006994] text-white p-8 rounded-xl mb-8">
              <h3 className="text-xl font-bold mb-4">为什么选择冲绳？</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">01</span>
                  <span>青洞蓝光是摄影师梦寐以求的拍摄场景</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">02</span>
                  <span>日本发达的旅游业，中文服务便利</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">03</span>
                  <span>珊瑚礁系统完整，海洋生物种类繁多</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">04</span>
                  <span>直飞航班多，交通便利，可结合旅游观光</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <a href="/zh/contact" className="inline-block px-10 py-4 bg-[#006994] text-white font-bold text-lg rounded-lg hover:bg-[#005577] transition-colors">
                咨询冲绳潜水行程
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
