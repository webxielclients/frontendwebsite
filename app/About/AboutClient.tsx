'use client';

import { useState, useEffect, useRef, ReactNode, CSSProperties, RefObject } from 'react';
import Image from 'next/image';
import {CircleCheckIcon} from '@/public/icons';
import {useRouter} from 'next/navigation';

function useInView(threshold = 0.12): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null as any);
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

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroIn, setHeroIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    const t = setTimeout(() => setHeroIn(true), 80);
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(t); };
  }, []);

  const fadeUp = (delay = 0): CSSProperties => ({
    opacity: heroIn ? 1 : 0,
    transform: heroIn ? 'none' : 'translateY(22px)',
    transition: `opacity .65s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .65s cubic-bezier(.16,1,.3,1) ${delay}ms`,
  });


  return (
    <div className="font-sans text-gray-900 bg-white overflow-x-hidden">

      <main>

        <section className="max-w-[1100px] mx-auto px-6 pt-16 pb-12 md:pt-20 md:pb-14">
          <h1 style={fadeUp(60)} className="text-2xl md:text-[28px] font-bold text-[#1a7a4a] mb-4 leading-snug">
            About ChangPay
          </h1>
          <p style={fadeUp(130)} className="text-[15px] text-gray-600 leading-relaxed mb-3 max-w-3xl">
            ChangPay is a digital payments platform built to make moving money
            simpler, faster, and more reliable for individuals and businesses alike.
          </p>
          <p style={fadeUp(180)} className="text-[15px] text-gray-600 leading-relaxed max-w-3xl">
            We focus on practical financial solutions that help people convert
            value, make payments, and manage funds across currencies without
            unnecessary complexity. Our platform is designed around clarity,
            security, and everyday usefulness.
          </p>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <Reveal dir="left">
              <p className="flex items-center gap-2 text-[#1a7a4a] font-semibold text-sm mb-5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#1a7a4a] flex-shrink-0" />
                Our Mission
              </p>
              <h2 className="text-[15px] md:text-[16px] font-bold leading-[1.7] text-gray-900 mb-5">
                To simplify and accelerate digital asset conversions, empowering users to easily manage and transfer money across multiple currencies.
              </h2>
              {/* <p className="text-[13.5px] text-gray-500 leading-relaxed">
                At ChangPay, we believe financial tools should remove
                barriers—not create them. Every product we build is designed to
                make money easier to access, easier to move, and easier to
                understand.
              </p> */}
            </Reveal>
            <Reveal dir="right" delay={80}>
              <div className="relative h-64 md:h-72 rounded-xl overflow-hidden bg-gray-900">
                <Image src="/About1.png" alt="ChangPay mission visual" fill className="object-cover" />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <Reveal dir="left" delay={60}>
              <div className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-gray-900 order-last md:order-first">
                <Image src="/About2.png" alt="ChangPay vision visual" fill className="object-cover" />
              </div>
            </Reveal>
            <Reveal dir="right">
              <p className="flex items-center gap-2 text-[#1a7a4a] font-semibold text-sm mb-5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#1a7a4a] flex-shrink-0" />
                Our Vision
              </p>
              <h2 className="text-[15px] md:text-[16px] font-bold leading-[1.7] text-gray-900 mb-5">
               To become the go-to platform for seamless crypto-to-cash transactions, and global payments shaping the future of finance in emerging markets.
              </h2>
              {/* <p className="text-[13.5px] text-gray-500 leading-relaxed">
                Trust and accessibility guide every decision we make from how our
                systems are designed to how users experience the platform every day.
              </p> */}
            </Reveal>
          </div>
        </section>

  <section className="max-w-[1100px] mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

            <Reveal dir="right">
              <p className="flex items-center gap-2 text-[#1a7a4a] font-semibold text-sm mb-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#1a7a4a] flex-shrink-0" />
                Compliance Notice:
              </p>
              <p className="text-[13px] text-gray-500 leading-relaxed mx-2 mb-5">
               ChangPay operates in accordance with applicable AML/CTF regulations and works with licensed payment and settlement partners where required.
              </p>
              <p className="flex items-center gap-2 text-[#1a7a4a] font-semibold text-sm mb-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#1a7a4a] flex-shrink-0"/>
                Risk closure:
                </p>
                <p className="text-[13px] text-gray-500 leading-relaxed mx-2 mb-5">
                  Digital asset and cross-border transactions carry inherent risks, including price volatility and settlement delays.
                </p>
                <p className="flex items-center gap-2 text-[#1a7a4a] font-semibold text-sm mb-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#1a7a4a] flex-shrink-0"/>
                Disclaimer: 
              </p>
              <p className="text-[13px] text-gray-500 leading-relaxed mx-2 mb-2">
                ChangPay is not a bank or financial institution and does not provide financial or investment advice.
              </p>
               <p className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                {/* <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#1a7a4a] flex-shrink-0"/> */}
                <CircleCheckIcon/>
                Instant Conversion: Fast crypto, and asset exchanges
              </p>
               <p className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                {/* <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#1a7a4a] flex-shrink-0"/> */}
                <CircleCheckIcon/>
                Multi-Currency Wallets (Coming Soon): Manage NGN, USD, and Yuan.
              </p>
               <p className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                {/* <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#1a7a4a] flex-shrink-0"/> */}
                <CircleCheckIcon/>
                Customer-Focused: Exceptional support for all your financial needs.
              </p>
            </Reveal>
             
             <Reveal dir="left" delay={60}>
              <div className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-gray-900 order-first md:order-last">
                <Image src="/save.jpg" alt="ChangPay vision visual" fill className="object-cover" />
              </div>
            </Reveal>
          </div>
        </section>
      
        <section className="px-4 md:px-6 py-10">
          <div className="max-w-[1100px] mx-auto">
            <Reveal>
              <div className="rounded-[20px] overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[380px]">

                <div className="bg-[#1a3d2b] px-8 md:px-12 py-12 md:py-16 flex flex-col justify-center">
                  <h2 className="text-[36px] md:text-[48px] font-extrabold text-[#009F51] leading-[1.1] mb-6">
                    Why ChangPay<br />Exists
                  </h2>
                  <p className="text-[#D9F5DB] text-[15px] leading-relaxed mb-5">
                    Across many markets, individuals and businesses face the same challenges:
                  </p>
                  <ul className="list-disc list-outside pl-5 text-[#D9F5DB] text-[14px] space-y-2 mb-6">
                    <li>Slow or unreliable payments</li>
                    <li>Limited access to cross-border financial services</li>
                    <li>Unclear pricing and hidden fees</li>
                    <li>Fragmented tools that don&apos;t work well together</li>
                  </ul>
                  <p className="text-[#D9F5DB] text-[13.5px] leading-relaxed">
                    ChangPay was built to address these gaps with a single, structured
                    platform that brings clarity and efficiency to digital payments.
                  </p>
                </div>

                <div className="flex items-center justify-center min-h-[300px] md:min-h-0">
                  <Image
                    src="/Image(5).png"
                    alt="ChangPay app screens"
                    width={560}
                    height={520}
                    className="w-full h-auto object-cover drop-shadow-xl"
                  />
                </div>

              </div>
            </Reveal>
          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 py-20">
          <Reveal>
            <h2 className="text-2xl md:text-[52px] font-bold text-center text-[#012D32] mb-3">
              What We Do
            </h2>
            <p className="text-center text-[#012D32] text-[20px] leading-relaxed mb-14 mx-auto">
              ChangPay provides a set of financial tools that support real-world money movement:
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-8">
            <Reveal dir="left" delay={60}>
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <Image src="/Icon.png" alt="Digital value conversion icon" width={24} height={24} />
                </div>
                <h3 className="text-[17px] font-bold text-gray-900">Digital value conversion</h3>
                <p className="text-[24px] text-[#737373] leading-relaxed">
                  Helping users turn crypto into usable cash.
                </p>
              </div>
            </Reveal>
            <Reveal dir="right" delay={80}>
              <div className="relative h-72 rounded-xl overflow-hidden">
                <Image src="/aboutdig.png" alt="Convert Crypto to Cash screen" fill className="object-contain" />
              </div>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <p className="text-[15px] text-[#1A1D1F] leading-relaxed">
              All services are designed to work together within one secure system.
            </p>
          </Reveal>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 py-20">
          <Reveal>
            <h2 className="text-2xl md:text-[32px] font-bold text-center text-[#1a7a4a] mb-3">
              Built for individuals and businesses
            </h2>
            <p className="text-center text-gray-500 text-[15px] leading-relaxed mb-14 max-w-xl mx-auto">
              ChangPay supports different usage patterns without changing the core system.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">
            <Reveal dir="left" delay={60}>
              <h3 className="text-[15px] font-bold text-gray-900 mb-4">For individuals</h3>
              <ul className="list-disc list-inside text-gray-500 text-[14px] space-y-2.5">
                <li>Simple conversions</li>
                <li>Fast cash access</li>
                <li>Clear transaction history</li>
              </ul>
            </Reveal>
            <Reveal dir="right" delay={80}>
              <div className="relative h-52 rounded-xl bg-[#d6f0e2]">
                <Image src="/Home1.png" alt="Individual user visual" fill className="object-cover rounded-[20px]" />
                </div>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <Reveal dir="left" delay={60}>
              <div className="relative h-52 rounded-xl rounded-[20px] order-last md:order-first">
                <Image src="/Home2.png" alt="Business user visual" fill className="object-cover rounded-[20px]" />
                </div>
            </Reveal>
            <Reveal dir="right" delay={80}>
              <h3 className="text-[15px] font-bold text-gray-900 mb-4">For businesses</h3>
              <ul className="list-disc list-inside text-gray-500 text-[14px] space-y-2.5">
                <li>Supplier payments</li>
                <li>Repeat transactions</li>
                <li>Predictable settlement</li>
                <li>Clear records for accounting</li>
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="bg-[#012D32] px-6 py-16 md:py-20">
          <div className="max-w-[1100px] mx-auto">

            <Reveal className="text-center mb-12">
              <h2 className="text-[32px] md:text-[40px] font-bold text-[#009F51] mb-4">
                Our Approach
              </h2>
              <p className="text-white text-[15px] leading-relaxed">
                We believe good financial technology should be:
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
              {[
                { title: "Clear",       description: "Users should always understand what's happening" },
                { title: "Reliable",    description: "Payments should work when they matter most" },
                { title: "Accessible",  description: "Designed for everyday use, not just experts" },
                { title: "Responsible", description: "Built with compliance and long-term trust in mind" },
              ].map((item, index) => (
                <Reveal key={item.title} delay={index * 80}>
                  <div className="bg-white border border-gray-100 rounded-2xl px-10 py-10 text-center
                                  flex flex-col items-center justify-center gap-2 min-h-[120px]
                                  hover:shadow-md transition-shadow">
                    <h3 className="text-[15px] font-bold text-gray-900">{item.title}</h3>
                    <p className="text-[13.5px] text-gray-500 leading-relaxed max-w-[260px]">{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={360}>
              <p className="text-center text-[14px] text-white">
                This philosophy shapes everything we build.
              </p>
            </Reveal>

          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

            <Reveal dir="left">
              <h2 className="text-[28px] md:text-[32px] font-bold text-[#009F51] mb-5 leading-tight">
                Looking Ahead
              </h2>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                ChangPay is continuously improving expanding capabilities,
                strengthening infrastructure, and refining the user experience while
                staying grounded in our mission to make digital payments simpler and
                more inclusive.
              </p>
            </Reveal>

            <Reveal dir="right" delay={80}>
              <div className="relative h-56 md:h-72 rounded-2xl overflow-hidden">
                <Image
                  src="/abouten.png"
                  alt="ChangPay future vision"
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>

          </div>
        </section>

        <section className="px-4 md:px-6 mb-16">
          <Reveal>
            <div className="max-w-[1100px] mx-auto bg-[#16a34a] px-8 py-16 text-center">
              <h2 className="text-[28px] md:text-[40px] font-bold text-white mb-4 leading-tight">
                Join ChangPay
              </h2>
              <p className="text-green-100 text-[20px] leading-relaxed mb-10 max-w-xl mx-auto">
                Whether you&apos;re managing personal finances or running a business,
                ChangPay is built to support how you move money today and how
                you&apos;ll grow tomorrow.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
               <button onClick={() => router.push('/contact')} className="w-full sm:w-auto bg-[#0d2218] hover:bg-[#1b3d2a] text-white text-[15px] font-bold px-7 py-3.5 rounded-full border-none cursor-pointer transition-all hover:-translate-y-px hover:shadow-xl">
                      Join ChangPay
                    </button>
                <button onClick={() => router.push('/#how-it-works')} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-900 text-[15px] font-semibold px-6 py-3.5 rounded-full border border-gray-200 cursor-pointer transition-all hover:border-[#16a34a] hover:text-[#16a34a] hover:-translate-y-px">
                      How ChangPay works
                    </button>
              </div>
            </div>
          </Reveal>
        </section>

      </main>
    </div>
  );
}