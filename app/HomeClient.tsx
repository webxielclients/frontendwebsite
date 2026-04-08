"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  IBook,
  IUsers,
  ILayers,
  IBolt,
  ILock,
  IPhone,
  IShield,
  IFilter,
  IBank,
  GooglePlay,
  ApplePay,
} from "@/public/icons";

import { useRouter } from "next/navigation";
import Modal from "./components/modals/Modal";
import WaitlistForm from "./components/waitlistForm";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function Reveal({
  children,
  delay = 0,
  dir = "up",
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  dir?: "up" | "down" | "left" | "right";
  className?: string;
  style?: React.CSSProperties;
}) {
  const [ref, inView] = useInView();
  const t: Record<string, string> = {
    up: "translateY(30px)",
    down: "translateY(-30px)",
    left: "translateX(-30px)",
    right: "translateX(30px)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : t[dir],
        transition: `opacity .65s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .65s cubic-bezier(.16,1,.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

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

export default function ChangPayHomepage() {
  const [heroIn, setHeroIn] = useState(false);

  const router = useRouter();
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);

  const openWaitlistModal = () => setIsWaitlistModalOpen(true);
  const closeWaitlistModal = () => setIsWaitlistModalOpen(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 100);
    return () => clearTimeout(t);
  }, []);

  const anim = (d = 0): React.CSSProperties => ({
    opacity: heroIn ? 1 : 0,
    transform: heroIn ? "none" : "translateY(24px)",
    transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${d}ms, transform .7s cubic-bezier(.16,1,.3,1) ${d}ms`,
  });

  return (
    <>
      <div
        className="text-gray-900 bg-white overflow-x-hidden"
        style={{
          fontFamily:
            "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Funnel+Display:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        .hero-heading { font-family: 'Funnel Display', sans-serif; }
        @keyframes cpFloat { 0%,100%{transform:translateY(0) rotate(-.4deg)} 50%{transform:translateY(-14px) rotate(.4deg)} }
        @keyframes cpTicker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes cpPulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:.5} }
        .tick-inner { animation: cpTicker 30s linear infinite; }
        .tick-inner:hover { animation-play-state: paused; }
        .phone-float { animation: cpFloat 5.5s ease-in-out infinite; }
        .step-line { position:absolute; left:14px; top:30px; width:2px; height:calc(100% - 6px); background:rgba(74,222,128,.2); border-radius:2px; }
      `}</style>

        <main>
          <section className="bg-white px-4 md:px-12 pt-10 pb-16 md:pt-20 md:pb-20">
            <div className="max-w-[1100px] mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-14">
                <div className="flex-1 min-w-0 w-full">
                  <div className="text-center md:text-left" style={anim(60)}>
                    <h1
                      className="hero-heading  font-black leading-[1.05] tracking-tight text-[#16a34a] mb-5"
                      style={{
                        fontSize: "clamp(38px, 6vw, 72px)",
                        letterSpacing: "-2px",
                      }}
                    >
                      Receive.
                      <br />
                      Convert.
                      <br />
                      Pay Globally.
                    </h1>
                  </div>
                  <div
                    className="block md:hidden w-full max-w-[300px] mx-auto mb-6"
                    style={anim(140)}
                  >
                    <Image
                      src="/iPhoneNew.png"
                      alt="ChangPay app"
                      width={920}
                      height={1100}
                      className="w-full h-auto block phone-float"
                      priority
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <p
                      className="text-[15px] text-gray-500 leading-relaxed mb-2 max-w-[420px] mx-auto md:mx-0"
                      style={anim(200)}
                    >
                      ChangPay enables individuals and businesses to receive
                      USD, EUR, GBP, and digital assets, manage multi-currency
                      accounts, and convert funds into local currencies
                      securely.
                    </p>
                    <p
                      className="text-[15px] text-gray-500 leading-relaxed mb-8 max-w-[420px] mx-auto md:mx-0"
                      style={anim(240)}
                    >
                      Send and receive payments globally including China through
                      a reliable and compliant platform.
                    </p>
                    <div
                      className="flex flex-col items-center md:items-start gap-4 w-full"
                      style={anim(290)}
                    >
                      <div className="relative w-full md:w-[246px]">
                        <GooglePlay />
                        <span className="absolute top-1.5 md:top-[-3] right-2 md:right-[-30px] bg-[#16a34a] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none whitespace-nowrap z-10">
                          Coming Soon
                        </span>
                      </div>

                      <div className="relative w-full md:w-[246px]">
                        <ApplePay />
                        <span className="absolute top-1.5 md:top-[-3] md:right-[-30px] right-2 bg-[#16a34a] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none whitespace-nowrap z-10">
                          Coming Soon
                        </span>
                      </div>
                      <button
                        onClick={openWaitlistModal}
                        className="bg-[#16a34a] w-[246px] md:w-[246px] hover:bg-[#15803d] text-white text-[14px] font-bold px-7 py-3.5 rounded-full border-none cursor-pointer transition-all hover:-translate-y-px"
                      >
                        Join waitlist
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="hidden md:block md:w-[46%] max-w-[460px] flex-shrink-0"
                  style={anim(150)}
                >
                  <Image
                    src="/iPhoneNew.png"
                    alt="ChangPay app"
                    width={920}
                    height={1100}
                    className="w-full h-auto block phone-float"
                    priority
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#0d2218] pb-16">
            <div className="overflow-hidden border-y border-white/5 py-3.5 mb-16">
              <div className="tick-inner flex gap-12 whitespace-nowrap w-max">
                {[0, 1].flatMap((ri) =>
                  [
                    "Crypto to Cash",
                    "Pay Suppliers in China",
                    "Multi-currency Wallets",
                    "KYC & AML Compliant",
                    "Real-time FX Rates",
                    "Nigerian Bank Payouts",
                    "Alipay & WeChat Pay",
                  ].map((item) => (
                    <span
                      key={`${ri}-${item}`}
                      className="flex items-center gap-2.5 text-[12.5px] text-white/50 font-medium"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#4ade80] inline-block"
                        style={{ animation: "cpPulse 2s ease-in-out infinite" }}
                      />
                      {item}
                    </span>
                  )),
                )}
              </div>
            </div>

            <div className="max-w-[1100px] mx-auto px-4 md:px-12">
              <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
                <Reveal className="md:flex-[0_1_380px]">
                  <h2
                    className="hero-heading font-extrabold text-white leading-[1.08] tracking-tight mb-4"
                    style={{
                      fontSize: "clamp(28px, 4vw, 52px)",
                      letterSpacing: "-1px",
                    }}
                  >
                    Built for{" "}
                    <span className="text-[#4ade80]">
                      real
                      <br />
                      global
                    </span>{" "}
                    payments
                  </h2>
                  <p className="text-[15px] text-slate-400 leading-relaxed">
                    ChangPay is designed for everyday financial use. Receive and
                    hold USD, EUR, GBP, NGN, and digital assets, convert funds
                    seamlessly
                  </p>
                </Reveal>
                <Reveal
                  dir="right"
                  className="w-full md:w-auto md:flex-shrink-0"
                >
                  <div className=" rounded-xl overflow-hidden p-3 w-full md:w-[clamp(260px,34vw,380px)]">
                    <Image
                      src="/changpay_brain.png"
                      alt="Globe"
                      width={760}
                      height={620}
                      className="w-full h-auto block rounded-xl"
                    />
                  </div>
                </Reveal>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
                {[
                  {
                    Icon: IBook,
                    text: "Turning digital assets into spendable cash",
                  },
                  {
                    Icon: IUsers,
                    text: "Paying Chinese suppliers efficiently",
                  },
                  { Icon: IUsers, text: "Managing funds across currencies" },
                  {
                    Icon: IUsers,
                    text: "Keeping accurate transaction records",
                  },
                ].map((c, i) => (
                  <Reveal key={c.text} delay={i * 65}>
                    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all h-full">
                      <div className="w-[34px] h-[34px] rounded-lg bg-[#f0fdf4] flex items-center justify-center mb-3.5">
                        <c.Icon />
                      </div>
                      <p className="text-[13.5px] text-gray-700 leading-snug font-medium">
                        {c.text}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={220}>
                <p className="text-[12.5px] text-[#4a7c5a] italic">
                  Every feature is designed around clarity, control, and
                  compliance.
                </p>
              </Reveal>
            </div>
          </section>

          <section className=" bg-[#f0fdf4] px-4 md:px-12 py-16 md:py-20">
            <div className="max-w-[1100px] text-center mx-auto">
              <Reveal>
                <span className="inline-block bg-[#16a34a] text-white text-[11px] font-bold tracking-[.6px] uppercase px-3 py-1 rounded-full mb-4">
                  Our Services
                </span>
                <h2
                  className="hero-heading font-black leading-[1.08] tracking-tight mb-3"
                  style={{
                    fontSize: "clamp(28px, 4vw, 44px)",
                    letterSpacing: "-1px",
                  }}
                >
                  Everything you need to
                  <br />
                  move money globally
                </h2>
                <p className="text-[15px] text-center text-slate-400 leading-relaxed mb-12">
                  We offer secure and seamless services for converting
                  cryptocurrency, paying Chinese merchants, and managing
                  multi-currency wallets; enabling instant global transactions
                  with ease.
                </p>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                
                <Reveal delay={80}>
                  <div className="bg-white rounded-2xl p-7 relative hover:-translate-y-1 hover:shadow-2xl transition-all h-full flex flex-col">
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#f97316] text-white text-[10px] font-bold tracking-[.8px] uppercase px-3.5 py-1 rounded-full whitespace-nowrap">
                      Most Popular
                    </span>
                    <div className="w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-[#1a7a4a] to-[#16a34a] flex items-center justify-center mb-5">
                      <IUsers filled />
                    </div>
                    <p className="text-[17px] font-bold text-[#0d2218] mb-2.5">
                      Send Money to Chinese Merchants
                    </p>
                    <p className="text-[13.5px] text-gray-500 leading-[1.7] mb-5 flex-1">
                      Pay merchants in China directly via Alipay, WeChat Pay, or
                      Chinese bank accounts with faster and more affordably than
                      traditional banking routes.
                    </p>
                    <a
                      href="/pay-to-china"
                      className="text-[13px] font-semibold text-[#16a34a] flex items-center gap-1.5 no-underline group"
                    >
                      Learn more
                      <svg
                        className="group-hover:translate-x-1 transition-transform"
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="#16a34a"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </Reveal>

                <Reveal delay={160}>
                  <div className="bg-white rounded-2xl p-7 hover:-translate-y-1 hover:shadow-2xl transition-all h-full flex flex-col">
                    <div className="w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-[#1a7a4a] to-[#16a34a] flex items-center justify-center mb-5">
                      <IBank filled />
                    </div>
                    <p className="text-[17px] font-bold text-[#0d2218] mb-2.5">
                      Wallet Management
                      <span className="inline-block bg-[#f0fdf4] text-[#16a34a] text-[10px] font-bold tracking-[.5px] px-2 py-0.5 rounded-full ml-2 border border-[#bbf7d0] align-middle">
                        Coming Soon
                      </span>
                    </p>
                    <p className="text-[13.5px] text-gray-500 leading-[1.7] mb-5 flex-1">
                      Operate your NGN, USD, EURO, or GBP wallets, send
                      and receive money, and easily convert between them.
                      Real-time balances, internal transfers, and full
                      transaction records.
                    </p>
                    <span className="text-[13px] font-semibold text-gray-300 flex items-center gap-1.5 cursor-default">
                      Available soon
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={0}>
                  <div className="bg-white rounded-2xl p-7 hover:-translate-y-1 hover:shadow-2xl transition-all h-full flex flex-col">
                    <div className="w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-[#1a7a4a] to-[#16a34a] flex items-center justify-center mb-5">
                      <IBolt filled />
                    </div>
                    <p className="text-[17px] font-bold text-[#0d2218] mb-2.5">
                      Crypto to Cash
                    </p>
                    <p className="text-[13.5px] text-gray-500 leading-[1.7] mb-5 flex-1">
                      Convert crypto like Bitcoin, ETH, SOL and USDT into NGN,
                      USD, EUR, or GBP in real-time. Fast settlement, transparent
                      rates, with blockchain confirmations monitored live.
                    </p>
                    <a
                      href="/crypto-to-cash"
                      className="text-[13px] font-semibold text-[#16a34a] flex items-center gap-1.5 no-underline group"
                    >
                      Learn more
                      <svg
                        className="group-hover:translate-x-1 transition-transform"
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="#16a34a"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={200}>
                <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <p className="text-[14px] text-slate-400 leading-relaxed max-w-[400px]">
                    Whether you're an individual or a business, ChangPay
                    empowers you to take full control of your financial
                    transactions; securely, instantly, and transparently.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          <section className="bg-[#0d2218] px-4 md:px-12 py-16">
            <div className="max-w-[700px] mx-auto bg-[#132e20] border border-[#4ade80]/10 rounded-[20px] px-8 md:px-14 py-14 text-center">
              <Reveal>
                <h2
                  className="hero-heading font-black text-white leading-tight mb-4"
                  style={{ fontSize: "clamp(22px,3.5vw,34px)" }}
                >
                  Ready to Simplify your Global
                  <br />
                  Payments with ChangPay?
                </h2>
                <p className="text-[15px] text-slate-400 leading-relaxed max-w-[480px] mx-auto mb-8">
                  Convert, send, and receive money securely and instantly
                  whether it's crypto, or payments to international merchants.
                </p>
                <div className="relative inline-block">
                  <button className="bg-[#16a34a] w-[246px] hover:bg-[#15803d] text-white text-[15px] font-bold px-7 py-3.5 rounded-full border-none cursor-pointer transition-all hover:-translate-y-px">
                    Download our App Today
                  </button>
                  <span className="absolute -top-2 -right-2 bg-[#0d2218] text-[#4ade80] text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none border border-[#4ade80]/30">
                    Coming Soon
                  </span>
                </div>
              </Reveal>
            </div>
          </section>

          <section className="bg-white px-4 md:px-12 py-16 md:py-20">
            <div className="max-w-[1100px] mx-auto">
              <Reveal className="text-center mb-12">
                <span className="inline-block border border-gray-200 text-gray-500 text-[11px] font-semibold tracking-[.6px] uppercase px-4 py-1 rounded-full mb-4">
                  Our Advantage
                </span>
                <h2
                  className="hero-heading font-black text-[#0d2218] mb-3"
                  style={{ fontSize: "clamp(26px,3.5vw,40px)" }}
                >
                  What Sets Us Apart
                </h2>
                <p className="text-[15px] text-gray-500 leading-relaxed max-w-[580px] mx-auto">
                  Whether you're an individual, a small business, or an
                  enterprise, ChangPay empowers you to take full control of your
                  financial transactions.
                </p>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: <IBolt filled />,
                    title: "24/7 Exceptional Support",
                    desc: "Our dedicated support team is always available to guide you through any step of your financial journey.",
                  },
                  {
                    icon: <IShield filled />,
                    title: "Security & Transparency",
                    desc: "Our platform is designed with the highest standards of security, ensuring your transactions are always safe and fully visible.",
                  },
                  {
                    icon: <IUsers filled />,
                    title: "Customer-Centric Approach",
                    desc: "We are committed to providing exceptional customer support to guide you through every step of your digital financial journey.",
                  },
                ].map((item, i) => (
                  <Reveal key={item.title} delay={i * 80}>
                    <div className="bg-[#f8fafb] border border-gray-100 rounded-2xl p-7 text-center hover:-translate-y-1 hover:shadow-lg transition-all h-full">
                      <div className="w-14 h-14 rounded-[14px] bg-gradient-to-br from-[#1a7a4a] to-[#16a34a] flex items-center justify-center mx-auto mb-5">
                        {item.icon}
                      </div>
                      <h3 className="text-[16px] font-bold text-[#0d2218] mb-2.5">
                        {item.title}
                      </h3>
                      <p className="text-[13.5px] text-gray-500 leading-[1.7]">
                        {item.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[#f0fdf4] px-4 md:px-12 py-16 md:py-20">
            <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
              <Reveal dir="left">
                <div className="bg-[#0d2218] rounded-[20px] p-8">
                  <p className="text-[11px] font-bold text-[#4ade80] tracking-[.6px] uppercase mb-5">
                    Wallet Overview
                  </p>
                  {[
                    {
                      label: "BTC → NGN",
                      sub: "Crypto conversion",
                      amount: "+₦420,000",
                    },
                    {
                      label: "Pay to China",
                      sub: "Alipay · Supplier payment",
                      amount: "¥3,200",
                    },
                    {
                      label: "NGN → USD",
                      sub: "Wallet settlement",
                      amount: "+$850",
                    },
                  ].map((tx) => (
                    <div
                      key={tx.label}
                      className="flex items-center gap-3 py-3.5 border-b border-white/5 last:border-b-0"
                    >
                      <div className="w-9 h-9 rounded-[10px] bg-[#16a34a] flex items-center justify-center flex-shrink-0">
                        <IBolt filled />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-[#d9f5db]">
                          {tx.label}
                        </p>
                        <p className="text-[12px] text-[#6b9e7a]">{tx.sub}</p>
                      </div>
                      <span className="text-[13px] font-bold text-[#4ade80]">
                        {tx.amount}
                      </span>
                    </div>
                  ))}
                  {/* <div className="flex justify-between items-center mt-5 pt-4 border-t border-white/5">
                  <span className="text-[12px] text-[#6b9e7a]">
                    Total settled this week
                  </span>
                  <span className="text-[15px] font-bold text-[#4ade80]">
                    $12,480
                  </span>
                </div> */}
                </div>
              </Reveal>

              {/* Text */}
              <Reveal dir="right" delay={80}>
                <span className="inline-block border border-gray-300 text-gray-500 text-[11px] font-semibold tracking-[.6px] uppercase px-4 py-1 rounded-full mb-4">
                  Trusted by Businesses
                </span>
                <h2
                  className="hero-heading font-black text-[#0d2218] leading-tight mb-4"
                  style={{ fontSize: "clamp(24px,3vw,38px)" }}
                >
                  Why Businesses Trust ChangPay as Their Leading Partner
                </h2>
                <p className="text-[15px] text-gray-500 leading-relaxed mb-8">
                  Join the businesses already enhancing their financial
                  operations with ChangPay. Built for speed, security, and
                  scale.
                </p>
                <div className="flex flex-col gap-5 mb-8">
                  {[
                    {
                      title: "Instant Payments",
                      desc: "Send and receive money globally in real-time, making your financial operations faster and more efficient.",
                    },
                    {
                      title: "Seamless Transactions",
                      desc: "Easily convert cryptocurrencies and manage multiple wallets (NGN, USD, EUR, GBP) with no hassle.",
                    },
                    {
                      title: "24/7 Exceptional Support",
                      desc: "Our dedicated support team is always available to guide you through any step of your financial journey.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#16a34a] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-[#0d2218] mb-1">
                          {item.title}
                        </p>
                        <p className="text-[13px] text-gray-500 leading-[1.65]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="relative inline-block">
                  <button className="flex items-center justify-center w-[246px] gap-2 bg-[#0d2218] hover:bg-[#1b3d2a] text-[#4ade80] text-[14px] font-bold px-7 py-3.5 rounded-full border-none cursor-pointer transition-all hover:-translate-y-px">
                    Download for Android
                  </button>
                  <span className="absolute -top-2 -right-2 bg-[#16a34a] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                    Coming Soon
                  </span>
                </div>
              </Reveal>
            </div>
          </section>

          <section className="bg-white px-4 md:px-12 py-20 md:py-24">
            <div className="max-w-[1100px] mx-auto">
              <Reveal className="text-center mb-14">
                <h2
                  className="hero-heading font-black text-[#16a34a] tracking-tight mb-3"
                  style={{
                    fontSize: "clamp(24px, 4vw, 48px)",
                    letterSpacing: "-1px",
                  }}
                >
                  Built for individuals and businesses
                </h2>
                <p className="text-[25px] text-[#0A0A0A] mx-auto">
                  ChangPay supports different usage patterns without changing
                  the core system.
                </p>
              </Reveal>

              <Reveal className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-stretch">
                  <div className="flex flex-col justify-center py-10 px-2">
                    <p className="text-[16px] font-bold text-gray-900 mb-4">
                      For individuals
                    </p>
                    <ul className="list-disc pl-5 flex flex-col gap-2.5">
                      {[
                        "Simple conversions",
                        "Fast cash access",
                        "Clear transaction history",
                      ].map((item) => (
                        <li key={item} className="text-[15px] text-gray-600">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative bg-[#e8f5e9] rounded-[16px] overflow-hidden min-h-[240px] md:min-h-[280px]">
                    <Image
                      src="/Home1.png"
                      alt="Individuals"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-stretch">
                  <div className="relative bg-[#e8f5e9] rounded-[16px] overflow-hidden min-h-[240px] md:min-h-[280px] order-last md:order-first">
                    <Image
                      src="/Home2.png"
                      alt="Businesses"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex flex-col justify-center py-10 px-2">
                    <p className="text-[16px] font-bold text-gray-900 mb-4">
                      For businesses
                    </p>
                    <ul className="list-disc pl-5 flex flex-col gap-2.5">
                      {[
                        "Supplier payments",
                        "Repeat transactions",
                        "Predictable settlement",
                        "Clear records for accounting",
                      ].map((item) => (
                        <li key={item} className="text-[15px] text-gray-600">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section
            id="how-it-works"
            className="px-4 md:px-12 pb-20 md:pb-24 mt-10"
          >
            <div className="max-w-[1100px] mx-auto">
              <div className="flex flex-col md:flex-row rounded-[20px] overflow-hidden">
                <div className="bg-[#0d2218] w-full md:w-[50%] p-8 md:p-14 flex flex-col justify-center">
                  <Reveal>
                    <h2
                      className="hero-heading font-extrabold text-white leading-tight mb-10"
                      style={{ fontSize: "clamp(20px, 3vw, 36px)" }}
                    >
                      How ChangPay works
                      <br />
                      as a fintech platform
                    </h2>
                  </Reveal>
                  <div className="flex flex-col gap-0">
                    {[
                      {
                        n: "1",
                        t: "Account creation",
                        d: "Users register with email or phone number.",
                      },
                      {
                        n: "2",
                        t: "Security and verification",
                        d: "2FA, device authorization, and identity checks protect access.",
                      },
                      {
                        n: "3",
                        t: "Funding and conversion",
                        d: "Users add funds or convert value through supported services.",
                      },
                      {
                        n: "4",
                        t: "Execution and settlement",
                        d: "Transactions are processed with rate locking, monitoring, and confirmation.",
                      },
                      {
                        n: "5",
                        t: "Records and notifications",
                        d: "Receipts, alerts, and transaction histories are always available.",
                      },
                    ].map((step, i) => (
                      <Reveal key={step.n} delay={i * 80}>
                        <div
                          className={`flex gap-4 relative ${i < 4 ? "pb-6" : ""}`}
                        >
                          {i < 4 && <div className="step-line" />}
                          <div className="w-[30px] h-[30px] rounded-full bg-[#16a34a] flex items-center justify-center text-[13px] font-bold text-[#D9F5DB] flex-shrink-0 z-10">
                            {step.n}
                          </div>
                          <div>
                            <p className="text-[14px] font-bold text-[#D9F5DB] mb-0.5">
                              {step.t}
                            </p>
                            <p className="text-[12px] font-small text-[#D9F5DB]">
                              {step.d}
                            </p>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>

                <div className="flex-1 bg-[#e8f5e9] flex items-center justify-center">
                  <Reveal
                    dir="right"
                    className="w-full h-full flex items-center justify-center"
                  >
                    <div
                      className="relative w-full h-full"
                      style={{ minHeight: "460px" }}
                    >
                      <Image
                        src="/Image(5).png"
                        alt="How ChangPay works"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 60vw"
                        priority
                      />
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#0d2218] px-4 md:px-12 py-20 md:py-24 mb-10">
            <div className="max-w-[1100px] mx-auto">
              <Reveal className="text-center mb-14">
                <h2
                  className="hero-heading font-extrabold text-[#4ade80] tracking-tight mb-3"
                  style={{
                    fontSize: "clamp(22px, 3.2vw, 40px)",
                    letterSpacing: "-.5px",
                  }}
                >
                  Security, compliance, and risk controls
                </h2>
                <p className="text-[15px] text-slate-400">
                  ChangPay is built with financial safeguards expected of modern
                  fintech platforms.
                </p>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { Icon: ILock, label: "Encrypted transactions" },
                  { Icon: IPhone, label: "Device and biometric security" },
                  { Icon: IShield, label: "Continuous fraud monitoring" },
                  { Icon: IBook, label: "KYC and AML checks" },
                  { Icon: IFilter, label: "Transaction screening and limits" },
                  { Icon: IBank, label: "Regulated bank payout integrations" },
                ].map((c, i) => (
                  <Reveal key={c.label} delay={i * 55}>
                    <div className="bg-white rounded-xl p-6 md:p-7">
                      <div className="w-9 h-9 rounded-[9px] bg-[#f0fdf4] flex items-center justify-center mb-4">
                        <c.Icon />
                      </div>
                      <p className="text-[14px] text-gray-900 font-medium">
                        {c.label}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={380} className="text-center mt-9">
                <p className="text-[19px] text-[#ffffff]">
                  Security is applied quietly and consistently without
                  disrupting use.
                </p>
              </Reveal>
            </div>
          </section>

          <section className="px-4 md:px-12 pb-20 md:pb-24">
            <Reveal>
              <div
                className="max-w-[1100px] mx-auto px-6 md:px-12 py-16 md:py-20 text-center relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg,#15803d 0%,#16a34a 60%,#22c55e 100%)",
                }}
              >
                <div className="absolute top-[-60px] right-[-60px] w-[220px] h-[220px] rounded-full bg-white/5 pointer-events-none" />
                <div className="absolute bottom-[-50px] left-[-50px] w-[180px] h-[180px] rounded-full bg-white/4 pointer-events-none" />
                <h2
                  className="hero-heading font-black text-white mb-3.5 tracking-tight relative"
                  style={{
                    fontSize: "clamp(26px, 4vw, 48px)",
                    letterSpacing: "-1px",
                  }}
                >
                  start with clarity
                </h2>
                <p className="text-[15px] text-white/80 mb-9 relative max-w-md mx-auto">
                  Create a ChangPay account and access financial tools built for
                  real use not speculation.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center relative">
                  <div className="relative inline-block">
                  <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#01322F] hover:bg-[#1b3d2a] text-[#009F51] text-[15px] w-[246px] font-bold px-7 py-3.5 rounded-full border-none cursor-pointer transition-all hover:-translate-y-px hover:shadow-xl">
                    Download for Android
                  </button>
                   <span className="absolute -top-2 -right-2 bg-[#ffffff] text-[#16a34a] text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                    Coming Soon
                  </span>
                  </div>
                  <button
                    onClick={() => router.push("/pay-to-china")}
                    className="w-full sm:w-auto bg-[#FFFFFF] w-[246px] text-[#0A0A0A] text-[15px] font-semibold px-7 py-3.5 rounded-full border border-white/40 cursor-pointer transition-all hover:bg-white/10 hover:-translate-y-px hover:text-[#0A0A0A]"
                  >
                    Learn how ChangPay works
                  </button>
                </div>
              </div>
            </Reveal>
          </section>
        </main>
      </div>
      <Modal isOpen={isWaitlistModalOpen} onClose={closeWaitlistModal}>
        <WaitlistForm onClose={closeWaitlistModal} isModal={true} />
      </Modal>
    </>
  );
}
