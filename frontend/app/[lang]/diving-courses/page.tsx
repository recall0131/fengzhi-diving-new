'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type Course = {
  id: number;
  name_zh: string;
  name_en: string;
  short_desc_zh: string;
  short_desc_en: string;
  description_zh: string;
  description_en: string;
  price: number;
  duration: string;
  duration_en: string;
  level: string;
  level_zh: string;
  hero_image: string;
  featured: number;
  sort_order: number;
};

const levelColors: Record<string, string> = {
  beginner: 'from-[#006994] to-[#004d6b]',
  intermediate: 'from-[#008B8B] to-[#005f5f]',
  advanced: 'from-[#CD5C5C] to-[#8B3A3A]',
  professional: 'from-[#6B46C1] to-[#4C1D95]',
};

export default function DivingCoursesPage() {
  const params = useParams();
  const lang = (params.lang as string) || 'zh';
  const isZh = lang === 'zh';
  const t = (zh: string, en: string) => (isZh ? zh : en);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/courses')
      .then(r => r.json())
      .then(data => { setCourses(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const mainCourses = courses.filter(c => c.price > 0 && c.price < 5000);
  const extraCourses = courses.filter(c => c.price >= 5000 || !c.price);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-32 min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero-instructor.jpg" alt="Diving Courses" className="w-full h-full object-cover object-center"/>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('潜水课程', 'Diving Courses')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {t('专业认证，全球认可，开启您的潜水之旅', 'Professional Certification, Worldwide Recognition, Start Your Dive')}
            </p>
            <p className="text-white/70 text-base max-w-2xl mx-auto">
              {t('所有课程由PADI认证教练授课，提供从入门到专业的完整成长路径', 'All courses taught by PADI-certified instructors, complete path from beginner to professional')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Courses */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#006994]">
              {t('核心课程', 'Core Courses')}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('从零基础到专业级别，找到适合您的课程', 'Find the perfect course from beginner to professional level')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {loading ? (
              [1,2,3].map(i => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-2 bg-gray-200" />
                  <div className="p-8 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-20 bg-gray-100 rounded" />
                  </div>
                </div>
              ))
            ) : mainCourses.length === 0 ? (
              <p className="col-span-3 text-center text-gray-400 py-12">{t('暂无课程数据', 'No courses available')}</p>
            ) : mainCourses.map(course => (
              <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
                <div className={`h-2 bg-gradient-to-r ${levelColors[course.level] || levelColors.beginner}`} />
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#006994] px-3 py-1 rounded-full">
                      {course.level_zh || course.level}
                    </span>
                    <span className="text-sm text-gray-500">{isZh ? course.duration : course.duration_en}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {isZh ? course.name_zh : course.name_en}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-1">
                    {isZh ? (course.description_zh || course.short_desc_zh) : (course.description_en || course.short_desc_en)}
                  </p>
                  <div className="text-center py-4 border-t border-gray-100 mb-4">
                    <span className="text-4xl font-bold text-[#006994]">
                      {course.price ? `¥${course.price.toLocaleString()}` : t('咨询', 'Inquire')}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">/ {t('人', 'person')}</span>
                  </div>
                  <Link href={`/${lang}/contact`} className="block text-center px-6 py-3 bg-[#006994] text-white font-bold rounded-lg hover:bg-[#005577] transition-colors">
                    {t('立即报名', 'Enroll Now')}
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
            <h3 className="text-lg font-bold mb-3 text-gray-800">{t('价格说明', 'Pricing Note')}</h3>
            <p className="text-gray-600 text-sm">
              {t('以上价格为课程费用，不包含住宿、餐饮和交通。我们提供一站式服务套餐，可根据您的需求定制。团体报名可享优惠，欢迎联系我们咨询。',
                 'Prices are for the course only, excluding accommodation, meals, and transportation. We offer all-inclusive packages tailored to your needs. Group discounts available — contact us for details.')}
            </p>
          </div>
        </div>
      </section>

      {/* Additional Courses */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#006994]">
              {t('专业课程', 'Professional Courses')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {!loading && extraCourses.map(course => (
              <div key={course.id} className="bg-white rounded-xl shadow-md p-8 flex items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {isZh ? course.name_zh : course.name_en}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {isZh ? (course.description_zh || course.short_desc_zh) : (course.description_en || course.short_desc_en)}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-2xl font-bold text-[#006994]">
                    {course.price ? `¥${course.price.toLocaleString()}` : t('咨询', 'Inquire')}
                  </div>
                  <Link href={`/${lang}/contact`} className="inline-block mt-2 text-sm text-[#006994] hover:text-[#005577] font-semibold">
                    {t('咨询 →', 'Inquire →')}
                  </Link>
                </div>
              </div>
            ))}
            {loading && [1,2].map(i => (
              <div key={i} className="bg-white rounded-xl shadow-md p-8 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-100 rounded w-1/2" />
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
              {t('不确定哪个课程适合您？', 'Not Sure Which Course Is Right?')}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {t('联系我们的教练团队，免费为您评估并推荐最适合的课程', 'Contact our instructor team for a free assessment and personalized course recommendation')}
            </p>
            <Link href={`/${lang}/contact`} className="inline-block px-10 py-5 bg-white text-[#006994] font-bold text-xl rounded-lg hover:bg-gray-100 transition-all shadow-lg">
              {t('免费咨询', 'Free Consultation')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
