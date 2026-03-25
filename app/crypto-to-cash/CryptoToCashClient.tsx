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

export default function CryptoToCashPage() {
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
        <section className="bg-[#0a2e22]">
          <div className="max-w-[1100px] mx-auto px-6 py-14 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

              {/* Left: text */}
              <div
                style={{
                  opacity: heroIn ? 1 : 0,
                  transform: heroIn ? 'none' : 'translateY(24px)',
                  transition: 'opacity .7s cubic-bezier(.16,1,.3,1) 60ms, transform .7s cubic-bezier(.16,1,.3,1) 60ms',
                }}
              >
                <h1 className="text-[36px] md:text-[52px] font-extrabold text-[#4ade80] leading-[1.1] mb-6">
                  Fast, Secure<br />Crypto <h1 className='text-[#F2C04C]'>to Cash</h1>
                </h1>
                <p className="text-[14px] text-gray-300 leading-relaxed max-w-sm">
                  Convert your cryptocurrency with ease. We help individuals and
                  businesses turn digital assets into cash quickly, securely, and
                  reliably without the stress of delays, unclear rates, or
                  complicated conversion processes.
                </p>
              </div>

              {/* Right: white rounded card — desktop only */}
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
                    src="/paytochina2.png"
                    alt="Crypto to Cash app screen"
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
              Converting cryptocurrency to cash has become an essential part of modern
              digital finance, especially for freelancers, remote workers, online business
              owners, traders, and individuals who receive payments in digital assets. As
              cryptocurrency continues to grow in popularity, more people are now using it
              not only as an investment option but also as a practical method of receiving
              and storing value. However, while holding crypto can offer flexibility and
              speed, there are many situations where access to physical cash or local
              currency becomes necessary for daily expenses, business operations, supplier
              payments, bills, or personal financial commitments. This is why understanding
              the process of converting crypto to cash is important for anyone actively
              involved in the digital economy.
            </ArticleParagraph>
          </Reveal>

          <Reveal delay={60}>
            <ArticleParagraph>
              One of the most important things to understand about crypto to cash
              transactions is that security is everything. Unlike traditional banking systems
              where some errors can be reversed or corrected through formal channels,
              cryptocurrency transactions are largely irreversible once they are confirmed on
              the blockchain. This means users must be extremely careful when sending funds,
              confirming wallet addresses, and verifying the exact type of cryptocurrency
              involved in the transaction. Sending the wrong asset to an incompatible wallet
              or entering incorrect details can lead to delays, failed transfers, or permanent
              loss of funds. Because of this, a secure and well-guided process is essential
              to ensure that every step is handled properly from the beginning.
            </ArticleParagraph>
          </Reveal>

          <Reveal delay={60}>
            <ArticleParagraph>
              Another key factor in crypto to cash conversion is the exchange rate and timing
              of the transaction. Cryptocurrency prices are highly dynamic and can change
              significantly within a short period of time. A rate that looks favorable one
              moment may shift minutes later, affecting the actual cash value a user receives.
              For this reason, it is always important to confirm the current rate before
              proceeding and understand how the final cash equivalent is calculated.
              Transparency in rates and clear communication during the transaction helps users
              avoid confusion and ensure they know exactly what to expect. Whether the goal is
              to cash out a small amount for personal use or convert a larger sum for business
              purposes, clarity around rates is a major part of building trust and confidence
              in the process.
            </ArticleParagraph>
          </Reveal>

          <Reveal delay={60}>
            <ArticleParagraph>
              Speed is also one of the major reasons why many people rely on crypto to cash
              services. In many cases, users need immediate or same-day access to their funds,
              especially when money is meant to cover bills, family support, business
              reinvestment, or operational expenses. A slow or poorly managed conversion
              process can create unnecessary stress and disrupt important plans. That is why
              an efficient crypto-to-cash system should focus on fast confirmation, quick
              processing, and reliable settlement into the user&apos;s preferred local currency
              or bank account. The ability to move from digital assets to spendable cash
              without unnecessary delay is one of the biggest advantages of a trusted crypto
              conversion process.
            </ArticleParagraph>
          </Reveal>

          <Reveal delay={60}>
            <ArticleParagraph>
              Security remains at the center of every successful crypto to cash transaction.
              Because digital assets are attractive targets for fraud, scams, and human error,
              users must always prioritize safe practices when managing their funds. This
              includes confirming wallet details carefully, dealing only with trusted platforms
              or providers, double-checking transaction instructions, and ensuring that
              communication remains clear throughout the process. A professional and transparent
              approach reduces risk and helps users feel more confident managing their digital
              assets. In a space where trust matters as much as speed, a secure transaction
              process can make all the difference between a stressful experience and a smooth
              financial exchange.
            </ArticleParagraph>
          </Reveal>

          <Reveal delay={60}>
            <ArticleParagraph>
              Ultimately, crypto to cash is more than just a transaction. It is a bridge
              between the digital financial world and everyday real-life spending. It allows
              people to enjoy the convenience of receiving value in cryptocurrency while still
              meeting practical needs in local currency. For digital earners, entrepreneurs,
              and everyday users, having access to a reliable crypto-to-cash process means
              greater financial flexibility, better control over income, and a smoother
              connection between online opportunities and offline responsibilities. When done
              correctly, converting crypto to cash should feel simple, transparent, and
              dependable, giving users the confidence to use cryptocurrency not just as a
              digital asset, but as a functional part of their financial life.
            </ArticleParagraph>
          </Reveal>

        </section> */}
         <section className="bg-white px-4 md:px-12 py-16 md:py-20">
          <div className="max-w-[1100px] mx-auto">
            <Reveal className="mb-1 text-center">
              <span className="inline-block border border-gray-200 text-gray-500 text-[12px] font-medium px-4 py-1 rounded-full tracking-wide">
                Core Services
              </span>
            </Reveal>
            <Reveal delay={40} className="mb-3 mt-4">
              <h2
                className="hero-heading font-extrabold text-[#16a34a]"
                style={{ fontSize: "clamp(20px, 2.8vw, 32px)" }}
              >
                Convert Crypto to Cash
              </h2>
            </Reveal>
            <Reveal delay={80} className="mb-10">
              <p
                className="text-gray-900 leading-snug max-w-[640px]"
                style={{
                  fontSize: "clamp(15px, 1.8vw, 20px)",
                  fontWeight: 700,
                }}
              >
                <strong>ChangPay enables users to convert</strong>{" "}
                <span className="text-gray-400 font-normal">
                  supported cryptocurrencies into local or foreign currency
                  balances, with fast settlement and clear pricing.
                </span>
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
              <div className="flex flex-col gap-3.5">
                {(
                  [
                    {
                      icon: <ILayers />,
                      title: "Supported assets",
                      filled: false,
                      bullets: [
                        "USDT (TRC20 & ERC20)",
                        "Bitcoin (BTC)",
                        "Ethereum (ETH)",
                        "Solana (SOL)",
                      ],
                    },
                    {
                      icon: <IBolt filled />,
                      title: "How the conversion works",
                      filled: true,
                      bullets: [
                        "The platform fetches live market rates",
                        "A conversion rate is displayed with fees included",
                        "Rates are locked briefly to reduce volatility risk",
                        "Blockchain confirmations are monitored in real time",
                        "Funds are credited once the transaction is confirmed",
                      ],
                    },
                    {
                      icon: <ILayers />,
                      title: "Settlement options",
                      filled: false,
                      bullets: [
                        "NGN wallet",
                        "USD wallet",
                        "Nigerian bank account",
                      ],
                    },
                  ] as {
                    icon: React.ReactNode;
                    title: string;
                    filled: boolean;
                    bullets: string[];
                  }[]
                ).map((card, i) => (
                  <Reveal key={card.title} delay={80 + i * 80}>
                    <InfoCard
                      icon={card.icon}
                      title={card.title}
                      bullets={card.bullets}
                      filled={card.filled}
                    />
                  </Reveal>
                ))}
                <Reveal delay={340}>
                  <p className="text-[12px] text-gray-400 italic pt-1">
                    This structure ensures price transparency, speed, and
                    predictable outcomes.
                  </p>
                </Reveal>
              </div>

              <Reveal dir="right">
                <div
                  className="relative w-full h-full rounded-[16px] overflow-hidden"
                  style={{ minHeight: 420 }}
                >
                  <Image
                    src="/Image(2).png"
                    alt="Convert Crypto to Cash"
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