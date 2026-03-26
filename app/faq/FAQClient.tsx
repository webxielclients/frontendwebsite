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
        <button
          onClick={onToggle}
          className="w-full flex items-start justify-between gap-6 py-5 text-left bg-transparent border-none cursor-pointer group"
          aria-expanded={isOpen}
        >
          <span className={`text-[14.5px] font-semibold leading-snug transition-colors duration-200 ${isOpen ? 'text-gray-900' : 'text-gray-800 group-hover:text-gray-900'}`}>
            {item.question}
          </span>

          <span className="flex-shrink-0 mt-0.5 text-gray-500 transition-colors duration-200 group-hover:text-gray-700"
            aria-hidden="true">
            {isOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </span>
        </button>

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

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How do I convert crypto to cash on ChangPay?',
    answer: (
      <div className="flex flex-col gap-4">
        <p className="text-[13.5px] text-gray-600 leading-[1.85]">
         To convert crypto to cash, simply create an account on ChangPay, link your wallet, choose the cryptocurrency you wish to convert, and select your preferred payout currency. Your funds will be deposited into your linked bank account instantly.
        </p>
      </div>
    ),
  },
  {
    question: 'How can I send payments to Chinese merchants?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Sending payments to Chinese merchants is simple. Choose the "Pay Chinese Merchants" option, enter the merchant's details, and the amount you wish to send. Payments are processed quickly and securely.
      </p>
    ),
  },
  {
    question: 'What wallets can I manage on ChangPay?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        ChangPay allows you to manage NGN, USD, and Yuan wallets. You can send, receive, and convert between these wallets with ease, providing flexibility for global transactions.
      </p>
    ),
  },
  {
    question: 'Is ChangPay secure to use?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes, ChangPay prioritizes the security of your funds. We use industry-standard encryption and secure protocols to ensure your data and transactions are always safe.
      </p>
    ),
  }
];


export default function FAQPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroIn, setHeroIn] = useState(false);

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

        <div
          className="mx-auto px-6 py-14 md:py-20"
          style={{ maxWidth: '800px' }}
        >
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