'use client';

import { useState, useEffect, useRef, ReactNode, CSSProperties, RefObject, ElementType } from 'react';
import Image from 'next/image';

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

interface FieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  as?: 'input' | 'textarea';
  rows?: number;
}
function Field({ label, id, type = 'text', placeholder, as: Tag = 'input', rows }: FieldProps) {
  const base =
    'w-full border border-gray-300 rounded-lg px-4 py-3 text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a] transition-colors bg-white';
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-medium text-gray-700">
        {label}
      </label>
      {Tag === 'textarea' ? (
        <textarea id={id} placeholder={placeholder} rows={rows ?? 7}
          className={`${base} resize-none`} />
      ) : (
        <input id={id} type={type} placeholder={placeholder} className={base} />
      )}
    </div>
  );
}

export default function ContactPage() {
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

        <div
          className="hidden md:block w-full relative overflow-hidden"
          style={{
            opacity: heroIn ? 1 : 0,
            transition: 'opacity .8s ease',
            height: 220,
          }}
        >
          <Image
            src="/Contactimage.png"
            alt="Business — contact ChangPay"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <section className="max-w-[760px] mx-auto px-6 py-16 md:py-20">
          <Reveal>
            <h1 className="text-[32px] md:text-[40px] font-bold text-center text-[#0d3b2e] mb-3 leading-tight">
              Get In Touch
            </h1>
            <p className="text-center text-[15px] text-gray-600 mb-12">
              You can reach us anytime via{' '}
              <a href="mailto:hi@changpay.com"
                className="text-[#16a34a] font-medium hover:underline no-underline transition-all">
                hi@changpay.com
              </a>
            </p>
          </Reveal>

          <Reveal delay={80}>
            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="First name" id="first-name" placeholder="First name" />
                <Field label="Last name" id="last-name" placeholder="Last name" />
              </div>
              <Field label="Email" id="email" type="email" placeholder="example@gmail.com" />
              <Field label="Phone number" id="phone" type="tel" placeholder="Phone number" />
              <Field label="Message" id="message" as="textarea" placeholder="Leave us a message" rows={7} />
              <button
                type="submit"
                className="w-full bg-[#16a34a] hover:bg-[#15803d] active:bg-[#14532d] text-white font-semibold text-[15px] py-4 rounded-lg transition-colors cursor-pointer border-none mt-1"
              >
                Send Message
              </button>
            </form>
          </Reveal>
        </section>

      </main>

    </div>
  );
}