'use client';

import Link from 'next/link';

function InstructorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="16" r="8" stroke="white" strokeWidth="2"/>
      <path d="M12 42 Q12 32 24 32 Q36 32 36 42" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="26" r="16" stroke="white" strokeWidth="2"/>
      <path d="M24 18 L24 26 L30 30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="14" width="36" height="26" rx="3" stroke="white" strokeWidth="2"/>
      <circle cx="24" cy="27" r="7" stroke="white" strokeWidth="2"/>
      <circle cx="24" cy="27" r="3" fill="white"/>
    </svg>
  );
}

function GiftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect x="8" y="20" width="32" height="22" rx="2" stroke="white" strokeWidth="2"/>
      <path d="M8 26 L24 34 L40 26" stroke="white" strokeWidth="2"/>
      <path d="M24 34 L24 46" stroke="white" strokeWidth="2"/>
      <path d="M24 20 L24 34 M18 20 Q18 12 24 12 Q30 12 30 20" stroke="white" strokeWidth="2"/>
    </svg>
  );
}

const features = [
  {
    Icon: InstructorIcon,
    title: { zh: '一对一教练', en: '1-on-1 Instructor' },
    desc: { zh: '专业教练全程一对一陪同，确保您的安全和体验质量', en: 'Professional instructor accompanies you throughout for your safety and quality experience' },
  },
  {
    Icon: ClockIcon,
    title: { zh: '30分钟体验', en: '30-Minute Experience' },
    desc: { zh: '充足的潜水时间，让您充分感受海底世界的魅力', en: 'Ample dive time to fully experience the underwater world' },
  },
  {
    Icon: CameraIcon,
    title: { zh: '免费拍照', en: 'Free Photo Service' },
    desc: { zh: '教练为您记录美好瞬间，留下珍贵的潜水回忆', en: 'Instructor captures your best moments for lasting dive memories' },
  },
  {
    Icon: GiftIcon,
    title: { zh: '全套装备', en: 'Full Equipment Provided' },
    desc: { zh: '提供高品质潜水装备，无需自备任何设备', en: 'High-quality gear provided — bring nothing but yourself' },
  },
];

const packages = [
  {
    name: { zh: '基础体验', en: 'Basic Experience' },
    price: '¥398',
    highlight: false,
    items: {
      zh: ['30分钟潜水体验', '一对一教练陪同', '全套潜水装备', '理论讲解'],
      en: ['30-min dive experience', '1-on-1 instructor', 'Full gear rental', 'Theory briefing'],
    },
  },
  {
    name: { zh: '标准体验', en: 'Standard Experience' },
    price: '¥598',
    highlight: true,
    tag: { zh: '热门推荐', en: 'Most Popular' },
    items: {
      zh: ['30分钟潜水体验', '一对一教练陪同', '全套潜水装备', '理论讲解', '免费拍照服务', '保险保障'],
      en: ['30-min dive experience', '1-on-1 instructor', 'Full gear rental', 'Theory briefing', 'Free photo service', 'Insurance included'],
    },
  },
  {
    name: { zh: '双人体验', en: 'Duo Experience' },
    price: '¥998',
    highlight: false,
    items: {
      zh: ['2人各30分钟体验', '一对一教练陪同', '全套潜水装备', '理论讲解', '免费拍照服务', '保险保障'],
      en: ['2 × 30-min dives', '1-on-1 instructor', 'Full gear rental', 'Theory briefing', 'Free photo service', 'Insurance included'],
    },
  },
];

const faqs = [
  {
    q: { zh: '需要会游泳吗？', en: 'Do I need to know how to swim?' },
    a: {
      zh: '不需要会游泳，但需要您对水不恐惧。我们的教练会全程陪同，确保您的安全。只要您身体健康，没有心脏病、高血压等不适合潜水的疾病，就可以参加体验潜水。',
      en: 'No swimming required, but you should be comfortable in water. Our instructors stay with you throughout. As long as you\'re healthy with no contraindications (heart conditions, high blood pressure, etc.), you\'re good to go.',
    },
  },
  {
    q: { zh: '需要带什么？', en: 'What should I bring?' },
    a: {
      zh: '我们会提供全套潜水装备，您只需要带上泳衣、毛巾和换洗衣服即可。如果您有个人潜水装备，也可以使用自己的装备。',
      en: 'We provide everything — just bring your swimsuit, towel, and a change of clothes. Feel free to bring your own gear if you have it.',
    },
  },
  {
    q: { zh: '年龄有限制吗？', en: 'Is there an age limit?' },
    a: {
      zh: '体验潜水适合10岁以上的朋友。未成年人需要家长或监护人陪同。对于12岁以下的儿童，我们有专门的儿童潜水体验项目。',
      en: 'Suitable for ages 10 and up. Minors need a parent or guardian present. We also have a dedicated kids\' program for children under 12.',
    },
  },
  {
    q: { zh: '安全吗？', en: 'Is it safe?' },
    a: {
      zh: '非常安全！我们的教练都是PADI认证的专业教练，有丰富的教学经验。我们会为您提供专业的保险保障，全程一对一陪同，确保您的安全。',
      en: 'Absolutely safe! All our instructors are PADI-certified professionals with extensive teaching experience. We provide full insurance coverage and maintain 1-on-1 supervision throughout.',
    },
  },
];

