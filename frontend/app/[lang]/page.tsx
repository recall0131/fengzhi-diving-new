'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

const API_BASE = 'https://imperialdiving.lizheng.info/api';

export default function Page() {
  const params = useParams();
  const lang = (params.lang as string) || 'zh';
  const t = (zh: string, en: string) => lang === 'zh' ? zh : en;

  const services = [
    { title: t('潜水体验', 'Dive Experience'), desc: t('专业教练陪同，安全探索海底世界。无需证书，初次体验最佳选择。', 'Professional instructors, safe ocean exploration. No certification needed.'), img: '/images/hero-diver.jpg' },
    { title: t('潜水课程', 'Dive Courses'), desc: t('PADI、SSI、NAUI 多体系认证，从入门到专业一站式培训。', 'Multi-system certification: PADI, SSI, NAUI. Beginner to professional.'), img: '/images/hero-okinawa.jpg' },
    { title: t('潜水旅行', 'Dive Travel'), desc: t('精选全球顶级潜水目的地，一站式服务省心无忧。', 'Curated world-class destinations. Full-service packages.'), img: '/images/hero-tropical.jpg' },
  ];

  const courses = [
    { name: t('PADI 开放水域潜水员', 'PADI Open Water Diver'), tag: t('零基础', 'Beginner'), desc: t('入门课程，最大深度18米，获得PADI全球认证证书。', 'Entry-level course, max depth 18m, PADI certified worldwide.'), price: '¥2,800', days: t('4天', '4 days'), img: '/images/hero-instructor.jpg' },
    { name: t('PADI 进阶开放水域', 'PADI Advanced Open Water'), tag: t('进阶', 'Intermediate'), desc: t('提升技能，深度30米，夜潜、深潜、沉船潜等。', 'Depth to 30m. Night, deep & wreck diving.',), price: '¥2,200', days: t('3天', '3 days'), img: '/images/course-aow.jpg' },
    { name: t('PADI 救援潜水员', 'PADI Rescue Diver'), tag: t('进阶', 'Advanced'), desc: t('学习紧急救援，提升安全意识，自救互救能力。', 'Emergency rescue skills, safety awareness.'), price: '¥1,800', days: t('5天', '5 days'), img: '/images/hero-rescue.jpg' },
  ];

  const destinations = [
    { name: t('马尔代夫', 'Maldives'), tag: t('珊瑚礁 · 热带天堂', 'Coral Reef · Paradise'), img: '/images/hero-maldives.jpg' },
    { name: t('帕劳', 'Palau'), tag: t('蓝洞 · 海洋生物', 'Blue Hole · Marine Life'), img: '/images/dest-palau.jpg' },
    { name: t('大堡礁', 'Great Barrier Reef'), tag: t('珊瑚系统', 'World Largest Coral'), img: '/images/dest-gbr.jpg' },
    { name: t('印度尼西亚', 'Indonesia'), tag: t('珊瑚三角区', 'Coral Triangle'), img: '/images/hero-coron.jpg' },
    { name: t('菲律宾', 'Philippines'), tag: t('鲸鲨 · 微距', 'Whale Shark · Macro'), img: '/images/dest-philippines.jpg' },
    { name: t('马来西亚', 'Malaysia'), tag: t('诗巴丹', 'Sipadan'), img: '/images/dest-malaysia.jpg' },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── PADI style: full-bleed image, centered text overlay */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-diver.jpg"
            alt="Diver"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-white/70 text-xs uppercase tracking-[0.25em] mb-6 font-medium">
            {t('PADI 认证潜水中心', 'PADI Certified Dive Center')}
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-none tracking-tight">
            {t('探索深海', 'Explore the Deep')}
          </h1>
          <h2 className="text-2xl md:text-3xl font-light text-white/90 mb-10 tracking-wide">
            {t('从奉旨开始', 'Start with Imperial Diving')}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${lang}/diving-courses`} className="px-10 py-4 bg-[#008ECC] text-white text-sm font-medium rounded-sm hover:bg-[#0077aa] transition-colors tracking-wider">
              {t('开始潜水课程', 'Start Your Course')}
            </Link>
            <Link href={`/${lang}/contact`} className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-sm border border-white/40 hover:bg-white/20 transition-colors tracking-wider">
              {t('立即咨询', 'Contact Us')}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs tracking-widest uppercase">{t('向下', 'Scroll')}</span>
          <div className="w-px h-8 bg-white/30" />
        </div>
      </section>

      {/* ── STATS ── clean horizontal strip */}
      <section className="bg-[#008ECC]">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid grid-cols-3 divide-x divide-white/20">
            {[
              { num: '1000+', label: t('学员人数', 'Certified Students') },
              { num: '50+', label: t('认证教练', 'PADI Instructors') },
              { num: lang === 'zh' ? '6年+' : '6+', label: t('教学经验', 'Years of Experience') },
            ].map((s, i) => (
              <div key={i} className="py-12 px-10 text-center">
                <div className="text-4xl font-bold text-white mb-2 tracking-tight">{s.num}</div>
                <div className="text-xs text-white/60 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── 3-col grid, image + text */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-[#008ECC] text-xs uppercase tracking-[0.2em] mb-3 font-medium">{t('What We Offer', 'What We Offer')}</p>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">{t('我们的服务', 'Our Services')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <Link key={i} href={`/${lang}/diving-experience`} className="group block bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#008ECC] transition-colors">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                  <span className="inline-block mt-4 text-[#008ECC] text-xs font-medium uppercase tracking-wider group-hover:underline">
                    {t('了解更多 →', 'Learn More →')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSES ── PADI card style */}
      <section className="py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-[#008ECC] text-xs uppercase tracking-[0.2em] mb-3 font-medium">{t('Certification Programs', 'Certification Programs')}</p>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">{t('热门课程', 'Popular Courses')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((c, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="relative aspect-video overflow-hidden">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-[#008ECC] text-white text-xs font-medium px-3 py-1.5 rounded-sm uppercase tracking-wider">
                    {c.tag}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{c.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">{c.desc}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">{c.days}</span>
                    <span className="text-xl font-bold text-[#008ECC]">{c.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link href={`/${lang}/diving-courses`} className="inline-block text-sm font-medium text-[#008ECC] border border-[#008ECC] px-8 py-3 rounded-sm hover:bg-[#008ECC] hover:text-white transition-all">
              {t('查看全部课程 →', 'View All Courses →')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ── 6-col photo grid */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-[#008ECC] text-xs uppercase tracking-[0.2em] mb-3 font-medium">{t('Explore the World', 'Explore the World')}</p>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">{t('热门目的地', 'Top Destinations')}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {destinations.map((d, i) => (
              <Link key={i} href={`/${lang}/destinations`} className="group relative aspect-[4/3] overflow-hidden rounded-sm">
                <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="text-white font-bold text-base">{d.name}</h3>
                  <p className="text-white/60 text-xs mt-1">{d.tag}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAFETY BANNER ── dark full-bleed */}
      <section className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a2d46 0%, #0d4f6e 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <img src="/images/hero-instructor.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-8 text-center">
          <div className="flex items-center justify-center gap-2 text-white/40 text-xs uppercase tracking-[0.2em] mb-6">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            {t('安全承诺', 'Safety Commitment')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            {t('你的安全是我们的', 'Your Safety is Our')}<br/>
            {t('首要责任', 'Top Priority')}
          </h2>
          <p className="text-white/60 text-sm font-light leading-relaxed max-w-lg mx-auto mb-10">
            {t('小班教学 · 国际标准 · 严格认证', 'Small Classes · International Standards · Strict Certification')}
          </p>
          <Link href={`/${lang}/about`} className="inline-block px-10 py-4 bg-white text-[#0a2d46] text-sm font-bold rounded-sm hover:bg-gray-100 transition-colors">
            {t('了解更多', 'Learn More')}
          </Link>
        </div>
      </section>

      {/* ── CTA ── bold blue */}
      <section className="bg-[#008ECC] py-24">
        <div className="max-w-2xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
            {t('准备好潜入深海了吗？', 'Ready to Dive In?')}
          </h2>
          <p className="text-white/70 text-base font-light mb-10">
            {t('立即咨询，开启你的潜水之旅', 'Contact us to start your diving journey')}
          </p>
          <Link href={`/${lang}/contact`} className="inline-block px-12 py-4 bg-white text-[#008ECC] text-sm font-bold rounded-sm hover:bg-gray-100 transition-colors tracking-wider">
            {t('立即报名', 'Sign Up Now')} →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-6 h-6 text-[#008ECC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <ellipse cx="12" cy="7" rx="5" ry="3.5"/>
                  <path d="M7 7L5 4M17 7l2-3"/>
                  <path d="M12 10.5v6"/>
                  <path d="M8 22c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5"/>
                </svg>
                <span className="font-bold text-white">{t('奉旨潜水', 'Imperial Diving')}</span>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
                {t('PADI 国际认证潜水中心，专业潜水培训与旅行服务', 'PADI Certified Dive Center. Professional training & travel.')}
              </p>
            </div>
            <div className="flex gap-12 text-sm">
              {[
                [t('课程', 'Courses'), `/${lang}/diving-courses`],
                [t('目的地', 'Destinations'), `/${lang}/destinations`],
                [t('关于', 'About'), `/${lang}/about`],
                [t('联系', 'Contact'), `/${lang}/contact`],
              ].map(([label, href], i) => (
                <Link key={i} href={href as string} className="text-gray-400 hover:text-white transition-colors text-sm">
                  {label as string}
                </Link>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-600 text-xs">
            © {new Date().getFullYear()} {t('奉旨潜水', 'Imperial Diving')} · PADI {t('国际认证潜水中心', 'Certified Dive Center')}
          </div>
        </div>
      </footer>
    </div>
  );
}
