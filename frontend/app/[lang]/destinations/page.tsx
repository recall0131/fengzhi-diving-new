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
      <path d="M40 55 L40 25 M35 30 Q40 25 45 30" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
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
      <path d="M40 55 Q28 52 22 42" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
      <path d="M40 60 Q52 57 58 47" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
      <ellipse cx="28" cy="25" rx="6" ry="4" fill="white" opacity="0.4"/>
      <ellipse cx="52" cy="20" rx="6" ry="4" fill="white" opacity="0.4"/>
    </svg>
  );
}

export default function DestinationsPage() {
  return (
    <div className="pt-20">
      <section className="relative py-20 md:py-32 bg-[#006994] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              潜水目的地
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              探索世界顶级潜水圣地
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/zh/destinations/palau" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="h-72 bg-gradient-to-br from-[#006994] to-[#004d6b] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <BlueHoleIcon className="w-32 h-32" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">帕劳蓝洞</h3>
                  <p className="text-white/80 text-sm">世界顶级潜水圣地，壮观的蓝洞和丰富的海洋生物</p>
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
                  <h3 className="text-2xl font-bold text-white mb-2">马尔代夫</h3>
                  <p className="text-white/80 text-sm">热带天堂，清澈的海水和绚丽的珊瑚礁</p>
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
                  <h3 className="text-2xl font-bold text-white mb-2">大堡礁</h3>
                  <p className="text-white/80 text-sm">世界最大的珊瑚礁系统，独特的海洋生态系统</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
