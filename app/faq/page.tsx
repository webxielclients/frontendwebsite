'use client';

import { useState, useEffect, useRef, ReactNode, RefObject } from 'react';
import Image from 'next/image';

function useInView(threshold = 0.12): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
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
  className?: string;
}
function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      width: '100%',
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(20px)',
      transition: `opacity .55s cubic-bezier(.16,1,.3,1) ${delay}ms,
                   transform .55s cubic-bezier(.16,1,.3,1) ${delay}ms`,
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

/* ─── Accordion Item ─────────────────────────────────────────── */
interface FaqItem {
  question: string;
  answer: ReactNode;
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
  delay,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  delay: number;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  /* measure real content height so we can animate it */
  useEffect(() => {
    if (!contentRef.current) return;
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <Reveal delay={delay}>
      <div className="border-b border-gray-200 last:border-b-0">
        {/* ── trigger row ── */}
        <button
          onClick={onToggle}
          className="w-full flex items-start justify-between gap-6 py-5 text-left bg-transparent border-none cursor-pointer group"
          aria-expanded={isOpen}
        >
          <span className={`text-[14.5px] font-semibold leading-snug transition-colors duration-200 ${isOpen ? 'text-gray-900' : 'text-gray-800 group-hover:text-gray-900'}`}>
            {item.question}
          </span>

          {/* +  /  — icon */}
          <span className="flex-shrink-0 mt-0.5 text-gray-500 transition-colors duration-200 group-hover:text-gray-700"
            aria-hidden="true">
            {isOpen ? (
              /* minus / dash — matching the — in the design */
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ) : (
              /* plus */
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </span>
        </button>

        {/* ── animated answer panel ── */}
        <div
          style={{
            height: height,
            overflow: 'hidden',
            transition: 'height 0.38s cubic-bezier(.16,1,.3,1)',
          }}
        >
          <div ref={contentRef} className="pb-6">
            {item.answer}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── FAQ data ───────────────────────────────────────────────── */
const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How long can I stay on the free plan?',
    answer: (
      <div className="flex flex-col gap-4">
        <p className="text-[13.5px] text-gray-600 leading-[1.85]">
          You can stay on the free plan for as long as you want. There is no fixed expiration date
          and no automatic deadline that requires you to upgrade to a paid plan. As long as the free
          plan remains available and your account stays active and in good standing, you can continue
          using it without being forced to move to a subscription.
        </p>
        <p className="text-[13.5px] text-gray-600 leading-[1.85]">
          In practical terms, this means the free plan is not a temporary trial. You are not expected
          to upgrade after a certain number of days, and you will not be automatically charged unless
          you personally choose to subscribe to a paid option. Many users remain on the free plan for
          an extended period, especially if their needs are occasional or if the features included in
          the free tier are enough for what they want to do.
        </p>
        <p className="text-[13.5px] text-gray-600 leading-[1.85]">
          That said, while the free plan does not usually have a time limit, it may still come with
          certain usage limits or feature restrictions. For example, access may be limited during busy
          periods, some advanced tools or models may only be available on paid plans, and there may be
          caps on how much you can use the service within a certain time. These limits do not mean your
          free plan has expired. They simply reflect what is currently included in the free tier.
        </p>
        <p className="text-[13.5px] text-gray-600 leading-[1.85]">
          It is also important to understand that free plans can change over time. A company may update
          what is included, adjust usage allowances, or change which features are available to free
          users. If this happens, it usually affects the experience or benefits of the plan rather than
          how long you are allowed to stay on it. In other words, the free plan can continue to exist
          without a time limit, even if its features evolve.
        </p>
      </div>
    ),
  },
  {
    question: 'Do you have a free trial?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes, we offer a free trial that gives you access to our core features without requiring a
        payment method upfront. The trial is designed to help you explore the platform, test the
        service, and determine whether it meets your needs before committing to a paid plan.
        You will receive a notification before the trial ends so you can decide how you would like
        to proceed.
      </p>
    ),
  },
  {
    question: 'What happens if I cancel my paid plan?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        If you cancel your paid plan, your subscription will remain active until the end of your
        current billing period. After that, your account will revert to the free plan and you will
        retain access to the basic features. Any data associated with your account will be preserved,
        though certain premium features will no longer be available. You can reactivate your paid
        plan at any time.
      </p>
    ),
  },
  {
    question: 'Can I get a discount if I commit yearly?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes, we offer a discount for users who choose an annual billing cycle instead of monthly.
        Paying yearly typically saves you the equivalent of two months compared to the monthly rate.
        The exact discount percentage depends on the plan you select and will be displayed clearly
        during the checkout process before you confirm your subscription.
      </p>
    ),
  },
  {
    question: 'What payment methods do you accept?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        We accept a variety of payment methods including major debit and credit cards, bank transfers,
        and select digital wallets depending on your region. For cryptocurrency-related transactions,
        we support specific digital assets as outlined in our service documentation. All payments are
        processed securely, and we do not store full card details on our servers.
      </p>
    ),
  },
  {
    question: 'Can I upgrade or downgrade at any time?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes, you can upgrade or downgrade your plan at any time from your account settings. Upgrades
        take effect immediately, and you will only be charged the prorated difference for the
        remainder of your billing cycle. Downgrades take effect at the start of your next billing
        period, so you will continue to have access to your current plan features until then.
      </p>
    ),
  },
];

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function FAQPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroIn, setHeroIn] = useState(false);

  /* first item open by default — matches the Figma screenshot */
  const [openIndex, setOpenIndex] = useState<number>(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    const t = setTimeout(() => setHeroIn(true), 60);
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(t); };
  }, []);

  const navLinks = ['Home', 'About us', 'How it works', 'FAQ', 'Contact'];

  const handleToggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? -1 : index));
  };

  return (
    <div className="font-sans text-gray-900 bg-white overflow-x-hidden">

      <main className="w-full">

        {/* ══ HERO IMAGE — full width, same pattern as T&C / Privacy pages ══ */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: 'clamp(180px, 28vw, 280px)',
            opacity: heroIn ? 1 : 0,
            transition: 'opacity .8s ease',
          }}
        >
          <Image
            src="/faq.png"
            alt="Frequently Asked Questions"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* ══ CONTENT ══ */}
        <div
          className="mx-auto px-6 py-14 md:py-20"
          style={{ maxWidth: '800px' }}
        >
          {/* ── Page heading ── */}
          <div
            style={{
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? 'none' : 'translateY(20px)',
              transition: 'opacity .6s cubic-bezier(.16,1,.3,1) 60ms, transform .6s cubic-bezier(.16,1,.3,1) 60ms',
            }}
          >
            <h1 className="text-[28px] md:text-[40px] font-bold text-gray-900 text-center mb-12 md:mb-16 leading-tight">
              Frequently asked questions
            </h1>
          </div>

          {/* ── Accordion ── */}
          <div className="border-t border-gray-200">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={item.question}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
                delay={i * 40}
              />
            ))}
          </div>
        </div>
      </main>

    </div>
  );
}