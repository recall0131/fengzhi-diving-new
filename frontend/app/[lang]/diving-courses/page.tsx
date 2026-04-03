'use client';

import Link from 'next/link';

const courses = [
  {
    name: 'PADI 开放水域潜水员 (OWD)',
    duration: '4天',
    price: '¥2,800',
    level: '入门',
    color: 'from-[#006994] to-[#004d6b]',
    description: '开启您的潜水之旅，全球认可。完成此课程后，您将能够在开放水域独立潜水，最大深度18米。',
    includes: ['理论知识 + 泳池训练', '4次开放水域实习', 'PADI国际认证卡', '全套装备租用', '教练一对一指导'],
    bestFor: '零基础学员，第一次接触潜水',
  },
  {
    name: 'PADI 进阶开放水域潜水员 (AOWD)',
    duration: '3天',
    price: '¥2,200',
    level: '进阶',
    color: 'from-[#008B8B] to-[#005f5f]',
    description: '提升您的潜水技能，探索更深的水域和更有挑战性的潜点。完成课程后，最大深度可达30米。',
    includes: ['深潜与导航专长', '3次开放水域实习', 'PADI国际认证卡', '沉船/放流/夜潜可选', '经验丰富的教练团队'],
    bestFor: '已获OWD认证，想要提升技能',
  },
  {
    name: 'PADI 救援潜水员 (Rescue)',
    duration: '5天',
    price: '¥1,800',
    level: '专业',
    color: 'from-[#CD5C5C] to-[#8B3A3A]',
    description: '学习如何识别和处理潜水紧急情况，成为更安全的潜水员。此课程是成为PADI专业潜水员的第一步。',
    includes: ['紧急情况应对训练', '模拟救援场景实习', 'PADI国际认证卡', '急救/心肺复苏基础', '教练全程指导'],
    bestFor: 'OWD/AOWD持证者，想成为专业潜水员',
  },
];

const additionalCourses = [
  {
    name: 'PADI 紧急第一反应 (EFR)',
    price: '¥980',
    description: '学习心肺复苏和急救技能，适用于所有潜水员和非潜水员。',
  },
  {
    name: 'PADI 潜水长 (Divemaster)',
    price: '¥8,800',
    description: '成为PADI专业潜水员的起点，可独立带领潜水员进行潜水活动。',
  },
];

export default function DivingCoursesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-[#006994] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              潜水课程
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              专业认证，全球认可，开启您的潜水之旅
            </p>
            <p className="text-white/70 text-base max-w-2xl mx-auto">
              所有课程由PADI认证教练授课，提供从入门到专业的完整成长路径
            </p>
          </div>
        </div>
      </section>

      {/* Main Courses */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#006994]">
              核心课程
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              从零基础到专业级别，找到适合您的课程
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {courses.map((course) => (
              <div key={course.name} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
                <div className={`h-2 bg-gradient-to-r ${course.color}`} />
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#006994] px-3 py-1 rounded-full">
                      {course.level}
                    </span>
                    <span className="text-sm text-gray-500">{course.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{course.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 flex-1">{course.description}</p>
                  <div className="text-center py-4 border-t border-gray-100 mb-4">
                    <span className="text-4xl font-bold text-[#006994]">{course.price}</span>
                    <span className="text-gray-500 text-sm ml-1">/人</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {course.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-500">
                      <span className="font-semibold text-gray-700">适合对象：</span>
                      {course.bestFor}
                    </p>
                  </div>
                  <Link href="/zh/contact" className="block text-center px-6 py-3 bg-[#006994] text-white font-bold rounded-lg hover:bg-[#005577] transition-colors">
                    立即报名
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Note */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-lg font-bold mb-3 text-gray-800">价格说明</h3>
            <p className="text-gray-600 text-sm">
              以上价格为课程费用，不包含住宿、餐饮和交通。我们提供一站式服务套餐，可根据您的需求定制。
              团体报名可享优惠，欢迎联系我们咨询。
            </p>
          </div>
        </div>
      </section>

      {/* Additional Courses */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#006994]">
              专业课程
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {additionalCourses.map((course) => (
              <div key={course.name} className="bg-white rounded-xl shadow-md p-8 flex items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{course.name}</h3>
                  <p className="text-gray-600 text-sm">{course.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-2xl font-bold text-[#006994]">{course.price}</div>
                  <Link href="/zh/contact" className="inline-block mt-2 text-sm text-[#006994] hover:text-[#005577] font-semibold">
                    咨询 →
                  </Link>
                </div>
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
              不确定哪个课程适合您？
            </h2>
            <p className="text-xl text-white/90 mb-8">
              联系我们的教练团队，免费为您评估并推荐最适合的课程
            </p>
            <Link href="/zh/contact" className="inline-block px-10 py-5 bg-white text-[#006994] font-bold text-xl rounded-lg hover:bg-gray-100 transition-all shadow-lg">
              免费咨询
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
