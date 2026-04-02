'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const API_BASE = 'https://imperialdiving.lizheng.info/api';

const DEFAULT_HERO_ZH = {
  title: '探索深海',
  subtitle: '从奉旨开始',
  cta_text: '开始潜水之旅',
  cta_link: '/zh/diving-experience',
  cta_secondary_text: '查看课程',
  cta_secondary_link: '/zh/diving-courses',
};

const DEFAULT_HERO_EN = {
  title: 'Explore the Deep',
  subtitle: 'Start with Imperial',
  cta_text: 'Start Your Dive',
  cta_link: '/en/diving-experience',
  cta_secondary_text: 'View Courses',
  cta_secondary_link: '/en/diving-courses',
};

export default function Page({ params }: { params: { lang: string } }) {
  const lang = params.lang || 'zh';
  const [hero, setHero] = useState(lang === 'zh' ? DEFAULT_HERO_ZH : DEFAULT_HERO_EN);
  const [courses, setCourses] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [navItems, setNavItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [heroRes, coursesRes, servicesRes, destRes, navRes] = await Promise.all([
          fetch(`${API_BASE}/heroes?lang=${lang}`),
          fetch(`${API_BASE}/courses?lang=${lang}`),
          fetch(`${API_BASE}/services?lang=${lang}`),
          fetch(`${API_BASE}/destinations?lang=${lang}`),
          fetch(`${API_BASE}/navigation?lang=${lang}`),
        ]);

        const [heroData, coursesData, servicesData, destData, navData] = await Promise.all([
          heroRes.ok ? heroRes.json() : null,
          coursesRes.ok ? coursesRes.json() : [],
          servicesRes.ok ? servicesRes.json() : [],
          destRes.ok ? destRes.json() : [],
          navRes.ok ? navRes.json() : [],
        ]);

        if (heroData) setHero(heroData);
        setCourses(Array.isArray(coursesData) ? coursesData : []);
        setServices(Array.isArray(servicesData) ? servicesData : []);
        setDestinations(Array.isArray(destData) ? destData : []);
        setNavItems(Array.isArray(navData) ? navData : []);
      } catch (e) {
        console.error('API fetch error:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [lang]);

  const t = (zh: string, en: string) => lang === 'zh' ? zh : en;

  return (
    <div>
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-12 flex justify-between items-center h-16">
          <Link href={`/${lang}`} className="flex items-center gap-2 text-sm font-medium text-gray-800">
            <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <ellipse cx="12" cy="7" rx="5" ry="3.5"/>
              <path d="M7 7L5 4M17 7l2-3"/>
              <path d="M12 10.5v6"/>
              <path d="M8 22c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5"/>
            </svg>
            {t('奉旨潜水', 'Imperial Diving')}
          </Link>
          <nav className="flex gap-8">
            {navItems.length > 0 ? navItems.map((n: any, i: number) => (
              <Link key={i} href={n.nav_url || '#'} className="text-sm text-gray-500 hover:text-blue-500 transition-colors">
                {n.nav_name}
              </Link>
            )) : (
              <>
                <Link href={`/${lang}/diving-courses`} className="text-sm text-gray-500 hover:text-blue-500 transition-colors">{t('课程', 'Courses')}</Link>
                <Link href={`/${lang}/destinations`} className="text-sm text-gray-500 hover:text-blue-500 transition-colors">{t('目的地', 'Destinations')}</Link>
                <Link href={`/${lang}/about`} className="text-sm text-gray-500 hover:text-blue-500 transition-colors">{t('关于', 'About')}</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{
        background: `linear-gradient(160deg, rgba(11,111,176,0.78) 0%, rgba(8,85,137,0.68) 100%), url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1800&q=85') center/cover no-repeat fixed`
      }}>
        <div className="container mx-auto px-12 relative z-10">
          <div className="max-w-xl">
            <p className="text-white/60 text-xs uppercase tracking-widest mb-6 font-light">
              {t('PADI 认证潜水中心', 'PADI Certified Dive Center')}
            </p>
            <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
              {hero.title || t('探索深海', 'Explore the Deep')}<br/>
              {hero.subtitle || t('从奉旨开始', 'Start Here')}
            </h1>
            <p className="text-white/70 text-base mb-10 font-light leading-relaxed">
              {t('专业潜水培训 · 全球目的地 · 安全第一', 'Professional Training · Global Destinations · Safety First')}
            </p>
            <div className="flex gap-3">
              <Link href={hero.cta_link || `/${lang}/diving-courses`} className="inline-block px-10 py-4 bg-white text-blue-600 font-light text-sm rounded-sm hover:bg-gray-100 transition-all">
                {hero.cta_text || t('开始潜水之旅', 'Start Your Dive')}
              </Link>
              <Link href={hero.cta_secondary_link || `/${lang}/diving-experience`} className="inline-block px-10 py-4 bg-white/10 backdrop-blur-sm text-white font-light text-sm rounded-sm border border-white/30 hover:bg-white/20 transition-all">
                {hero.cta_secondary_text || t('联系我们', 'Contact Us')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-3 divide-x divide-gray-200">
          {[
            { num: '1000+', label: t('学员人数', 'Students') },
            { num: '50+', label: t('认证教练', 'Instructors') },
            { num: '6年', label: t('教学经验', 'Years Experience') },
          ].map((s, i) => (
            <div key={i} className="py-14 px-8 text-center">
              <div className="text-4xl font-light text-blue-500 mb-2" style={{ letterSpacing: '-0.02em' }}>{s.num}</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-12">
          <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-3">{t('What we offer', 'What we offer')}</p>
          <h2 className="text-center text-3xl font-light text-gray-800 mb-14" style={{ letterSpacing: '-0.01em' }}>
            {t('我们的服务', 'Our Services')}
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {services.length > 0 ? services.slice(0, 3).map((s: any, i: number) => (
              <div key={i} className="border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: s.feature_image ? `url('${s.feature_image}')` : `url('https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&q=80')` }} />
                <div className="p-7">
                  <h3 className="text-base font-light text-gray-800 mb-3">{s.feature_title}</h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">{s.feature_description}</p>
                </div>
              </div>
            )) : (
              <>
                {[
                  { title: t('潜水体验', 'Dive Experience'), desc: t('专业教练陪同，安全探索海底世界。无需证书，初次体验最佳选择。', 'Guided by professional instructors. No certificate needed.'), img: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&q=80' },
                  { title: t('潜水课程', 'Dive Courses'), desc: t('PADI、SSI、NAUI 多体系认证，从入门到专业一站式培训。', 'Multi-system certification from beginner to professional.'), img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80' },
                  { title: t('潜水旅行', 'Dive Travel'), desc: t('精选全球顶级潜水目的地，一站式服务省心无忧。', 'Curated global dive destinations with full-service packages.'), img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80' },
                ].map((s, i) => (
                  <div key={i} className="border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${s.img}')` }} />
                    <div className="p-7">
                      <h3 className="text-base font-light text-gray-800 mb-3">{s.title}</h3>
                      <p className="text-sm text-gray-500 font-light leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-12">
          <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-3">{t('Our Programs', 'Our Programs')}</p>
          <h2 className="text-center text-3xl font-light text-gray-800 mb-14" style={{ letterSpacing: '-0.01em' }}>
            {t('热门课程', 'Popular Courses')}
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {courses.length > 0 ? courses.slice(0, 3).map((c: any, i: number) => (
              <div key={i} className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="h-44 bg-cover bg-center relative" style={{ backgroundImage: c.course_image ? `url('${c.course_image}')` : `url('https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&q=80')` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/60 to-transparent" />
                  {c.course_tag && (
                    <div className="absolute bottom-4 left-4 bg-white text-blue-500 text-xs px-3 py-1 rounded-sm font-light">
                      {c.course_tag}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-base font-light text-gray-800 mb-2">{c.course_name}</h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed mb-5">{c.course_description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 font-light">{c.course_days || t('天', 'days')}</span>
                    <span className="text-base text-blue-500">{c.course_price || t('价格电询', 'Price on inquiry')}</span>
                  </div>
                </div>
              </div>
            )) : (
              <>
                {[
                  { name: 'OW ' + t('开放水域潜水员', 'Open Water Diver'), tag: t('零基础', 'Beginner'), desc: t('入门课程，最大深度18米，获得PADI全球认证证书。', 'Entry-level course, max depth 18m, PADI certified.'), price: '¥2,800', days: t('4天', '4 days'), img: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&q=80' },
                  { name: 'AOW ' + t('进阶开放水域', 'Advanced Open Water'), tag: t('进阶', 'Intermediate'), desc: t('提升技能，深度30米，夜潜、深潜、沉船潜等。', 'Advanced skills, 30m depth, night & wreck dives.'), price: '¥2,200', days: t('3天', '3 days'), img: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&q=80' },
                  { name: 'Rescue ' + t('救援潜水员', 'Rescue Diver'), tag: t('高级', 'Advanced'), desc: t('学习紧急救援，提升安全意识，自救互救能力。', 'Emergency rescue skills and safety awareness.'), price: '¥1,800', days: t('5天', '5 days'), img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80' },
                ].map((c, i) => (
                  <div key={i} className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="h-44 bg-cover bg-center relative" style={{ backgroundImage: `url('${c.img}')` }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 bg-white text-blue-500 text-xs px-3 py-1 rounded-sm font-light">{c.tag}</div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-base font-light text-gray-800 mb-2">{c.name}</h3>
                      <p className="text-sm text-gray-500 font-light leading-relaxed mb-5">{c.desc}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400 font-light">{c.days}</span>
                        <span className="text-base text-blue-500">{c.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="text-center mt-10">
            <Link href={`/${lang}/diving-courses`} className="text-sm text-blue-500 hover:text-blue-600 font-light tracking-wide">
              {t('查看全部课程 →', 'View all courses →')}
            </Link>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-12">
          <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-3">{t('Top Destinations', 'Top Destinations')}</p>
          <h2 className="text-center text-3xl font-light text-gray-800 mb-14" style={{ letterSpacing: '-0.01em' }}>
            {t('热门目的地', 'Popular Destinations')}
          </h2>
          <div className="grid grid-cols-5 gap-4">
            {destinations.length > 0 ? destinations.slice(0, 10).map((d: any, i: number) => (
              <div key={i} className="border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
                <div className="h-28 bg-cover bg-center" style={{ backgroundImage: d.dest_image ? `url('${d.dest_image}')` : `url('https://images.unsplash.com/photo-1516934024742-b461fba47600?w=400&q=80')` }} />
                <div className="p-3">
                  <h3 className="text-sm font-light text-gray-800 mb-1">{d.dest_name}</h3>
                  <p className="text-xs text-gray-400 font-light">{d.dest_tag || ''}</p>
                </div>
              </div>
            )) : (
              <>
                {[
                  { name: t('帕劳', 'Palau'), tag: t('蓝洞 · 海洋生物', 'Blue Hole'), img: 'https://images.unsplash.com/photo-1516934024742-b461fba47600?w=400&q=80' },
                  { name: t('马尔代夫', 'Maldives'), tag: t('珊瑚礁 · 热带天堂', 'Coral Reef'), img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80' },
                  { name: t('大堡礁', 'Great Barrier Reef'), tag: t('珊瑚系统', 'Coral System'), img: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400&q=80' },
                  { name: t('印度尼西亚', 'Indonesia'), tag: t('珊瑚三角区', 'Coral Triangle'), img: 'https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?w=400&q=80' },
                  { name: t('菲律宾', 'Philippines'), tag: t('鲸鲨 · 微距', 'Whale Shark'), img: 'https://images.unsplash.com/photo-1559008010-1f2e9b7d9b5a?w=400&q=80' },
                  { name: t('马来西亚', 'Malaysia'), tag: t('诗巴丹', 'Sipadan'), img: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&q=80' },
                  { name: t('墨西哥', 'Mexico'), tag: t('坎昆 · 洞穴', 'Cenotes'), img: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=400&q=80' },
                  { name: t('厄瓜多尔', 'Ecuador'), tag: t('加拉帕戈斯', 'Galapagos'), img: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80' },
                  { name: t('中国', 'China'), tag: t('海南岛 · 西沙', 'Hainan'), img: 'https://images.unsplash.com/photo-1531761535209-180857e963b9?w=400&q=80' },
                  { name: t('美国', 'USA'), tag: t('夏威夷', 'Hawaii'), img: 'https://images.unsplash.com/photo-1504681869696-d977211a5f4c?w=400&q=80' },
                ].map((d, i) => (
                  <div key={i} className="border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
                    <div className="h-28 bg-cover bg-center" style={{ backgroundImage: `url('${d.img}')` }} />
                    <div className="p-3">
                      <h3 className="text-sm font-light text-gray-800 mb-1">{d.name}</h3>
                      <p className="text-xs text-gray-400 font-light">{d.tag}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="text-center mt-10">
            <Link href={`/${lang}/destinations`} className="text-sm text-blue-500 hover:text-blue-600 font-light tracking-wide">
              {t('查看全部目的地 →', 'View all destinations →')}
            </Link>
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="bg-gray-900 text-white text-center py-24">
        <div className="max-w-lg mx-auto px-8">
          <div className="flex items-center justify-center gap-2 text-white/40 text-xs uppercase tracking-widest mb-5">
            <svg className="w-3.5 h-3.5 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            {t('安全第一', 'Safety First')}
          </div>
          <h2 className="text-3xl font-light mb-5" style={{ letterSpacing: '-0.01em' }}>
            {t('你的安全是我们的', 'Your Safety is Our')}<br/>
            {t('首要责任', 'Top Priority')}
          </h2>
          <p className="text-white/40 text-sm font-light leading-8">
            {t('小班教学 · 国际标准 · 严格认证', 'Small Classes · International Standards · Strict Certification')}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-500 text-white text-center py-24">
        <h2 className="text-3xl font-light mb-3" style={{ letterSpacing: '-0.01em' }}>
          {t('准备好潜入深海了吗？', 'Ready to Dive In?')}
        </h2>
        <p className="text-white/70 text-sm font-light mb-10">
          {t('立即咨询，开启你的潜水之旅', 'Contact us to start your dive journey')}
        </p>
        <Link href={`/${lang}/contact`} className="inline-block px-12 py-4 bg-white text-blue-500 font-light text-sm rounded-sm hover:bg-gray-100 transition-all" style={{ letterSpacing: '0.04em' }}>
          {t('立即报名', 'Sign Up Now')}
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-12">
          <div className="flex justify-between items-start mb-10">
            <div className="flex items-center gap-2 text-sm font-light text-gray-800">
              <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <ellipse cx="12" cy="7" rx="5" ry="3.5"/>
                <path d="M12 10.5v6"/>
                <path d="M8 22c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5"/>
              </svg>
              {t('奉旨潜水', 'Imperial Diving')}
            </div>
            <div className="flex gap-16 text-sm">
              {[
                [t('课程', 'Courses'), `/${lang}/diving-courses`],
                [t('目的地', 'Destinations'), `/${lang}/destinations`],
                [t('关于', 'About'), `/${lang}/about`],
                [t('联系', 'Contact'), `/${lang}/contact`],
              ].map(([label, href], i) => (
                <Link key={i} href={href as string} className="text-gray-500 font-light hover:text-blue-500 transition-colors text-xs">
                  {label as string}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-center text-gray-400 text-xs border-t border-gray-100 pt-6">
            © 2024 {t('奉旨潜水', 'Imperial Diving')} · PADI {t('国际认证潜水中心', 'Certified Dive Center')}
          </div>
        </div>
      </footer>
    </div>
  );
}
