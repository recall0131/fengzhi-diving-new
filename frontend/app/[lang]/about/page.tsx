'use client';

import Link from 'next/link';

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <path d="M24 42 C12 30 4 22 4 14 C4 8 8 4 14 4 C18 4 22 6 24 10 C26 6 30 4 34 4 C40 4 44 8 44 14 C44 22 36 30 24 42Z" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.2"/>
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <path d="M24 4 L40 10 L40 22 Q40 36 24 44 Q8 36 8 22 L8 10 Z" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.15"/>
      <path d="M18 24 L22 28 L30 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function InstructorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="16" r="8" stroke="white" strokeWidth="2"/>
      <path d="M12 42 Q12 32 24 32 Q36 32 36 42" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export default function AboutPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang as string) || 'zh';
  const isZh = lang === 'zh';
  const t = (zh: string, en: string) => (isZh ? zh : en);

  return (
    <div className="pt-20">
      <section className="relative py-20 md:py-32 min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1687227693864-7e0d11c2bd5c?w=1920&q=85" alt="About Imperial Diving" className="w-full h-full object-cover object-center"/>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              {t('关于奉旨潜水', 'About Imperial Diving')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              {t('专业潜水服务，用心服务每一位潜水爱好者', 'Professional diving services, dedicated to every diving enthusiast')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#006994]">
              {t('我们的故事', 'Our Story')}
            </h2>
            <div className="prose prose-lg text-gray-700 mb-12">
              <p className="mb-6">
                {t('奉旨潜水成立于2018年，是一家专业的潜水服务提供商。我们的创始团队都是资深潜水爱好者，深知潜水带给人们的快乐和震撼。', 'Founded in 2018, Imperial Diving is a professional diving service provider. Our founding team are all seasoned diving enthusiasts who understand the joy and awe that diving brings.')}
              </p>
              <p className="mb-6">
                {t('多年来，我们始终坚持"安全第一、服务至上"的理念，为超过1000名学员提供了专业的潜水培训和体验服务。我们的教练团队拥有丰富的教学经验，都是PADI认证的专业教练。', 'Over the years, we have adhered to the philosophy of "Safety First, Service Supreme," providing professional diving training and experiences to over 1,000 students. Our instructor team is PADI-certified with extensive teaching experience.')}
              </p>
              <p>
                {t('我们相信，潜水不仅仅是一项运动，更是一种生活态度。通过潜水，人们可以探索未知的世界，感受海洋的壮美，学会尊重和保护我们的蓝色星球。', 'We believe diving is more than a sport — it is a way of life. Through diving, people explore the unknown, feel the grandeur of the ocean, and learn to respect and protect our blue planet.')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center bg-gray-50 p-8 rounded-lg">
                <div className="text-5xl font-bold text-[#006994] mb-2">1000+</div>
                <div className="text-gray-600">{t('学员人数', 'Students Trained')}</div>
              </div>
              <div className="text-center bg-gray-50 p-8 rounded-lg">
                <div className="text-5xl font-bold text-[#006994] mb-2">50+</div>
                <div className="text-gray-600">{t('教练团队', 'Certified Instructors')}</div>
              </div>
              <div className="text-center bg-gray-50 p-8 rounded-lg">
                <div className="text-5xl font-bold text-[#006994] mb-2">6{t('年', '+')}</div>
                <div className="text-gray-600">{t('服务经验', 'Years of Service')}</div>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#006994]">
              {t('我们的使命', 'Our Mission')}
            </h2>
            <div className="prose prose-lg text-gray-700">
              <p className="mb-6">
                {t('我们的使命是让更多人安全、快乐地体验潜水的魅力。我们致力于：', 'Our mission is to help more people safely and happily experience the magic of diving. We are committed to:')}
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>{t('提供专业、安全的潜水培训和体验服务', 'Providing professional, safe diving training and experience services')}</li>
                <li>{t('推广潜水运动，让更多人了解海洋保护的重要性', 'Promoting diving and ocean conservation awareness')}</li>
                <li>{t('培养负责任的潜水员，共同保护海洋环境', 'Cultivating responsible divers committed to protecting the marine environment')}</li>
                <li>{t('打造潜水爱好者社区，分享潜水乐趣', 'Building a diving community to share the joy of diving')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#006994]">
              {t('为什么选择我们', 'Why Choose Us')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#006994] rounded-full flex items-center justify-center mx-auto mb-4">
                <InstructorIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('专业教练', 'Expert Instructors')}</h3>
              <p className="text-gray-600">{t('PADI认证教练，经验丰富，教学专业', 'PADI-certified instructors with extensive teaching experience')}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#006994] rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('安全第一', 'Safety First')}</h3>
              <p className="text-gray-600">{t('严格的安全标准，完善的安全措施', 'Strict safety standards and comprehensive safety protocols')}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#006994] rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('用心服务', 'Dedicated Service')}</h3>
              <p className="text-gray-600">{t('热情周到的服务，让您宾至如归', 'Warm, attentive service that makes you feel at home')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
