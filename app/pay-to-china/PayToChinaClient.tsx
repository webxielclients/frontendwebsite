'use client';

import { useState, useEffect, useRef, ReactNode, RefObject } from 'react';
import Image from 'next/image';
import {ILayers, IBolt} from '@/public/icons';


function InfoCard({
  icon,
  title,
  bullets,
  filled = false,
}: {
  icon: React.ReactNode;
  title: string;
  bullets: string[];
  filled?: boolean;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div
        className={`w-8 h-8 rounded-[8px] mb-3 flex items-center justify-center flex-shrink-0 ${filled ? "bg-[#16a34a]" : "bg-gray-100"}`}
      >
        {icon}
      </div>
      <p className="text-[13.5px] font-bold text-gray-900 mb-2">{title}</p>
      <ul className="list-disc pl-4 space-y-1">
        {bullets.map((b) => (
          <li key={b} className="text-[12.5px] text-gray-500 leading-snug">
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

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

interface RevealProps {
  children: ReactNode;
  delay?: number;
  dir?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}
function Reveal({ children, delay = 0, dir = 'up', className = '' }: RevealProps) {
  const [ref, inView] = useInView();
  const translate: Record<string, string> = {
    up: 'translateY(28px)',
    down: 'translateY(-28px)',
    left: 'translateX(-28px)',
    right: 'translateX(28px)',
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : translate[dir],
      transition: `opacity .65s cubic-bezier(.16,1,.3,1) ${delay}ms,
                   transform .65s cubic-bezier(.16,1,.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function ArticleParagraph({ children }: { children: ReactNode }) {
  return (
    <p className="text-[14.5px] text-gray-700 leading-[1.85] mb-5 last:mb-0">
      {children}
    </p>
  );
}

export default function PayToChinaPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroIn, setHeroIn] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    const t = setTimeout(() => setHeroIn(true), 80);
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(t); };
  }, []);

  const navLinks = ['Home', 'About us', 'How it works', 'FAQ', 'Contact'];

  return (
    <div className="font-sans text-gray-900 bg-white overflow-x-hidden">

      <main>

        <section className="bg-[#0a2e22] px-6 py-0">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center py-14 md:py-20">

              <div
                style={{
                  opacity: heroIn ? 1 : 0,
                  transform: heroIn ? 'none' : 'translateY(24px)',
                  transition: 'opacity .7s cubic-bezier(.16,1,.3,1) 60ms, transform .7s cubic-bezier(.16,1,.3,1) 60ms',
                }}
              >
                <h1 className="text-[36px] md:text-[62px] font-extrabold text-[#D9F5DB] leading-[1.1] mb-6">
                  Fast, Secure<br />Payments to<br /> <h1 className="text-[#4ade80]">China</h1>
                </h1>
                <p className="text-[14px] text-gray-300 leading-relaxed max-w-sm">
                  Pay your Chinese suppliers with ease. We help individuals and
                  businesses send fast, reliable, and verified payments to China
                  without the stress of complicated bank processes or delays.
                </p>
              </div>

              <div
                className="hidden md:flex justify-end"
                style={{
                  opacity: heroIn ? 1 : 0,
                  transform: heroIn ? 'none' : 'translateX(24px)',
                  transition: 'opacity .7s cubic-bezier(.16,1,.3,1) 160ms, transform .7s cubic-bezier(.16,1,.3,1) 160ms',
                }}
              >
                <div className="bg-white rounded-[24px] overflow-hidden">
                  <Image
                    src="/paytochina.png"
                    alt="Pay to China app screen"
                    width={340}
                    height={260}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="max-w-[760px] mx-auto px-6 py-14 md:py-20">

          <Reveal>
            <ArticleParagraph>
              Paying suppliers and service providers in China has become an essential
              part of international trade for many importers, entrepreneurs, and students.
              Whether you are sourcing products from manufacturers, paying for shipping,
              settling factory balances, or handling tuition payments, understanding how
              to make secure and efficient payments to China is very important.
            </ArticleParagraph>
          </Reveal>

          <Reveal delay={60}>
            <ArticleParagraph>
              For many people, the process can seem complicated at first. International
              bank transfers may take time, exchange rates can vary, and incorrect payment
              details can lead to delays or failed transactions. This is why it is important
              to work with the right payment process and ensure that every transfer is
              handled carefully.
            </ArticleParagraph>
          </Reveal>

          <Reveal delay={80}>
            <ArticleParagraph>
              When making a payment to China, the first step is always to confirm the
              recipient&apos;s account details properly. This includes the account name, bank
              name, account number, branch details where required, and the exact purpose
              of payment. Accuracy matters because even a small mistake can delay your
              transaction or cause issues with supplier confirmation.
            </ArticleParagraph>
            <ArticleParagraph>
              Another important factor is understanding the reason for the payment. Many
              payments to China are related to product sourcing, factory deposits, balance
              settlements, shipping charges, inspection fees, tuition, and business services.
              Having clarity on the purpose of the payment helps make the process smoother
              and ensures that all parties involved understand the transaction.
            </ArticleParagraph>
          </Reveal>

          <Reveal delay={60}>
            <ArticleParagraph>
              Exchange rates and transfer charges also play a major role. Before sending
              money, it is always wise to confirm the exact amount that will be received on
              the Chinese side. This helps avoid underpayment, especially when you are
              dealing with suppliers who require exact figures before production or shipment
              can continue.
            </ArticleParagraph>
            <ArticleParagraph>
              Security is another key concern. Because international payments involve trust,
              it is always advisable to verify supplier details before sending funds. Confirm
              invoices, cross-check account details, and make sure the recipient information
              matches the business you are paying. A secure payment process reduces the risk
              of errors and gives you greater confidence in your transactions.
            </ArticleParagraph>
          </Reveal>

          <Reveal delay={60}>
            <ArticleParagraph>
              For importers and business owners, timely payments can directly affect order
              processing and delivery schedules. Delayed supplier payments may slow down
              production, postpone shipment, or create unnecessary communication problems.
              This is why many businesses prioritize fast and reliable payment support when
              dealing with China.
            </ArticleParagraph>
          </Reveal>

          <Reveal delay={60}>
            <ArticleParagraph>
              At its core, paying to China should be simple, transparent, and well-guided.
              With the right process, individuals and businesses can complete payments
              smoothly and focus on what matters most, whether that is growing an import
              business, fulfilling customer orders, or managing educational and
              service-related commitments.
            </ArticleParagraph>
            <ArticleParagraph>
              If you regularly make payments to China, having access to trusted information
              and a clear payment structure can save time, reduce stress, and improve the
              overall efficiency of your transactions.
            </ArticleParagraph>
          </Reveal>

        </section> */}

 <section className="bg-[#f0fdf4] px-4 md:px-12 py-16 md:py-20">
          <div className="max-w-[1100px] mx-auto">
            <Reveal className="mb-3">
              <p className="text-[12px] font-bold text-[#16a34a] uppercase tracking-[.8px] mb-2">
                Pay Suppliers in China
              </p>
              <h2
                className="hero-heading font-extrabold text-[#16a34a]"
                style={{ fontSize: "clamp(20px, 2.8vw, 32px)" }}
              >
                Pay Suppliers in China
              </h2>
            </Reveal>
            <Reveal delay={60} className="mb-10">
              <p
                className="text-gray-900 leading-snug max-w-[680px]"
                style={{
                  fontSize: "clamp(15px, 1.8vw, 20px)",
                  fontWeight: 700,
                }}
              >
                <strong>ChangPay simplifies Yuan</strong>{" "}
                <span className="text-gray-400 font-normal">
                  payments to Chinese suppliers by handling currency conversion,
                  routing, and settlement through trusted channels.
                </span>
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
              <div className="flex flex-col gap-3.5">
                {(
                  [
                    {
                      icon: <ILayers />,
                      title: "Use cases",
                      filled: false,
                      bullets: [
                        "Importers paying manufacturers",
                        "Merchants settling invoices",
                        "Individuals paying overseas suppliers",
                      ],
                    },
                    {
                      icon: <IBolt filled />,
                      title: "Payment flow",
                      filled: true,
                      bullets: [
                        "Pay from NGN or USD balance",
                        "Funds are converted to Yuan at a displayed FX rate",
                        "Payment is sent to Alipay, WeChat Pay, or a Chinese bank account",
                        "Payment status is tracked end to end",
                      ],
                    },
                    {
                      icon: <ILayers />,
                      title: "What users see before paying",
                      filled: false,
                      bullets: [
                        "FX rate",
                        "Processing fee",
                        "Expected arrival time",
                      ],
                    },
                  ] as {
                    icon: React.ReactNode;
                    title: string;
                    filled: boolean;
                    bullets: string[];
                  }[]
                ).map((card, i) => (
                  <Reveal key={card.title} delay={i * 80}>
                    <InfoCard
                      icon={card.icon}
                      title={card.title}
                      bullets={card.bullets}
                      filled={card.filled}
                    />
                  </Reveal>
                ))}
              </div>
              <Reveal dir="right">
                <div
                  className="relative w-full h-full rounded-[16px] overflow-hidden bg-[#dcfce7]"
                  style={{ minHeight: 420 }}
                >
                  <Image
                    src="/paytochinahome.png"
                    alt="Pay suppliers in China"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}