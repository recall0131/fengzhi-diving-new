'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="relative py-20 md:py-32 bg-[#006994] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              关于奉旨潜水
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              专业潜水服务，用心服务每一位潜水爱好者
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#006994]">
              我们的故事
            </h2>
            <div className="prose prose-lg text-gray-700 mb-12">
              <p className="mb-6">
                奉旨潜水成立于2018年，是一家专业的潜水服务提供商。我们的创始团队都是资深潜水爱好者，深知潜水带给人们的快乐和震撼。
              </p>
              <p className="mb-6">
                多年来，我们始终坚持"安全第一、服务至上"的理念，为超过1000名学员提供了专业的潜水培训和体验服务。我们的教练团队拥有丰富的教学经验，都是PADI认证的专业教练。
              </p>
              <p>
                我们相信，潜水不仅仅是一项运动，更是一种生活态度。通过潜水，人们可以探索未知的世界，感受海洋的壮美，学会尊重和保护我们的蓝色星球。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center bg-gray-50 p-8 rounded-lg">
                <div className="text-5xl font-bold text-[#006994] mb-2">1000+</div>
                <div className="text-gray-600">学员人数</div>
              </div>
              <div className="text-center bg-gray-50 p-8 rounded-lg">
                <div className="text-5xl font-bold text-[#006994] mb-2">50+</div>
                <div className="text-gray-600">教练团队</div>
              </div>
              <div className="text-center bg-gray-50 p-8 rounded-lg">
                <div className="text-5xl font-bold text-[#006994] mb-2">6年</div>
                <div className="text-gray-600">服务经验</div>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#006994]">
              我们的使命
            </h2>
            <div className="prose prose-lg text-gray-700">
              <p className="mb-6">
                我们的使命是让更多人安全、快乐地体验潜水的魅力。我们致力于：
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>提供专业、安全的潜水培训和体验服务</li>
                <li>推广潜水运动，让更多人了解海洋保护的重要性</li>
                <li>培养负责任的潜水员，共同保护海洋环境</li>
                <li>打造潜水爱好者社区，分享潜水乐趣</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#006994]">
              为什么选择我们
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#006994] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">👨‍🏫</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">专业教练</h3>
              <p className="text-gray-600">
                PADI认证教练，经验丰富，教学专业
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#006994] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">安全第一</h3>
              <p className="text-gray-600">
                严格的安全标准，完善的安全措施
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#006994] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" viewBox="0 0 48 48" fill="none"><path d="M24 42 C12 30 4 22 4 14 C4 8 8 4 14 4 C18 4 22 6 24 10 C26 6 30 4 34 4 C40 4 44 8 44 14 C44 22 36 30 24 42Z" fill="white" opacity="0.8"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">用心服务</h3>
              <p className="text-gray-600">
                热情周到的服务，让您宾至如归
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
