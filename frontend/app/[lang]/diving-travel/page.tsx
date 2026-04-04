'use client';

import { useParams } from 'next/navigation';
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

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="2" opacity="0.4"/>
      <circle cx="24" cy="24" r="13" stroke="white" strokeWidth="2" opacity="0.6"/>
      <circle cx="24" cy="24" r="6" stroke="white" strokeWidth="2" opacity="0.8"/>
      <circle cx="24" cy="24" r="2" fill="white"/>
    </svg>
  );
}

function HotelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect x="8" y="18" width="32" height="22" rx="2" stroke="white" strokeWidth="2"/>
      <path d="M8 22 L24 12 L40 22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <rect x="14" y="26" width="5" height="5" rx="0.5" fill="white" opacity="0.7"/>
      <rect x="21.5" y="26" width="5" height="5" rx="0.5" fill="white" opacity="0.7"/>
      <rect x="29" y="26" width="5" height="5" rx="0.5" fill="white" opacity="0.7"/>
      <rect x="19" y="33" width="10" height="7" rx="1" stroke="white" strokeWidth="1.5"/>
    </svg>
  );
}

function PriceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="18" stroke="white" strokeWidth="2" opacity="0.4"/>
      <path d="M24 14 L24 34 M20 18 Q20 14 24 14 Q28 14 28 18 Q28 22 24 24 Q28 26 28 30 Q28 34 24 34 Q20 34 20 30" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export default function DivingTravelPage() {
  const params = useParams();

  const lang = (params.lang as string) || 'zh';
  const isZh = lang === 'zh';
  const t = (zh: string, en: string) => (isZh ? zh : en);
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero-tropical.jpg" alt="Dive Travel" className="w-full h-full object-cover object-center"/>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('潜水旅行', 'Dive Travel')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {t('探索世界顶级潜水目的地', 'Explore World-Class Dive Destinations')}
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              {t('我们精选全球最棒的潜水圣地，提供一站式潜水旅行服务。从热带天堂到神秘沉船，带您探索深蓝的无限魅力。', 'We curate the world\'s best diving destinations with all-inclusive travel packages. From tropical paradises to mysterious shipwrecks — discover the magic of the deep.')}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#006994]">
              热门目的地
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              精选全球顶级潜水圣地
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/zh/destinations/palau" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="h-72 bg-gradient-to-br from-[#006994] to-[#004d6b] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <BlueHoleIcon className="w-32 h-32" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{t('帕劳蓝洞', 'Palau Blue Hole')}</h3>
                  <p className="text-white/80 text-sm">{t('世界顶级潜水圣地，壮观的蓝洞和丰富的海洋生物', 'World-class site: spectacular blue hole and abundant marine life')}</p>
                </div>
              </div>
            </Link>

            <Link href="/zh/destinations/maldives" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="h-72 bg-gradient-to-br from-[#006994] to-[#005a7f] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <IslandIcon className="w-32 h-32" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{t('马尔代夫', 'Maldives')}</h3>
                  <p className="text-white/80 text-sm">{t('热带天堂，清澈的海水和绚丽的珊瑚礁', 'Tropical paradise with crystal-clear waters and vibrant coral reefs')}</p>
                </div>
              </div>
            </Link>

            <Link href="/zh/destinations/great-barrier-reef" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="h-72 bg-gradient-to-br from-[#006994] to-[#003d52] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <CoralIcon className="w-32 h-32" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{t('大堡礁', 'Great Barrier Reef')}</h3>
                  <p className="text-white/80 text-sm">{t('世界最大的珊瑚礁系统，独特的海洋生态系统', 'World\'s largest coral reef system with a unique marine ecosystem')}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#006994]">
              为什么选择我们的潜水旅行
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#006994] rounded-full flex items-center justify-center mx-auto mb-4">
                <TargetIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('专业向导', 'Expert Guides')}</h3>
              <p className="text-gray-600">
                经验丰富的潜水向导，熟悉每个潜点的最佳路线和海洋生物
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#006994] rounded-full flex items-center justify-center mx-auto mb-4">
                <HotelIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('一站式服务', 'All-Inclusive Service')}</h3>
              <p className="text-gray-600">
                机票、住宿、潜水安排全包，您只需享受潜水乐趣
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#006994] rounded-full flex items-center justify-center mx-auto mb-4">
                <PriceIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('超值价格', 'Best Value')}</h3>
              <p className="text-gray-600">
                与当地潜店直接合作，为您提供最具竞争力的价格
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#006994] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              准备好出发了吗？
            </h2>
            <p className="text-xl text-white/90 mb-8">
              联系我们，定制您的潜水旅行
            </p>
            <Link href="/zh/contact" className="inline-block px-10 py-5 bg-white text-[#006994] font-bold text-xl rounded-lg hover:bg-gray-100 transition-all shadow-lg">
              联系我们
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
