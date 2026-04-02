'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/zh" className="flex items-center space-x-3 group">
            <span className="text-5xl">🤿</span>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-[#006994] tracking-tight">
                奉旨潜水
              </h1>
              <span className="text-xs text-gray-500 font-medium tracking-widest uppercase">
                Imperial Diving
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/zh/diving-experience" className="text-gray-700 hover:text-[#006994] font-semibold transition-colors">
              潜水体验
            </Link>
            <Link href="/zh/diving-courses" className="text-gray-700 hover:text-[#006994] font-semibold transition-colors">
              潜水课程
            </Link>
            <Link href="/zh/diving-travel" className="text-gray-700 hover:text-[#006994] font-semibold transition-colors">
              潜水旅行
            </Link>
            <Link href="/zh/destinations" className="text-gray-700 hover:text-[#006994] font-semibold transition-colors">
              目的地
            </Link>
            <Link href="/zh/about" className="text-gray-700 hover:text-[#006994] font-semibold transition-colors">
              关于我们
            </Link>
            <Link
              href="/zh/contact"
              className="px-6 py-3 bg-[#006994] hover:bg-[#005a7f] text-white font-bold rounded-lg transition-colors"
            >
              联系我们
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
              <Link
                href="/zh/diving-experience"
                className="text-gray-700 hover:text-[#006994] font-semibold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                潜水体验
              </Link>
              <Link
                href="/zh/diving-courses"
                className="text-gray-700 hover:text-[#006994] font-semibold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                潜水课程
              </Link>
              <Link
                href="/zh/diving-travel"
                className="text-gray-700 hover:text-[#006994] font-semibold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                潜水旅行
              </Link>
              <Link
                href="/zh/destinations"
                className="text-gray-700 hover:text-[#006994] font-semibold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                目的地
              </Link>
              <Link
                href="/zh/about"
                className="text-gray-700 hover:text-[#006994] font-semibold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                关于我们
              </Link>
              <Link
                href="/zh/contact"
                className="px-6 py-3 bg-[#006994] hover:bg-[#005a7f] text-white font-bold rounded-lg transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                联系我们
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
