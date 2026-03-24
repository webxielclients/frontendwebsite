'use client';

import { useState, useEffect, useRef, ReactNode, RefObject } from 'react';
import Image from 'next/image';

/* ─── useInView ──────────────────────────────────────────────── */
function useInView(threshold = 0.12): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── Reveal ─────────────────────────────────────────────────── */
interface RevealProps {
  children: ReactNode;
  delay?: number;
  dir?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}
function Reveal({ children, delay = 0, dir = 'up', className = '' }: RevealProps) {
  const [ref, inView] = useInView();
  const translate: Record<string, string> = {
    up: 'translateY(24px)',
    down: 'translateY(-24px)',
    left: 'translateX(-24px)',
    right: 'translateX(24px)',
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : translate[dir],
      transition: `opacity .6s cubic-bezier(.16,1,.3,1) ${delay}ms,
                   transform .6s cubic-bezier(.16,1,.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─── Icons ──────────────────────────────────────────────────── */
const IMenu = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M3 6h16M3 11h16M3 16h16" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const IClose = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M5 5l12 12M17 5L5 17" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const GooglePlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M3.18 1.03C2.47 1.43 2 2.17 2 3.03v17.94c0 .86.47 1.6 1.18 2l10.36-10.97L3.18 1.03z" fill="#EA4335" />
    <path d="M20.3 10.27l-2.8-1.57-3.17 3.3 3.17 3.3 2.83-1.59c.81-.45.81-1.99-.03-2.44z" fill="#FBBC04" />
    <path d="M3.18 22.97c.2.12.43.18.67.18.38 0 .75-.11 1.07-.3l12.3-6.9-3.17-3.3-10.87 10.32z" fill="#34A853" />
    <path d="M3.18 1.03L14.05 11.97l-3.17-3.3L4.92 1.31A2.06 2.06 0 003.18 1.03z" fill="#4285F4" />
  </svg>
);
const AppleIcon = () => (
  <svg width="17" height="20" viewBox="0 0 17 22" fill="white">
    <path d="M14.93 11.5c-.02-2.48 2.03-3.67 2.12-3.73-1.16-1.69-2.95-1.92-3.59-1.95-1.53-.16-2.98.9-3.76.9-.78 0-1.99-.88-3.27-.85-1.68.02-3.23.98-4.1 2.48-1.74 3.02-.45 7.51 1.25 9.97.83 1.2 1.82 2.55 3.12 2.5 1.25-.05 1.73-.81 3.24-.81 1.51 0 1.94.81 3.27.79 1.35-.02 2.2-1.22 3.02-2.43 1-1.4 1.4-2.74 1.42-2.81-.03-.01-2.72-1.04-2.74-4.07z" />
    <path d="M12.38 4.06c.69-.84 1.16-2 1.03-3.16-1 .04-2.2.67-2.91 1.49-.64.73-1.2 1.9-1.05 3.02 1.11.09 2.24-.57 2.93-1.35z" />
  </svg>
);

/* ─── StoreButton ────────────────────────────────────────────── */
function StoreButton({ store }: { store: 'google' | 'apple' }) {
  const isGoogle = store === 'google';
  return (
    <button
      className="flex items-center gap-2.5 bg-[#1A1D1F] hover:bg-[#2a2d2f] transition-colors cursor-pointer border-none rounded-[75px] text-left"
      style={{ padding: '7.5px 13.5px', width: 200 }}
    >
      {isGoogle ? <GooglePlayIcon /> : <AppleIcon />}
      <div className="flex flex-col leading-tight">
        <span className="text-[#9ca3af] font-normal" style={{ fontSize: 9 }}>
          {isGoogle ? 'GET IT ON' : 'Download on the'}
        </span>
        <span className="text-white font-bold text-[13px]">
          {isGoogle ? 'Google Play' : 'App Store'}
        </span>
      </div>
    </button>
  );
}

/* ─── SocialIcon ─────────────────────────────────────────────── */
function SocialIcon({ label, children }: { label: string; children: ReactNode }) {
  return (
    <a href="#" aria-label={label}
      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#16a34a] transition-colors">
      {children}
    </a>
  );
}

/* ─── Body paragraph ─────────────────────────────────────────── */
function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-[13.5px] text-gray-600 leading-[1.85] mb-5 last:mb-0">
      {children}
    </p>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function PrivacyPolicyPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroIn, setHeroIn] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    const t = setTimeout(() => setHeroIn(true), 60);
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(t); };
  }, []);

  const navLinks = ['Home', 'About us', 'How it works', 'FAQ', 'Contact'];

  return (
    <div className="font-sans text-gray-900 bg-white overflow-x-hidden">

      <main>

        {/* ══ HERO IMAGE ══════════════════════════════════════ */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: 'clamp(180px, 28vw, 280px)',
            opacity: heroIn ? 1 : 0,
            transition: 'opacity .8s ease',
          }}
        >
          <Image
            src="/privacyimage.png"
            alt="Privacy Policy"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* ══ CONTENT ═════════════════════════════════════════ */}
        <section className="max-w-[720px] mx-auto px-6 py-12 md:py-16">

          {/* Page title */}
          <Reveal>
            <h1 className="text-[28px] md:text-[34px] font-bold text-gray-900 text-center mb-10">
              Privacy Policy
            </h1>
          </Reveal>

          <Reveal delay={60}>
            <P>
              Your privacy is important to us, and we are committed to protecting the personal and
              transactional information you share when using our website and services. This Privacy
              Policy explains how we collect, use, store, protect, and disclose your information
              when you access our platform or engage with any of our services, including
              crypto-to-cash transactions, cash-to-crypto conversions, payments to China, and other
              related financial support services.
            </P>
          </Reveal>

          <Reveal delay={80}>
            <P>
              When you use our website or contact us for a transaction, we may collect personal
              information such as your name, phone number, email address, bank details, wallet
              address, recipient information, transaction records, proof of payment, and any
              documents provided for verification or compliance purposes. In some cases, we may also
              collect technical information such as IP address, browser type, device information,
              and website usage data to improve our platform&apos;s performance, security, and user
              experience.
            </P>
          </Reveal>

          <Reveal delay={80}>
            <P>
              We collect and use this information to provide our services effectively, process
              transactions accurately, verify user identity, communicate updates, prevent fraud,
              comply with legal and regulatory obligations, and improve the quality and reliability
              of our operations. Your information helps us confirm payment instructions, reduce
              errors, maintain transaction security, and ensure that our services are delivered in a
              safe and responsible manner.
            </P>
          </Reveal>

          <Reveal delay={80}>
            <P>
              We take reasonable administrative, technical, and operational measures to protect your
              information from unauthorized access, misuse, alteration, disclosure, or loss. While
              we strive to maintain strong security standards, no digital platform or internet-based
              transmission can be guaranteed to be completely secure. As a result, users are
              encouraged to exercise caution when sharing sensitive financial or personal information
              and to ensure that all communication is made through our official channels.
            </P>
          </Reveal>

          <Reveal delay={80}>
            <P>
              We do not sell, rent, or trade your personal information to third parties for marketing
              purposes. However, we may share your information with trusted service providers,
              banking partners, payment processors, compliance partners, legal authorities, or
              regulatory bodies where necessary to complete a transaction, investigate suspicious
              activity, enforce our policies, or comply with applicable laws and legal obligations.
              Any such disclosure will be limited to what is reasonably necessary for the intended
              purpose.
            </P>
          </Reveal>

          <Reveal delay={80}>
            <P>
              Our website may use cookies or similar technologies to enhance user experience, analyze
              website traffic, and support essential website functions. These technologies help us
              understand how visitors interact with our platform and allow us to improve navigation,
              performance, and service delivery. By continuing to use our website, you consent to the
              use of such technologies unless disabled through your browser settings.
            </P>
          </Reveal>

          <Reveal delay={80}>
            <P>
              Users have a responsibility to provide accurate and lawful information when using our
              services. You may contact us at any time to request updates, corrections, or
              clarification regarding the personal information you have provided, subject to any
              legal, compliance, or record-keeping obligations we may be required to maintain. In
              some situations, we may retain certain records for security, legal, tax, audit, or
              operational purposes even after a transaction has been completed.
            </P>
          </Reveal>

          <Reveal delay={80}>
            <P>
              We may update this Privacy Policy from time to time to reflect changes in our services,
              legal obligations, security practices, or business operations. Any updates will be
              published on this page, and continued use of our website or services after such updates
              indicates your acceptance of the revised policy. We encourage users to review this page
              periodically to stay informed about how their information is handled.
            </P>
          </Reveal>

          <Reveal delay={80}>
            <P>
              By using our website and services, you acknowledge that you have read and understood
              this Privacy Policy and agree to the collection and use of your information as
              described herein. If you have any questions or concerns about this policy, you may
              contact us through the support channels listed on our website.
            </P>
          </Reveal>

        </section>
      </main>

    </div>
  );
}