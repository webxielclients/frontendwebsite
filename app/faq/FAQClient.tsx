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
    question: 'What is ChangPay?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        ChangPay is a multi-currency financial technology platform that helps users send, receive, convert, and manage money across borders seamlessly using modern payment infrastructure and stablecoin-powered settlement systems.
      </p>
    ),
  },
  {
    question: 'What services does ChangPay provide?',
    answer: (
      <div className="flex flex-col gap-4 text-[13.5px] text-gray-600 leading-[1.85]">
        <p>ChangPay provides:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Multi-currency wallets</li>
          <li>USD wallet infrastructure</li>
          <li>NGN wallet support</li>
          <li>Cross-border payments</li>
          <li>Crypto-to-cash conversion</li>
          <li>Pay-to-China services</li>
          <li>Business payment solutions</li>
          <li>International supplier payments</li>
        </ul>
      </div>
    ),
  },
  {
    question: 'Is ChangPay a bank?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        No. ChangPay is a financial technology platform that works with licensed financial and payment partners to provide secure financial services.
      </p>
    ),
  },
  {
    question: 'Which countries does ChangPay support?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        ChangPay is focused on Africa and Asia payment corridors, beginning with Nigeria, China, and global USD transactions.
      </p>
    ),
  },
  {
    question: 'Who can use ChangPay?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Individuals, freelancers, importers, exporters, international students, remote workers, and businesses can use ChangPay.
      </p>
    ),
  },
  {
    question: 'What wallets are available on ChangPay?',
    answer: (
      <div className="flex flex-col gap-4 text-[13.5px] text-gray-600 leading-[1.85]">
        <p>Users can access:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>USD Wallet</li>
          <li>NGN Wallet</li>
          <li>USDT/USDC support</li>
          <li>Additional currencies planned in future updates</li>
        </ul>
      </div>
    ),
  },
  {
    question: 'Can I receive USD into my ChangPay wallet?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes. Users can receive USD into their ChangPay USD wallet using supported payment methods and partner infrastructure.
      </p>
    ),
  },
  {
    question: 'Can I convert crypto to cash?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes. ChangPay supports crypto-to-cash conversion for supported stablecoins and payout currencies.
      </p>
    ),
  },
  {
    question: 'Which cryptocurrencies are supported?',
    answer: (
      <div className="flex flex-col gap-4 text-[13.5px] text-gray-600 leading-[1.85]">
        <p>ChangPay primarily supports stablecoins such as:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>USDT</li>
          <li>USDC</li>
        </ul>
      </div>
    ),
  },
  {
    question: 'Can I transfer money to Nigerian bank accounts?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes. Users can send NGN directly to supported Nigerian bank accounts.
      </p>
    ),
  },
  {
    question: 'What is Pay to China?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Pay to China allows users and businesses to send payments to suppliers and businesses in China securely and efficiently.
      </p>
    ),
  },
  {
    question: 'Can businesses pay Chinese suppliers through ChangPay?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes. Businesses can use ChangPay for supplier and invoice-based payments.
      </p>
    ),
  },
  {
    question: 'Does ChangPay support Alipay or WeChat Pay?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        ChangPay is working on expanding payout options depending on partner availability and compliance approvals.
      </p>
    ),
  },
  {
    question: 'Is ChangPay secure?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes. ChangPay uses secure infrastructure, compliance procedures, and regulated partners to protect user transactions.
      </p>
    ),
  },
  {
    question: 'Does ChangPay require KYC verification?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes. Identity verification is required to comply with financial regulations and protect users.
      </p>
    ),
  },
  {
    question: 'Why do I need to verify my identity?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Verification helps prevent fraud, money laundering, and unauthorized account activity.
      </p>
    ),
  },
  {
    question: 'How long does verification take?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Most verifications are completed within minutes, although some cases may require additional review.
      </p>
    ),
  },
  {
    question: 'Are my funds safe?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        ChangPay works with licensed financial infrastructure providers and security-focused systems to help safeguard user funds and transactions.
      </p>
    ),
  },
  {
    question: 'How fast are transactions?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Many transactions are processed within minutes depending on the payment corridor and partner network.
      </p>
    ),
  },
  {
    question: 'Can I send money internationally?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes. ChangPay supports international payment flows across supported countries and currencies.
      </p>
    ),
  },
  {
    question: 'What are the transaction fees?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Fees vary depending on transaction type, currency, and payment corridor.
      </p>
    ),
  },
  {
    question: 'Can I track my transaction?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes. Users can monitor transaction status directly inside the app.
      </p>
    ),
  },
  {
    question: 'Are exchange rates live?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes. Exchange rates are updated dynamically based on market conditions and liquidity providers.
      </p>
    ),
  },
  {
    question: 'Does ChangPay support businesses?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes. ChangPay supports both individuals and business accounts.
      </p>
    ),
  },
  {
    question: 'What business features are available?',
    answer: (
      <div className="flex flex-col gap-4 text-[13.5px] text-gray-600 leading-[1.85]">
        <p>Business users can access:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Supplier payments</li>
          <li>Multi-currency wallets</li>
          <li>International settlements</li>
          <li>Payment tracking</li>
          <li>Cross-border payment support</li>
        </ul>
      </div>
    ),
  },
  {
    question: 'Do businesses need verification?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes. Business verification (KYB) is required for compliance and security purposes.
      </p>
    ),
  },
  {
    question: 'Can startups use ChangPay?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes. Startups, SMEs, and global businesses can use ChangPay.
      </p>
    ),
  },
  {
    question: 'Is ChangPay available on mobile?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes. ChangPay is designed for mobile accessibility and app-based usage.
      </p>
    ),
  },
  {
    question: 'Is ChangPay available 24/7?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes. Users can access their wallets and services anytime.
      </p>
    ),
  },
  {
    question: 'How do I create an account?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Users can sign up through the ChangPay platform and complete identity verification.
      </p>
    ),
  },
  {
    question: 'How do I contact support?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Users can contact ChangPay support through official communication channels and in-app support systems.
      </p>
    ),
  },
  {
    question: 'What happens if my transaction delays?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Support teams and partner systems review delayed transactions promptly to ensure resolution.
      </p>
    ),
  },
  {
    question: 'Can I reverse a completed transaction?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Completed transactions may not always be reversible depending on the transaction stage and payment network.
      </p>
    ),
  },
  {
    question: 'Will ChangPay launch virtual cards?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes. Virtual card support is planned for future releases.
      </p>
    ),
  },
  {
    question: 'Will ChangPay support more currencies?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes. More currencies and regions will be added progressively.
      </p>
    ),
  },
  {
    question: 'Will ChangPay support more countries?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes. ChangPay plans to expand globally over time.
      </p>
    ),
  },
  {
    question: 'Why should I trust ChangPay?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        ChangPay focuses on transparency, compliance, secure partnerships, and modern payment technology to build trusted financial infrastructure.
      </p>
    ),
  },
  {
    question: 'What makes ChangPay different?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        ChangPay focuses on seamless cross-border transactions between Africa and Asia using modern financial infrastructure and stablecoin-powered settlement systems.
      </p>
    ),
  },
  {
    question: 'Does ChangPay use blockchain technology?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes. Some settlement infrastructure leverages blockchain technology and stablecoin systems.
      </p>
    ),
  },
  {
    question: 'Is ChangPay for personal or business use?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Both. ChangPay supports individual users and businesses.
      </p>
    ),
  },
  {
    question: 'Can I receive USD with ChangPay?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes — ChangPay helps users access USD wallet infrastructure and international payment capabilities.
      </p>
    ),
  },
  {
    question: 'Can I convert USDT to Naira?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes — supported users can convert stablecoins into NGN payouts.
      </p>
    ),
  },
  {
    question: 'Is ChangPay launching soon?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes — ChangPay is currently preparing for launch and onboarding early users.
      </p>
    ),
  },
  {
    question: 'Can ChangPay help importers pay China suppliers?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes — ChangPay is building infrastructure designed for cross-border supplier payments.
      </p>
    ),
  },
  {
    question: 'Is ChangPay only for Nigerians?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        No — ChangPay is building global payment infrastructure for international users and businesses.
      </p>
    ),
  },
  {
    question: 'Can freelancers use ChangPay?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes. Freelancers can use ChangPay for international payments and wallet management.
      </p>
    ),
  },
  {
    question: 'Does ChangPay support international businesses?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        Yes. ChangPay is designed to support global businesses and cross-border transactions.
      </p>
    ),
  },
  {
    question: 'Is ChangPay fast?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        ChangPay is designed for fast and efficient international payment processing.
      </p>
    ),
  },
  {
    question: 'What currencies does ChangPay support?',
    answer: (
      <p className="text-[13.5px] text-gray-600 leading-[1.85]">
        ChangPay currently focuses on USD, NGN, and stablecoin infrastructure, with more currencies planned.
      </p>
    ),
  },
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
