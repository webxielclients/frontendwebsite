'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Home',         href: '/' },
  { label: 'About us',     href: '/About' },
  { label: 'How it works', href: '/pay-to-china' },
  { label: 'FAQ',          href: '/faq' },
  { label: 'Contact Us',   href: '/Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Funnel+Display:wght@400;500;600;700;800;900&display=swap');
        .nav-font { font-family: -apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif; }
        @keyframes mobileNavIn { to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <header className={`sticky top-0 z-50 transition-all duration-300 border-b border-gray-100 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'}`}>
        <nav className="nav-font max-w-[1200px] mx-auto px-5 md:px-12 h-16 flex items-center justify-between">

          <Link href="/" className="flex items-center no-underline flex-shrink-0">
            <Image src="/Group.png" alt="ChangPay" width={120} height={45} priority />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={label}
                  href={href}
                  className="text-[14px] font-medium transition-colors no-underline relative group"
                  style={{ color: isActive ? '#111' : '#6b7280' }}
                >
                  {label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#16a34a] rounded-full transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/Contact"
              className="hidden md:inline-flex items-center bg-[#16a34a] hover:bg-[#15803d] text-white text-[14px] font-bold px-6 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:shadow-green-500/20 no-underline"
            >
              Get started
            </Link>

            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 bg-transparent border-none cursor-pointer gap-[5px]"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="block w-[22px] h-[1.8px] bg-gray-800 rounded-full" />
              <span className="block w-[22px] h-[1.8px] bg-gray-800 rounded-full" />
              <span className="block w-[22px] h-[1.8px] bg-gray-800 rounded-full" />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[999] flex flex-col md:hidden transition-all duration-300
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{
          background: '#012d329d',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
        aria-hidden={!menuOpen}
      >
        <div
          className="flex items-center justify-between px-5 h-16 flex-shrink-0"
          style={{ background: '#012D32' }}
        >
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Image src="/Group.png" alt="ChangPay" width={110} height={40} />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center bg-transparent border-none cursor-pointer"
            aria-label="Close menu"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M5 5l12 12M17 5L5 17" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-0">
          {NAV_LINKS.map(({ label, href }, i) => {
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="nav-font no-underline w-full text-center py-4 text-[18px] transition-colors duration-200"
                style={{
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)',
                  fontWeight: isActive ? 700 : 500,
                  opacity: 0,
                  transform: 'translateY(16px)',
                  animation: menuOpen
                    ? `mobileNavIn .35s cubic-bezier(.16,1,.3,1) ${i * 55 + 80}ms forwards`
                    : 'none',
                }}
              >
                {label}
              </Link>
            );
          })}

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="nav-font mt-8 bg-[#16a34a] hover:bg-[#15803d] text-white text-[15px] font-bold px-10 py-3.5 rounded-full no-underline transition-all duration-200"
            style={{
              opacity: 0,
              transform: 'translateY(16px)',
              animation: menuOpen
                ? `mobileNavIn .35s cubic-bezier(.16,1,.3,1) ${NAV_LINKS.length * 55 + 80}ms forwards`
                : 'none',
            }}
          >
            Create an account
          </Link>
        </div>
      </div>
    </>
  );
}