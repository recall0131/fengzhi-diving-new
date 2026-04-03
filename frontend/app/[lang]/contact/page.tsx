'use client';

export default function ContactPage() {
  return (
    <div className="pt-20">
      <section className="relative py-20 md:py-32 bg-[#006994] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              联系我们
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              有任何问题？随时联系我们，我们期待为您服务
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#006994]">
                发送留言
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-800 font-bold mb-2">姓名</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006994] focus:ring-2 focus:ring-[#006994]/20 transition-all text-gray-900 placeholder-gray-400"
                    placeholder="请输入您的姓名"
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-bold mb-2">邮箱</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006994] focus:ring-2 focus:ring-[#006994]/20 transition-all text-gray-900 placeholder-gray-400"
                    placeholder="请输入您的邮箱"
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-bold mb-2">留言</label>
                  <textarea
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006994] focus:ring-2 focus:ring-[#006994]/20 transition-all text-gray-900 placeholder-gray-400 resize-none"
                    rows={5}
                    placeholder="请输入您的留言"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#006994] hover:bg-[#005a7f] text-white font-bold py-4 rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  发送留言
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#006994]">
                联系方式
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#006994] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.17h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">电话</h3>
                    <p className="text-gray-600">+86 400-888-8288</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#006994] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">邮箱</h3>
                    <p className="text-gray-600">info@imperialdiving.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#006994] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">地址</h3>
                    <p className="text-gray-600">海南省三亚市海棠区潜水度假区88号</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#006994] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">营业时间</h3>
                    <p className="text-gray-600">周一至周日 08:00 - 20:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#006994] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">微信</h3>
                    <p className="text-gray-600">fengzhidiving</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
