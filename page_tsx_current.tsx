'use client';

import Link from 'next/link';

export default function Page() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1800&q=85')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#006994]/80 to-[#005a7f]/60" />
        <div className="relative z-10 container mx-auto px-12">
          <div className="max-w-xl">
            <p className="text-white/60 text-xs uppercase tracking-[0.25em] mb-6 font-light">
              PADI 认证潜水中心
            </p>
            <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-[1.05]" style={{ letterSpacing: '-0.02em' }}>
              探索深海<br />从奉旨开始
            </h1>
            <p className="text-white/70 text-base mb-10 font-light leading-relaxed">
              专业潜水培训 · 全球目的地 · 安全第一
            </p>
            <Link
              href="/zh/diving-courses"
              className="inline-block px-10 py-4 bg-white text-[#006994] font-light text-sm rounded-sm hover:bg-gray-100 transition-all duration-300"
              style={{ letterSpacing: '0.04em' }}
            >
              查看课程
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#f7f7f7] border-t border-[#ebebeb]">
        <div className="grid grid-cols-3 divide-x divide-[#ebebeb]">
          {[
            { num: '1000+', label: '学员人数' },
            { num: '50+', label: '认证教练' },
            { num: '6年', label: '教学经验' },
          ].map((s, i) => (
            <div key={i} className="py-14 px-8 text-center">
              <div className="text-4xl font-light text-[#006994] mb-2" style={{ letterSpacing: '-0.02em' }}>
                {s.num}
              </div>
              <div className="text-[#999] text-xs uppercase tracking-[0.1em]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-12">
          <p className="text-center text-xs text-[#999] uppercase tracking-[0.2em] mb-3">What we offer</p>
          <h2 className="text-center text-3xl font-light text-[#1a1a1a] mb-14" style={{ letterSpacing: '-0.01em' }}>
            我们的服务
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                img: "url('https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&q=80')",
                title: '潜水体验',
                desc: '专业教练陪同，安全探索海底世界。无需证书，初次体验最佳选择。',
              },
              {
                img: "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80')",
                title: '潜水课程',
                desc: 'PADI、SSI、NAUI 多体系认证，从入门到专业一站式培训。',
              },
              {
                img: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80')",
                title: '潜水旅行',
                desc: '精选全球顶级潜水目的地，一站式服务省心无忧。',
              },
            ].map((s, i) => (
              <div key={i} className="border border-[#ebebeb] overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: s.img }} />
                <div className="p-7">
                  <h3 className="text-base font-light text-[#1a1a1a] mb-3">{s.title}</h3>
                  <p className="text-sm text-[#666] font-light leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-24 bg-[#f7f7f7] border-t border-[#ebebeb]">
        <div className="container mx-auto px-12">
          <p className="text-center text-xs text-[#999] uppercase tracking-[0.2em] mb-3">Our Programs</p>
          <h2 className="text-center text-3xl font-light text-[#1a1a1a] mb-14" style={{ letterSpacing: '-0.01em' }}>
            热门课程
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                img: "url('https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&q=80')",
                tag: '零基础',
                title: 'OW 开放水域潜水员',
                desc: '入门课程，最大深度18米，获得PADI全球认证证书。',
                price: '¥2,800',
                days: '4天',
              },
              {
                img: "url('https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&q=80')",
                tag: '进阶',
                title: 'AOW 进阶开放水域',
                desc: '提升技能，深度30米，夜潜、深潜、沉船潜等精彩项目。',
                price: '¥2,200',
                days: '3天',
              },
              {
                img: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80')",
                tag: '高级',
                title: 'Rescue 救援潜水员',
                desc: '学习紧急救援，提升安全意识，自救互救能力。',
                price: '¥1,800',
                days: '5天',
              },
            ].map((c, i) => (
              <div key={i} className="bg-white border border-[#ebebeb] overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="h-44 bg-cover bg-center relative" style={{ backgroundImage: c.img }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#006994]/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-white text-[#006994] text-xs px-3 py-1 rounded-sm font-light">
                    {c.tag}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-base font-light text-[#1a1a1a] mb-2">{c.title}</h3>
                  <p className="text-sm text-[#666] font-light leading-relaxed mb-5">{c.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#999] font-light">{c.days}</span>
                    <span className="text-base text-[#006994]">{c.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations - 5 col grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-12">
          <p className="text-center text-xs text-[#999] uppercase tracking-[0.2em] mb-3">Top Destinations</p>
          <h2 className="text-center text-3xl font-light text-[#1a1a1a] mb-14" style={{ letterSpacing: '-0.01em' }}>
            热门目的地
          </h2>
          <div className="grid grid-cols-5 gap-4">
            {[
              { title: '帕劳', tag: '蓝洞 · 海洋生物', img: "url('https://images.unsplash.com/photo-1516934024742-b461fba47600?w=400&q=80')" },
              { title: '马尔代夫', tag: '珊瑚礁 · 热带天堂', img: "url('https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80')" },
              { title: '大堡礁', tag: '珊瑚系统 · 世界最大', img: "url('https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400&q=80')" },
              { title: '印度尼西亚', tag: '珊瑚三角区 · 潜点最多', img: "url('https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?w=400&q=80')" },
              { title: '菲律宾', tag: '鲸鲨 · 微距天堂', img: "url('https://images.unsplash.com/photo-1559008010-1f2e9b7d9b5a?w=400&q=80')" },
              { title: '马来西亚', tag: '诗巴丹 · 沙巴', img: "url('https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&q=80')" },
              { title: '墨西哥', tag: '坎昆 · 洞穴潜水', img: "url('https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=400&q=80')" },
              { title: '厄瓜多尔', tag: '加拉帕戈斯 · 海洋巨兽', img: "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80')" },
              { title: '中国', tag: '海南岛 · 西沙群岛', img: "url('https://images.unsplash.com/photo-1531761535209-180857e963b9?w=400&q=80')" },
              { title: '美国', tag: '夏威夷 · 加州', img: "url('https://images.unsplash.com/photo-1504681869696-d977211a5f4c?w=400&q=80')" },
              { title: '埃及', tag: '红海 · 沉船', img: "url('https://images.unsplash.com/photo-1539768942893-daf53e448371?w=400&q=80')" },
              { title: '斐济', tag: '软珊瑚 · 鲨鱼潜', img: "url('https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400&q=80')" },
              { title: '塞舌尔', tag: '印度洋 · 顶级潜点', img: "url('https://images.unsplash.com/photo-1589979481223-deb893043163?w=400&q=80')" },
            ].map((d, i) => (
              <div key={i} className="border border-[#ebebeb] overflow-hidden hover:shadow-md transition-all duration-300">
                <div className="h-28 bg-cover bg-center" style={{ backgroundImage: d.img }} />
                <div className="p-3">
                  <h3 className="text-sm font-light text-[#1a1a1a] mb-1">{d.title}</h3>
                  <p className="text-xs text-[#999] font-light">{d.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety - dark section */}
      <section className="bg-[#1a1a1a] text-white text-center py-24">
        <div className="max-w-lg mx-auto px-8">
          <div className="flex items-center justify-center gap-2 text-white/40 text-xs uppercase tracking-[0.15em] mb-5">
            <svg className="w-3.5 h-3.5 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            安全第一
          </div>
          <h2 className="text-3xl font-light mb-5" style={{ letterSpacing: '-0.01em' }}>
            你的安全是我们的<br />首要责任
          </h2>
          <p className="text-white/40 text-sm font-light leading-[2]">
            小班教学 · 国际标准 · 严格认证
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#006994] text-white text-center py-24">
        <h2 className="text-3xl font-light mb-3" style={{ letterSpacing: '-0.01em' }}>
          准备好潜入深海了吗？
        </h2>
        <p className="text-white/70 text-sm font-light mb-10">
          立即咨询，开启你的潜水之旅
        </p>
        <Link
          href="#"
          className="inline-block px-12 py-4 bg-white text-[#006994] font-light text-sm rounded-sm hover:bg-gray-100 transition-all duration-300"
          style={{ letterSpacing: '0.04em' }}
        >
          立即报名
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#ebebeb] py-12">
        <div className="container mx-auto px-12">
          <div className="flex justify-between items-start mb-10">
            <div className="flex items-center gap-2 text-sm font-light text-[#1a1a1a]">
              <svg className="w-4 h-4 text-[#006994]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <ellipse cx="12" cy="7" rx="5" ry="3.5"/>
                <path d="M12 10.5v6"/>
                <path d="M8 22c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5"/>
              </svg>
              奉旨潜水
            </div>
            <div className="flex gap-16 text-sm">
              {['课程', '目的地', '关于', '联系'].map((l, i) => (
                <a key={i} href="#" className="text-[#666] font-light hover:text-[#006994] transition-colors text-xs">
                  {l}
                </a>
              ))}
            </div>
          </div>
          <div className="text-center text-[#999] text-xs border-t border-[#ebebeb] pt-6">
            © 2024 奉旨潜水 Imperial Diving · PADI国际认证潜水中心
          </div>
        </div>
      </footer>
    </div>
  );
}
