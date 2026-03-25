"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { IBook, IUsers, ILayers, IBolt, ILock, IPhone, IShield, IFilter, IBank } from "@/public/icons";

import {useRouter} from 'next/navigation';

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
                    className="hero-heading font-black leading-[1.05] tracking-tight text-[#16a34a] mb-5"
                    style={{
                      fontSize: "clamp(38px, 6vw, 72px)",
                      letterSpacing: "-2px",
                    }}
                  >
                    Turn value into
                    <br />
                    money. Pay
                    <br />
                    where it matters.
                  </h1>
                </div>
                <div
                  className="block md:hidden w-full max-w-[300px] mx-auto mb-6"
                  style={anim(140)}
                >
                  <Image
                    src="/Illustration.png"
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
                    ChangPay helps individuals and businesses convert digital
                    value into usable cash, make cross-border payments, and
                    manage funds across currencies securely and transparently.
                  </p>
                  <p
                    className="text-[15px] text-gray-500 leading-relaxed mb-8 max-w-[420px] mx-auto md:mx-0"
                    style={anim(240)}
                  >
                    It is designed for real financial use: predictable pricing,
                    fast settlement, and clear records.
                  </p>
                  <div
                    className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
                    style={anim(290)}
                  >
                    <button className="w-full sm:w-auto bg-[#0d2218] hover:bg-[#1b3d2a] text-white text-[15px] font-bold px-7 py-3.5 rounded-full border-none cursor-pointer transition-all hover:-translate-y-px hover:shadow-xl">
                      Create an account
                    </button>
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-900 text-[15px] font-semibold px-6 py-3.5 rounded-full border border-gray-200 cursor-pointer transition-all hover:border-[#16a34a] hover:text-[#16a34a] hover:-translate-y-px">
                      How ChangPay works
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="hidden md:block md:w-[46%] max-w-[460px] flex-shrink-0"
                style={anim(150)}
              >
                <Image
                  src="/Illustration.png"
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
              <Reveal style={{ flex: "0 1 380px" }}>
                <h2
                  className="hero-heading font-extrabold text-white leading-[1.08] tracking-tight mb-4"
                  style={{
                    fontSize: "clamp(28px, 4vw, 52px)",
                    letterSpacing: "-1px",
                  }}
                >
                  Platform built around{" "}
                  <span className="text-[#4ade80]">
                    real
                    <br />
                    money
                  </span>{" "}
                  movement
                </h2>
                <p className="text-[15px] text-slate-400 leading-relaxed">
                  ChangPay is not a speculative app. It is built to solve
                  everyday financial problems:
                </p>
              </Reveal>
              <Reveal dir="right" className="w-full md:w-auto md:flex-shrink-0">
                <div className="bg-white rounded-xl overflow-hidden p-3 w-full md:w-[clamp(260px,34vw,380px)]">
                  <Image
                    src="/Image(1).png"
                    alt="Globe"
                    width={760}
                    height={620}
                    className="w-full h-auto block"
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
                { Icon: IUsers, text: "Paying Chinese suppliers efficiently" },
                { Icon: IUsers, text: "Managing funds across currencies" },
                { Icon: IUsers, text: "Keeping accurate transaction records" },
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

        <section className="bg-[#f0fdf4] px-4 md:px-12 py-16 md:py-20">
          <div className="max-w-[1100px] mx-auto">
            <Reveal className="mb-3">
              <h2
                className="hero-heading font-extrabold text-[#16a34a]"
                style={{ fontSize: "clamp(20px, 2.8vw, 32px)" }}
              >
                Sell Gift Cards for Cash
              </h2>
            </Reveal>
            <Reveal delay={60} className="mb-10">
              <p
                className="text-gray-900 leading-snug max-w-[640px]"
                style={{
                  fontSize: "clamp(15px, 1.8vw, 20px)",
                  fontWeight: 700,
                }}
              >
                <strong>ChangPay</strong>{" "}
                <span className="text-gray-400 font-normal">
                  provides a structured way to convert gift cards into cash
                  using automated verification and fraud controls.
                </span>
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
              <div className="flex flex-col gap-3.5">
                {(
                  [
                    {
                      icon: <ILayers />,
                      title: "Supported cards",
                      filled: false,
                      bullets: [
                        "Amazon, Apple, Steam, Sephora, Visa Prepaid,",
                        "and others.",
                      ],
                    },
                    {
                      icon: <IBolt filled />,
                      title: "How it works",
                      filled: true,
                      bullets: [
                        "Users upload a card code or image",
                        "Cards are checked for validity and duplication",
                        "Approved cards are converted at visible rates",
                        "Cash is credited to the selected wallet or bank",
                      ],
                    },
                    {
                      icon: <IUsers />,
                      title: "Who it's for",
                      filled: false,
                      bullets: [
                        "Individuals with unused gift cards",
                        "Merchants handling gift cards as payment",
                        "Operators processing cards at scale",
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
                <Reveal delay={300}>
                  <p className="text-[12px] text-gray-400 italic pt-1">
                    This reduces uncertainty and removes informal resale risks.
                  </p>
                </Reveal>
              </div>
              <Reveal dir="right">
                <div
                  className="relative w-full h-full rounded-[16px] overflow-hidden bg-[#dcfce7]"
                  style={{ minHeight: 420 }}
                >
                  <Image
                    src="/giftcrdhome.png"
                    alt="Sell Gift Cards for Cash"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-[#ffffff] px-4 md:px-12 py-16 md:py-20">
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

        <section className="bg-[#f0fdf4] px-4 md:px-12 py-16 md:py-20">
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
                    debit or credit—ensuring accurate balances and
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

        <section id="how-it-works" className="px-4 md:px-12 pb-20 md:pb-24 mt-10">
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

        <section className="bg-[#0d2218] px-4 md:px-12 py-20 md:py-24">
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
                Security is applied quietly and consistently—without disrupting
                use.
              </p>
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
                ChangPay supports different usage patterns without changing the
                core system.
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
                real use—not speculation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center relative">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#01322F] hover:bg-[#1b3d2a] text-[#009F51] text-[15px] font-bold px-7 py-3.5 rounded-full border-none cursor-pointer transition-all hover:-translate-y-px hover:shadow-xl">
                   Download for Android
                </button>
                <button onClick={() =>router.push('/pay-to-china')} className="w-full sm:w-auto bg-[#FFFFFF] text-[#0A0A0A] text-[15px] font-semibold px-6 py-3.5 rounded-full border border-white/40 cursor-pointer transition-all hover:bg-white/10 hover:-translate-y-px hover:text-[#0A0A0A]">
                  Learn how ChangPay works
                </button>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
