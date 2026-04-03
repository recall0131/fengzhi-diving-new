'use client';

export default function ContactPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang as string) || 'zh';
  const isZh = lang === 'zh';
  const t = (zh: string, en: string) => (isZh ? zh : en);

  return (
    <div className="pt-20">
      <section className="relative py-20 md:py-32 min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1559825481-12a05cc00344?w=1920&q=85" alt="Contact Imperial Diving" className="w-full h-full object-cover object-center"/>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('联系我们', 'Contact Us')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              {t('有任何问题？随时联系我们，我们期待为您服务', 'Have questions? Reach out anytime — we look forward to serving you')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#006994]">
                {t('发送留言', 'Send a Message')}
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-800 font-bold mb-2">{t('姓名', 'Name')}</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006994] focus:ring-2 focus:ring-[#006994]/20 transition-all text-gray-900 placeholder-gray-400"
                    placeholder={t('请输入您的姓名', 'Enter your name')}
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-bold mb-2">{t('邮箱', 'Email')}</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006994] focus:ring-2 focus:ring-[#006994]/20 transition-all text-gray-900 placeholder-gray-400"
                    placeholder={t('请输入您的邮箱', 'Enter your email')}
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-bold mb-2">{t('留言', 'Message')}</label>
                  <textarea
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006994] focus:ring-2 focus:ring-[#006994]/20 transition-all text-gray-900 placeholder-gray-400 resize-none"
                    rows={5}
                    placeholder={t('请输入您的留言', 'Enter your message')}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#006994] hover:bg-[#005a7f] text-white font-bold py-4 rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  {t('发送留言', 'Send Message')}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#006994]">
                {t('联系方式', 'Contact Information')}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#006994] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.17h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">{t('电话', 'Phone')}</h3>
                    <p className="text-gray-600">+86 400-888-8288</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#006994] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">{t('邮箱', 'Email')}</h3>
                    <p className="text-gray-600">info@imperialdiving.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#006994] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">{t('地址', 'Address')}</h3>
                    <p className="text-gray-600">{t('海南省三亚市海棠区潜水度假区88号', '88 Diving Resort Area, Haitang Bay, Sanya, Hainan, China')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#006994] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">{t('营业时间', 'Business Hours')}</h3>
                    <p className="text-gray-600">{t('周一至周日 08:00 - 20:00', 'Monday to Sunday, 08:00 — 20:00')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#006994] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M8.5 12.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5.5 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM12 2C6.477 2 2 6.145 2 11.243c0 2.936 1.526 5.55 3.926 7.227l-.926 3.073a.5.5 0 0 0 .648.552l3.092-1.79A11.2 11.2 0 0 0 12 18.973c5.523 0 10-4.145 10-9.73S17.523 2 12 2z"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">{t('微信', 'WeChat')}</h3>
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
