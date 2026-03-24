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

function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-[13.5px] text-gray-600 leading-[1.85] mb-5 last:mb-0">
      {children}
    </p>
  );
}

export default function TermsAndConditionsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroIn, setHeroIn] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    const t = setTimeout(() => setHeroIn(true), 60);
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(t); };
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
            <h1 className="text-[28px] md:text-[34px] font-bold text-gray-900 text-center mb-10">
              Terms &amp; Conditions
            </h1>
          </Reveal>

          <Reveal delay={60}>
            <P>
              Welcome to our platform. By accessing or using our website and services, you agree
              to comply with and be bound by these Terms and Conditions. These terms govern your
              use of our website, products, services, and all related transactions. If you do not
              agree with any part of these terms, you should discontinue use of our website and
              services immediately.
            </P>
          </Reveal>

          <Reveal delay={80}>
            <P>
              Our platform provides financial support services including but not limited to
              crypto-to-cash conversions, cash-to-crypto transactions, supplier payments to China,
              and other related payment or exchange services. All services are subject to
              availability, verification, compliance requirements, and our internal approval
              process. We reserve the right to refuse, suspend, delay, or cancel any transaction
              where necessary, especially in cases involving incomplete information, suspected
              fraud, suspicious activity, regulatory concerns, or operational limitations.
            </P>
          </Reveal>

          <Reveal delay={80}>
            <P>
              Users are responsible for providing accurate, complete, and up-to-date information
              when using our services. This includes wallet addresses, bank details, recipient
              information, payment references, and any other transaction-related data. We will not
              be held liable for losses, delays, or failed transactions resulting from incorrect,
              incomplete, or misleading information submitted by the user. Because certain
              transactions, especially cryptocurrency transfers, may be irreversible, users are
              expected to verify all details carefully before proceeding.
            </P>
          </Reveal>

          <Reveal delay={80}>
            <P>
              Exchange rates, transaction timelines, and service availability may vary depending on
              market conditions, network congestion, banking operations, third-party systems, or
              other external factors beyond our direct control. While we strive to provide timely
              processing and transparent rates, we do not guarantee fixed rates or exact processing
              times unless explicitly confirmed in writing for a specific transaction. Rates may
              change before final confirmation, and users are advised to confirm all terms before
              proceeding with any service.
            </P>
          </Reveal>

          <Reveal delay={80}>
            <P>
              We are committed to maintaining a secure and compliant environment for all users. As
              part of this, we may request identity verification, proof of payment, source of funds
              documentation, business documentation, or other supporting information where
              necessary. By using our services, you agree to cooperate with any compliance,
              verification, or security checks required to complete a transaction. Failure to provide
              requested information may result in delays, cancellation, or refusal of service.
            </P>
          </Reveal>

          <Reveal delay={80}>
            <P>
              Users agree not to use our platform for unlawful, fraudulent, deceptive, or prohibited
              activities. This includes money laundering, terrorist financing, identity fraud,
              unauthorized third-party transactions, stolen funds, chargeback abuse, or any
              transaction that violates applicable laws and regulations. Any suspicious activity may
              be reported to the relevant authorities where required by law, and we reserve the right
              to permanently restrict or terminate access to our services in such cases.
            </P>
          </Reveal>

          <Reveal delay={80}>
            <P>
              Our platform, content, branding, text, logos, designs, and materials are protected by
              applicable intellectual property rights and may not be copied, reproduced, modified,
              republished, or distributed without prior written consent. Unauthorized use of our
              website or content may result in legal action where appropriate.
            </P>
          </Reveal>

          <Reveal delay={80}>
            <P>
              We reserve the right to update, modify, or replace these Terms and Conditions at any
              time without prior notice. Continued use of our website or services after any changes
              have been published constitutes acceptance of the revised terms. Users are encouraged
              to review this page periodically to stay informed about any updates.
            </P>
          </Reveal>

          <Reveal delay={80}>
            <P>
              By using our website and services, you acknowledge that you have read, understood, and
              agreed to these Terms and Conditions. If you have any questions regarding these terms,
              you may contact us through the appropriate communication channels provided on our
              website.
            </P>
          </Reveal>

        </section>
      </main>

    </div>
  );
}