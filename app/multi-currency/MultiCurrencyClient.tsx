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

export default function MultiCurrencyPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroIn, setHeroIn] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    const t = setTimeout(() => setHeroIn(true), 80);
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(t); };
  }, []);

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
                  Fast, Secure<br />Stable Coins <h1 className='text-[#F2C04C]'>to Cash</h1>
                </h1>
                <p className="text-[14px] text-gray-300 leading-relaxed max-w-sm">
                  Convert your stable coins with ease. We help individuals and
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

        <section className="bg-[#ffffff] px-4 md:px-12 py-16 md:py-20">
                  <div className="max-w-[1100px] mx-auto">
                    <Reveal className="mb-3">
                      <h2
                        className="hero-heading font-extrabold text-[#16a34a]"
                        style={{ fontSize: "clamp(20px, 2.8vw, 32px)" }}
                      >
                        A structured multi-currency wallet system
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
                        <strong>All ChangPay</strong>{" "}
                        <span className="text-gray-400 font-normal">
                          services run through a wallet and ledger system designed for
                          financial clarity.
                        </span>
                      </p>
                    </Reveal>
        
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
                      <div className="flex flex-col gap-3.5">
                        {(
                          [
                            {
                              icon: <ILayers />,
                              title: "Wallet features",
                              filled: false,
                              bullets: [
                                "NGN and USD wallets (Yuan optional)",
                                "Real-time balances",
                                "Internal transfers",
                                "Currency swaps",
                                "Downloadable transaction records",
                              ],
                            },
                            {
                              icon: <IBolt filled />,
                              title: "Payment flow",
                              filled: true,
                              bullets: [
                                "NGN and USD wallets (Yuan optional)",
                                "Real-time balances",
                                "Internal transfers",
                                "Currency swaps",
                                "Downloadable transaction records",
                              ],
                            },
                          ] as {
                            icon: React.ReactNode;
                            title: string;
                            filled: boolean;
                            bullets: string[];
                          }[]
                        ).map((card, i) => (
                          <Reveal key={card.title} delay={i * 100}>
                            <InfoCard
                              icon={card.icon}
                              title={card.title}
                              bullets={card.bullets}
                              filled={card.filled}
                            />
                          </Reveal>
                        ))}
                        <Reveal delay={240}>
                          <p className="text-[14px] text-[#7B7B7B] leading-relaxed pt-1">
                            Behind the interface, every transaction is recorded as a
                            debit or credit ensuring accurate balances and
                            reconciliation.
                          </p>
                        </Reveal>
                      </div>
                      <Reveal dir="right">
                        <div
                          className="relative w-full h-full rounded-[16px] overflow-hidden bg-[#dcfce7]"
                          style={{ minHeight: 420 }}
                        >
                          <Image
                            src="/structrehome.png"
                            alt="Multi-currency wallet"
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