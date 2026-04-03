'use client';

import Link from 'next/link';

function BlueHoleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="35" stroke="white" strokeWidth="2" opacity="0.3"/>
      <circle cx="40" cy="40" r="25" stroke="white" strokeWidth="2" opacity="0.5"/>
      <circle cx="40" cy="40" r="15" stroke="white" strokeWidth="2" opacity="0.8"/>
      <circle cx="40" cy="40" r="5" fill="white" opacity="0.9"/>
    </svg>
  );
}

function IslandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none">
      <path d="M15 55 Q40 45 65 55 Q65 65 40 65 Q15 65 15 55Z" fill="white" opacity="0.8"/>
      <path d="M40 55 L40 25 M35 30 Q40 25 45 30" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="40" cy="23" rx="12" ry="8" fill="white" opacity="0.5"/>
      <path d="M10 65 Q40 60 70 65" stroke="white" strokeWidth="1.5" opacity="0.3"/>
    </svg>
  );
}

function CoralIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none">
      <path d="M40 70 L40 40" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
      <path d="M40 50 Q30 45 25 35 Q22 28 28 25" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
      <path d="M40 45 Q50 40 55 30 Q58 23 52 20" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
      <ellipse cx="28" cy="25" rx="6" ry="4" fill="white" opacity="0.4"/>
      <ellipse cx="52" cy="20" rx="6" ry="4" fill="white" opacity="0.4"/>
    </svg>
  );
}

function ShipwreckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none">
      <path d="M10 50 Q20 40 40 42 Q60 44 70 50" stroke="white" strokeWidth="2" fill="none" opacity="0.8"/>
      <path d="M40 42 L40 25 L50 30 Z" stroke="white" strokeWidth="1.5" fill="white" fillOpacity="0.3"/>
      <path d="M5 50 Q10 55 20 55 L60 55 Q70 55 75 50" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5"/>
    </svg>
  );
}

function WhaleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none">
      <path d="M10 45 Q20 35 40 38 Q60 41 70 45 Q65 50 60 50 Q50 52 40 50 Q20 55 10 50 Z" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.2"/>
      <circle cx="30" cy="42" r="2" fill="white"/>
    </svg>
  );
}

function PalmIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none">
      <path d="M40 70 L40 35" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M40 35 Q30 25 20 28" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 35 Q50 25 60 28" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 35 Q35 22 28 18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 35 Q45 22 52 18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="40" cy="72" rx="15" ry="4" fill="white" opacity="0.3"/>
    </svg>
  );
}

const destinations = [
  {
    name: { zh: '帕劳蓝洞', en: 'Palau Blue Hole' },
    href: '/zh/destinations/palau',
    desc: { zh: '世界顶级潜水圣地，壮观的蓝洞和丰富的海洋生物', en: 'World-class dive site: spectacular blue hole & rich marine life' },
    gradient: 'from-[#006994] to-[#004d6b]',
    Icon: BlueHoleIcon,
  },
  {
    name: { zh: '马尔代夫', en: 'Maldives' },
    href: '/zh/destinations/maldives',
    desc: { zh: '热带天堂，清澈的海水和绚丽的珊瑚礁', en: 'Tropical paradise with crystal-clear waters & coral reefs' },
    gradient: 'from-[#008B8B] to-[#005f5f]',
    Icon: IslandIcon,
  },
  {
    name: { zh: '大堡礁', en: 'Great Barrier Reef' },
    href: '/zh/destinations/great-barrier-reef',
    desc: { zh: '世界最大的珊瑚礁系统，独特的海洋生态系统', en: 'World\'s largest coral reef system with unique marine ecosystem' },
    gradient: 'from-[#006994] to-[#003d52]',
    Icon: CoralIcon,
  },
  {
    name: { zh: '科隆沉船', en: 'Coron Shipwrecks' },
    href: '/zh/destinations/coron',
    desc: { zh: '菲律宾巴拉望，二战沉船潜水的终极目的地', en: 'Palawan, Philippines: the ultimate WWII shipwreck diving destination' },
    gradient: 'from-[#4A5568] to-[#2D3748]',
    Icon: ShipwreckIcon,
  },
  {
    name: { zh: '冲绳', en: 'Okinawa' },
    href: '/zh/destinations/okinawa',
    desc: { zh: '日本 Okinawa，青洞蓝光与座头鲸同游', en: 'Japan: Blue Hole magic & humpback whale encounters' },
    gradient: 'from-[#3182CE] to-[#2B6CB0]',
    Icon: WhaleIcon,
  },
  {
    name: { zh: '三亚', en: 'Sanya' },
    href: '/zh/destinations/sanya',
    desc: { zh: '中国海南，离家最近的潜水天堂', en: 'Hainan, China: the closest dive paradise to home' },
    gradient: 'from-[#38A169] to-[#276749]',
    Icon: PalmIcon,
  },
];

export default function DestinationsPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang as string) || 'zh';
  const isZh = lang === 'zh';
  const t = (zh: string, en: string) => (isZh ? zh : en);

  return (
    <div className="pt-20">
      <section className="relative py-20 md:py-32 bg-[#006994] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('潜水目的地', 'Diving Destinations')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {t('探索世界顶级潜水圣地', 'Explore the World\'s Top Dive Destinations')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map(({ name, href, desc, gradient, Icon }) => (
              <Link key={name.zh} href={`/${lang}/destinations/${href.split('/').pop()}`} className="group">
                <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-72">
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className="w-24 h-24" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{t(name.zh, name.en)}</h3>
                    <p className="text-white/80 text-sm">{t(desc.zh, desc.en)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
