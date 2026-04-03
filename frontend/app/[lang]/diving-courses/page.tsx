'use client';

import Link from 'next/link';

export default function DivingCoursesPage() {
  return (
    <div className="pt-20">
      <section className="relative py-20 md:py-32 bg-[#006994] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              潜水课程
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              专业认证，全球认可，开启您的潜水之旅
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">PADI 开放水域潜水员课程</h2>
          <p className="text-gray-600 mb-8">开启您的潜水之旅，全球认可</p>
          <Link href="/zh/contact" className="inline-block px-8 py-4 bg-[#006994] text-white rounded-lg hover:bg-[#005577]">
            立即报名
          </Link>
        </div>
      </section>
    </div>
  );
}
