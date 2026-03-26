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

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <h2 className="text-[16px] font-bold text-gray-900 mt-8 mb-3">
      {number}. {title}
    </h2>
  );
}

function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-[13.5px] text-gray-600 leading-[1.85] mb-4 last:mb-0">
      {children}
    </p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-outside pl-5 text-[13.5px] text-gray-600 leading-[1.85] mb-4 space-y-1.5">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

export default function TermsAndConditionsPage() {
  const [heroIn, setHeroIn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="font-sans text-gray-900 bg-white overflow-x-hidden">
      <main>

        <div
          className="relative w-full overflow-hidden"
          style={{
            height: 'clamp(180px, 28vw, 280px)',
            opacity: heroIn ? 1 : 0,
            transition: 'opacity .8s ease',
          }}
        >
          <Image
            src="/termscon.png"
            alt="Terms and Conditions"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <section className="max-w-[720px] mx-auto px-6 py-12 md:py-16">

          <Reveal>
            <h1 className="text-[28px] md:text-[34px] font-bold text-gray-900 text-center mb-2">
              Terms &amp; Conditions
            </h1>
            <p className="text-center text-[13px] text-gray-400 mb-10">
              Last updated: December 20, 2025
            </p>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading number="1" title="Introduction" />
            <P>
              Welcome to ChangPay! These terms and conditions outline the rules and regulations
              for the use of our website and services. By accessing and using our services, you
              agree to comply with and be bound by these terms. Please read them carefully.
            </P>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading number="2" title="User Responsibilities" />
            <BulletList items={[
              'You must be at least 18 years of age to use our services.',
              'You are responsible for maintaining the confidentiality of your account details.',
              'You agree not to use our services for any unlawful purposes, including fraud or money laundering.',
              'You must provide accurate information and keep your account details up-to-date.',
            ]} />
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading number="3" title="Services" />
            <P>
              ChangPay offers services for converting cryptocurrency into local currencies,
              managing multi-currency wallets (NGN, USD, Yuan), and making payments to Chinese
              merchants. These services are provided subject to the terms set out here.
            </P>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading number="4" title="Payment Processing" />
            <P>
              All payments processed through ChangPay are final. Any request for refunds or
              chargebacks will be handled as per our refund policy, which is outlined separately
              on our website.
            </P>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading number="5" title="Security" />
            <P>
              We prioritize security and take appropriate measures to protect your information.
              However, we are not responsible for any security breaches resulting from
              unauthorized access to your account.
            </P>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading number="6" title="Limitation of Liability" />
            <P>
              ChangPay will not be held liable for any damages or losses arising from the use of
              our services, including but not limited to financial loss, loss of data, or
              interruption of services.
            </P>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading number="7" title="Changes to the Terms" />
            <P>
              ChangPay reserves the right to amend or modify these terms at any time. Any changes
              will be posted on this page, and we encourage you to review them periodically.
            </P>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading number="8" title="Governing Law" />
            <P>
              These terms are governed by the applicable laws of the jurisdiction in which
              ChangPay operates, and any disputes will be resolved in the courts of that
              jurisdiction.
            </P>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeading number="9" title="Contact Us" />
            <P>
              If you have any questions about these terms, please contact us at{' '}
              <a href="mailto:support@usechangpay.com"
                className="text-[#16a34a] hover:underline font-medium">
                support@usechangpay.com
              </a>
              .
            </P>
          </Reveal>

        </section>
      </main>
    </div>
  );
}