export default function DivingExperiencePage({ params }: { params: { lang: string } }) {
  const lang = (params.lang as string) || 'zh';
  const isZh = lang === 'zh';
  const t = (zh: string, en: string) => (isZh ? zh : en);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-32 min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1544551763-77ef4b39c08a?w=1920&q=85" alt="Dive Experience" className="w-full h-full object-cover object-center"/>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('潜水体验', 'Dive Experience')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {t('无需证书，即刻开启您的深蓝之旅', 'No certification needed — dive into the blue right now')}
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              {t('在专业教练一对一陪同下，安全探索神秘的海底世界。这是您第一次潜水的最佳选择。', 'Safely explore the mysterious underwater world with a professional instructor by your side. The perfect choice for your first dive.')}
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#006994]">
              {t('为什么选择我们', 'Why Choose Us')}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('专业、安全、舒适，让您无忧享受潜水乐趣', 'Professional, safe, comfortable — dive with complete peace of mind')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ Icon, title, desc }) => (
              <div key={title.zh} className="text-center">
                <div className="w-20 h-20 bg-[#006994] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{t(title.zh, title.en)}</h3>
                <p className="text-gray-600">{t(desc.zh, desc.en)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#006994]">{t('体验流程', 'Experience Process')}</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t('简单四步，轻松开启潜水之旅', 'Four simple steps to your dive adventure')}</p>
          </div>
          <div className="max-w-4xl mx-auto">
            {[
              { step: '01', title: t('预约时间', 'Book a Time'), desc: t('通过电话或微信联系我们，预约您方便的体验时间。我们建议提前1-3天预约。', 'Contact us via phone or WeChat to book your preferred time. We recommend booking 1-3 days in advance.') },
              { step: '02', title: t('理论讲解', 'Theory Briefing'), desc: t('教练为您讲解基本潜水知识、安全须知和装备使用方法。约15-20分钟。', 'Your instructor covers basic diving knowledge, safety rules, and equipment use. About 15-20 minutes.') },
              { step: '03', title: t('装备穿戴', 'Gear Up'), desc: t('教练帮助您穿戴好全套潜水装备，包括潜水服、面镜、呼吸管、脚蹼等。', 'Instructor helps you into full diving gear: wetsuit, mask, snorkel, and fins.') },
              { step: '04', title: t('下水体验', 'Dive In'), desc: t('在教练一对一陪同下开始潜水！探索海底世界，观赏珊瑚和热带鱼，全程约30分钟。', 'Start your dive with 1-on-1 instructor guidance! Explore the underwater world, see coral and tropical fish. Approx. 30 minutes.') },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-[#006994] rounded-full flex items-center justify-center text-white font-bold text-xl">{step}</div>
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
                  <p className="text-gray-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#006994]">{t('体验套餐', 'Experience Packages')}</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t('选择适合您的体验套餐', 'Choose the package that suits you best')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <div key={pkg.name.zh} className={`p-8 rounded-lg ${pkg.highlight ? 'bg-[#006994] text-white relative transform scale-105 shadow-xl' : 'bg-gray-50 border-2 border-gray-200 hover:border-[#006994]'} transition-all duration-300`}>
                {pkg.highlight && pkg.tag && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                    {t(pkg.tag.zh, pkg.tag.en)}
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-4 ${pkg.highlight ? 'text-white' : 'text-gray-800'}`}>{t(pkg.name.zh, pkg.name.en)}</h3>
                <div className={`text-4xl font-bold mb-6 ${pkg.highlight ? 'text-white' : 'text-[#006994]'}`}>{pkg.price}</div>
                <ul className="space-y-3 mb-8">
                  {(isZh ? pkg.items.zh : pkg.items.en).map((item: string) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <span className={pkg.highlight ? 'text-yellow-400' : 'text-green-500'}>✓</span>
                      <span className={pkg.highlight ? 'text-white/90' : 'text-gray-600'}>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/${lang}/contact`} className={`block text-center px-6 py-3 font-bold rounded-lg transition-colors ${pkg.highlight ? 'bg-white text-[#006994] hover:bg-gray-100' : 'bg-[#006994] text-white hover:bg-[#005a7f]'}`}>
                  {t('立即预约', 'Book Now')}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#006994]">{t('常见问题', 'FAQ')}</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map(({ q, a }) => (
              <div key={q.zh} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-800">{t(q.zh, q.en)}</h3>
                <p className="text-gray-600">{t(a.zh, a.en)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#006994] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('准备好开始您的潜水之旅了吗？', 'Ready to Start Your Dive?')}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {t('立即预约，探索神秘的海底世界', 'Book now and explore the mysterious underwater world')}
            </p>
            <Link href={`/${lang}/contact`} className="inline-block px-10 py-5 bg-white text-[#006994] font-bold text-xl rounded-lg hover:bg-gray-100 transition-all shadow-lg">
              {t('联系我们预约', 'Contact Us to Book')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
