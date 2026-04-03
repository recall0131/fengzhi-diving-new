'use client';

export default function SanyaPage() {
  return (
    <div className="pt-20">
      <section className="relative py-20 md:py-32 bg-[#006994] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              三亚潜水
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              中国海南 · 离家最近的潜水天堂
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">家门口的潜水体验</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              三亚位于中国海南岛最南端，是中国最著名的热带海滨旅游城市。这里的海水清澈透明，珊瑚礁资源丰富，潜水条件优越，是国内潜水爱好者的首选目的地。
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              蜈支洲岛、西岛、亚龙湾等都是三亚著名的潜水胜地。无论您是第一次尝试潜水的新手，还是想要进阶的持证潜水员，三亚都能提供适合您的潜水体验。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-900">最佳潜水季节</h3>
                <p className="text-gray-600">10月至次年4月。水温22-28°C，夏季偶有台风影响。</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-900">难度等级</h3>
                <p className="text-gray-600">体验潜水无需证书，适合各年龄层。持证潜水员可参加进阶潜点。</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-900">著名潜点</h3>
                <p className="text-gray-600">蜈支洲岛、西岛、亚龙湾、大东海、皇后湾等。</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-900">特色体验</h3>
                <p className="text-gray-600">珊瑚礁潜水、海底珊瑚花园、潜水平台、岸潜体验。</p>
              </div>
            </div>

            <div className="bg-[#006994] text-white p-8 rounded-xl mb-8">
              <h3 className="text-xl font-bold mb-4">为什么选择三亚？</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">01</span>
                  <span>国内直飞，无需护照签证，说走就走</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">02</span>
                  <span>中文教练全程陪同，沟通无障碍</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">03</span>
                  <span>配套设施完善，潜水之余可享受度假乐趣</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">04</span>
                  <span>价格亲民，性价比极高的潜水体验</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <a href="/zh/contact" className="inline-block px-10 py-4 bg-[#006994] text-white font-bold text-lg rounded-lg hover:bg-[#005577] transition-colors">
                咨询三亚潜水行程
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
