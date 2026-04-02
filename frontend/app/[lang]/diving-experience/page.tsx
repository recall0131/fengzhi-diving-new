'use client';

import Link from 'next/link';

export default function DivingExperiencePage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-[#006994] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              潜水体验
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              无需证书，即刻开启您的深蓝之旅
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              在专业教练一对一陪同下，安全探索神秘的海底世界。这是您第一次潜水的最佳选择，无需任何潜水证书，全程提供专业指导。
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#006994]">
              为什么选择我们
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              专业、安全、舒适，让您无忧享受潜水乐趣
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#006994] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">👨‍🏫</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">一对一教练</h3>
              <p className="text-gray-600">
                专业教练全程一对一陪同，确保您的安全和体验质量
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#006994] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">⏱️</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">30分钟体验</h3>
              <p className="text-gray-600">
                充足的潜水时间，让您充分感受海底世界的魅力
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#006994] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📸</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">免费拍照</h3>
              <p className="text-gray-600">
                教练为您记录美好瞬间，留下珍贵的潜水回忆
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#006994] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎁</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">全套装备</h3>
              <p className="text-gray-600">
                提供高品质潜水装备，无需自备任何设备
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#006994]">
              体验流程
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              简单四步，轻松开启潜水之旅
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#006994] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">预约时间</h3>
                  <p className="text-gray-600">
                    通过电话或微信联系我们，预约您方便的体验时间。我们建议提前1-3天预约，以便我们为您安排最好的教练和场地。
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#006994] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">理论讲解</h3>
                  <p className="text-gray-600">
                    到达现场后，教练会为您讲解基本潜水知识、安全须知和装备使用方法。约15-20分钟的理论学习，让您对潜水有基本了解。
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#006994] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">装备穿戴</h3>
                  <p className="text-gray-600">
                    教练会帮助您穿戴好全套潜水装备，包括潜水服、面镜、呼吸管、脚蹼等。我们会根据您的身材选择合适的装备，确保舒适安全。
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#006994] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  4
                </div>
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">下水体验</h3>
                  <p className="text-gray-600">
                    在教练一对一陪同下，开始您的潜水之旅！探索海底世界，观赏珊瑚和热带鱼，体验失重的奇妙感觉。全程约30分钟。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#006994]">
              体验套餐
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              选择适合您的体验套餐
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200 hover:border-[#006994] transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">基础体验</h3>
              <div className="text-4xl font-bold text-[#006994] mb-6">¥398</div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  30分钟潜水体验
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  一对一教练陪同
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  全套潜水装备
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  理论讲解
                </li>
              </ul>
              <Link href="/zh/contact" className="block text-center px-6 py-3 bg-[#006994] text-white font-bold rounded-lg hover:bg-[#005a7f] transition-colors">
                立即预约
              </Link>
            </div>

            <div className="bg-[#006994] p-8 rounded-lg text-white relative transform scale-105 shadow-xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                热门推荐
              </div>
              <h3 className="text-2xl font-bold mb-4">标准体验</h3>
              <div className="text-4xl font-bold mb-6">¥598</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-yellow-400">✓</span>
                  30分钟潜水体验
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-400">✓</span>
                  一对一教练陪同
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-400">✓</span>
                  全套潜水装备
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-400">✓</span>
                  理论讲解
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-400">✓</span>
                  免费拍照服务
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-400">✓</span>
                  保险保障
                </li>
              </ul>
              <Link href="/zh/contact" className="block text-center px-6 py-3 bg-white text-[#006994] font-bold rounded-lg hover:bg-gray-100 transition-colors">
                立即预约
              </Link>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200 hover:border-[#006994] transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">双人体验</h3>
              <div className="text-4xl font-bold text-[#006994] mb-6">¥998</div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  2人各30分钟体验
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  一对一教练陪同
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  全套潜水装备
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  理论讲解
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  免费拍照服务
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  保险保障
                </li>
              </ul>
              <Link href="/zh/contact" className="block text-center px-6 py-3 bg-[#006994] text-white font-bold rounded-lg hover:bg-[#005a7f] transition-colors">
                立即预约
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#006994]">
              常见问题
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-800">需要会游泳吗？</h3>
              <p className="text-gray-600">
                不需要会游泳，但需要您对水不恐惧。我们的教练会全程陪同，确保您的安全。只要您身体健康，没有心脏病、高血压等不适合潜水的疾病，就可以参加体验潜水。
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-800">需要带什么？</h3>
              <p className="text-gray-600">
                我们会提供全套潜水装备，您只需要带上泳衣、毛巾和换洗衣服即可。如果您有个人潜水装备，也可以使用自己的装备。
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-800">年龄有限制吗？</h3>
              <p className="text-gray-600">
                体验潜水适合10岁以上的朋友。未成年人需要家长或监护人陪同。对于12岁以下的儿童，我们有专门的儿童潜水体验项目。
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-800">安全吗？</h3>
              <p className="text-gray-600">
                非常安全！我们的教练都是PADI认证的专业教练，有丰富的教学经验。我们会为您提供专业的保险保障，全程一对一陪同，确保您的安全。
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
              准备好开始您的潜水之旅了吗？
            </h2>
            <p className="text-xl text-white/90 mb-8">
              立即预约，探索神秘的海底世界
            </p>
            <Link href="/zh/contact" className="inline-block px-10 py-5 bg-white text-[#006994] font-bold text-xl rounded-lg hover:bg-gray-100 transition-all shadow-lg">
              联系我们预约
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
