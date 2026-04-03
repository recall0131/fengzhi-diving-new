'use client';

export default function CoronPage() {
  return (
    <div className="pt-20">
      <section className="relative py-20 md:py-32 min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?w=1920&q=85" alt="Coron" className="w-full h-full object-cover object-center"/>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              科隆沉船
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              菲律宾巴拉望 · 二战沉船潜水圣地
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">探索二战沉船遗迹</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              科隆位于菲律宾巴拉望省北部，以其清澈的海水和保存完好的二战沉船群闻名。1942年，美国空军击沉了多艘日本舰船，这些沉船如今成为东南亚最壮观的沉船潜水目的地之一。
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              沉船深度从5米到40米不等，适合各级别潜水员。部分沉船内部空间宽敞，海洋生物丰富，是摄影潜水的绝佳选择。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-900">最佳潜水季节</h3>
                <p className="text-gray-600">11月至次年5月。水温24-29°C，建议使用5mm潜水服。</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-900">难度等级</h3>
                <p className="text-gray-600">适合AOW及以上级别潜水员。部分沉船需要夜潜或深潜认证。</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-900">主要沉船</h3>
                <p className="text-gray-600">秋津丸、陆奥丸、樱花丸、气抚丸等8艘著名沉船。</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-900">潜水难度</h3>
                <p className="text-gray-600">部分沉船深度25-40米，需要良好的中性浮力和气量管理。</p>
              </div>
            </div>

            <div className="bg-[#006994] text-white p-8 rounded-xl mb-8">
              <h3 className="text-xl font-bold mb-4">为什么选择科隆？</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">01</span>
                  <span>沉船保存完整，历史价值极高</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">02</span>
                  <span>海洋生物丰富，珊瑚和鱼群密集</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">03</span>
                  <span>水温适宜，能见度常年15-30米</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">04</span>
                  <span>交通便利，马尼拉直飞科隆约1小时</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <a href="/zh/contact" className="inline-block px-10 py-4 bg-[#006994] text-white font-bold text-lg rounded-lg hover:bg-[#005577] transition-colors">
                咨询科隆潜水行程
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
