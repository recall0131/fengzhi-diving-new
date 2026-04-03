'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = {
  zh: [
    { label: '潜水体验', href: '/zh/diving-experience' },
    { label: '潜水课程', href: '/zh/diving-courses' },
    { label: '潜水旅行', href: '/zh/diving-travel' },
    { label: '目的地', href: '/zh/destinations' },
    { label: '关于我们', href: '/zh/about' },
  ],
  en: [
    { label: 'Dive Experience', href: '/en/diving-experience' },
    { label: 'Dive Courses', href: '/en/diving-courses' },
    { label: 'Dive Travel', href: '/en/diving-travel' },
    { label: 'Destinations', href: '/en/destinations' },
    { label: 'About', href: '/en/about' },
  ],
};

export default function Navbar({ lang }: { lang: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isZh = lang === 'zh';
  const links = isZh ? navLinks.zh : navLinks.en;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center space-x-3 group">
            <svg className="w-10 h-10 text-[#008ECC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <ellipse cx="12" cy="7" rx="5" ry="3.5"/>
              <path d="M7 7L5 4M17 7l2-3"/>
              <path d="M12 10.5v6"/>
              <path d="M8 22c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5"/>
            </svg>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-[#006994] tracking-tight">
                {isZh ? '奉旨潜水' : 'Imperial Diving'}
              </h1>
              <span className="text-xs text-gray-500 font-medium tracking-widest uppercase">
                {isZh ? 'Imperial Diving' : 'PADI Certified'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Language Toggle */}
            <Link
              href={`/${lang === 'zh' ? 'en' : 'zh'}`}
              className="text-sm font-medium px-3 py-1.5 rounded-md border border-gray-300 text-gray-600 hover:text-[#006994] hover:border-[#006994] transition-colors"
            >
              {lang === 'zh' ? 'EN' : '中文'}
            </Link>
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-700 hover:text-[#006994] font-semibold transition-colors">
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${lang}/contact`}
              className="px-6 py-3 bg-[#006994] hover:bg-[#005a7f] text-white font-bold rounded-lg transition-colors"
            >
              {isZh ? '联系我们' : 'Contact Us'}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-[#006994] font-semibold transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={`/${lang}/contact`}
                className="px-6 py-3 bg-[#006994] hover:bg-[#005a7f] text-white font-bold rounded-lg transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {isZh ? '联系我们' : 'Contact Us'}
              </Link>
              <Link
                href={`/${lang === 'zh' ? 'en' : 'zh'}`}
                className="text-center text-sm font-medium px-3 py-2 rounded-md border border-gray-300 text-gray-600 hover:text-[#006994] hover:border-[#006994] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {isZh ? 'Switch to English' : '切换到中文'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
