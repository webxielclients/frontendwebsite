"use client";

import {
  useState,
  useEffect,
  useRef,
  ReactNode,
  RefObject,
  useCallback,
} from "react";
import Image from "next/image";

function useInView(threshold = 0.12): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
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
  return [ref, inView];
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  dir?: "up" | "down" | "left" | "right";
  className?: string;
}
function Reveal({ children, delay = 0, dir = "up", className = "" }: RevealProps) {
  const [ref, inView] = useInView();
  const translate: Record<string, string> = {
    up: "translateY(28px)",
    down: "translateY(-28px)",
    left: "translateX(-28px)",
    right: "translateX(28px)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : translate[dir],
        transition: `opacity .65s cubic-bezier(.16,1,.3,1) ${delay}ms,
                   transform .65s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

interface FieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  as?: "input" | "textarea";
  rows?: number;
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

function Field({
  label, id, type = "text", placeholder, as: Tag = "input",
  rows, value, onChange, error,
}: FieldProps) {
  const base = `w-full border rounded-lg px-4 py-3 text-[14px] text-gray-800 placeholder-gray-400 
    focus:outline-none focus:ring-1 transition-colors bg-white 
    ${
      error
        ? "border-red-400 focus:border-red-400 focus:ring-red-400"
        : "border-gray-300 focus:border-[#16a34a] focus:ring-[#16a34a]"
    }`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-medium text-gray-700">
        {label}
      </label>
      {Tag === "textarea" ? (
        <textarea
          id={id}
          placeholder={placeholder}
          rows={rows ?? 7}
          className={`${base} resize-none`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={base}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {error && <p className="text-[12px] text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!;

interface TurnstileWidgetProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire: () => void;
}

function TurnstileWidget({ siteKey, onVerify, onExpire }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!siteKey) return;

    function renderWidget() {
      if (!containerRef.current || widgetIdRef.current !== null || !window.turnstile) return;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: onVerify,
        "expired-callback": onExpire,
        theme: "light",
      });
    }

    if (window.turnstile) { renderWidget(); return; }

    const existing = document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]');
    if (existing) {
      existing.addEventListener("load", renderWidget, { once: true });
    } else {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = renderWidget;
      document.head.appendChild(script);
    }

    return () => {
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, onVerify, onExpire]);

  return (
    <div className="flex flex-col gap-1.5">
      <div ref={containerRef} />
    </div>
  );
}


function EmailIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#16a34a]"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#16a34a]"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.93 3.3 2 2 0 0 1 3.89 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ContactInfoCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
      {/* Email Card */}
      <div className="flex items-start gap-4 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] px-5 py-5 transition-shadow hover:shadow-md">
        <div className="mt-0.5 shrink-0 w-10 h-10 rounded-full bg-white border border-[#bbf7d0] flex items-center justify-center shadow-sm">
          <EmailIcon />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-semibold text-[#0d3b2e] uppercase tracking-wide">
            Email Us
          </span>
          <a
            href="mailto:support@usechangpay.com"
            className="text-[14px] font-medium text-gray-800 hover:text-[#16a34a] transition-colors break-all"
          >
            support@usechangpay.com
          </a>
          <span className="text-[12px] text-[#16a34a] font-medium mt-0.5">
            Response in 2–4 hours
          </span>
        </div>
      </div>

      {/* Phone Card */}
      <div className="flex items-start gap-4 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] px-5 py-5 transition-shadow hover:shadow-md">
        <div className="mt-0.5 shrink-0 w-10 h-10 rounded-full bg-white border border-[#bbf7d0] flex items-center justify-center shadow-sm">
          <PhoneIcon />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-semibold text-[#0d3b2e] uppercase tracking-wide">
            Call Us
          </span>
          <a
            href="tel:+234 704 276-4245"
            className="text-[14px] font-medium text-gray-800 hover:text-[#16a34a] transition-colors"
          >
            +234 704 276-4245
          </a>
          <span className="text-[12px] text-[#16a34a] font-medium mt-0.5">
            Available 9AM – 6PM EST
          </span>
        </div>
      </div>
    </div>
  );
}


type FormState = "idle" | "loading" | "success" | "error";

const EMPTY = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
  website: "",
};

export default function ContactPage() {
  const [heroIn, setHeroIn] = useState(false);
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<typeof EMPTY>>({});
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = () => {};
    window.addEventListener("turnstile:ready", handler, { once: true });
    return () => window.removeEventListener("turnstile:ready", handler);
  }, []);

  const set = (key: keyof typeof EMPTY) => (val: string) => {
    setFields((f) => ({ ...f, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const e: Partial<typeof EMPTY> = {};
    if (!fields.firstName.trim()) e.firstName = "First name is required.";
    if (!fields.lastName.trim()) e.lastName = "Last name is required.";
    if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      e.email = "A valid email is required.";
    if (!fields.message.trim()) e.message = "Please leave a message.";
    return e;
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const errs = validate();
      setErrors(errs);

      if (!turnstileToken) {
        setTurnstileError("Please complete the security check.");
      } else {
        setTurnstileError("");
      }

      if (Object.keys(errs).length || !turnstileToken) return;

      setFormState("loading");
      setApiError("");

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          body: JSON.stringify({
            first_name: fields.firstName,
            last_name: fields.lastName,
            email: fields.email,
            phone: fields.phone,
            message: fields.message,
            website: fields.website,
            turnstile_token: turnstileToken,
          }),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          setApiError(data?.message ?? "Something went wrong. Please try again.");
          setFormState("error");
          setTurnstileToken("");
          return;
        }

        setFormState("success");
        setFields(EMPTY);
      } catch {
        setApiError("Network error. Please check your connection and try again.");
        setFormState("error");
      }
    },
    [fields, turnstileToken],
  );

  return (
    <div className="font-sans text-gray-900 bg-white overflow-x-hidden">
      <main>
        <div
          className="hidden md:block w-full relative overflow-hidden"
          style={{ opacity: heroIn ? 1 : 0, transition: "opacity .8s ease", height: 220 }}
        >
          <Image
            src="/Contactimage.png"
            alt="Contact ChangPay"
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
              You can reach us anytime via{" "}
              <a
                href="mailto:support@usechangpay.com"
                className="text-[#16a34a] font-medium hover:underline transition-all"
              >
                support@usechangpay.com
              </a>
            </p>
          </Reveal>

          {formState === "success" ? (
            <Reveal>
              <div className="text-center py-16 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-[#16a34a]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-[22px] font-bold text-[#0d3b2e]">Message Sent!</h2>
                <p className="text-gray-500 text-[15px] max-w-[340px]">
                  Thanks for reaching out. We&apos;ll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-2 text-[14px] text-[#16a34a] font-medium hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>

              {/* Cards shown on success state too */}
              <Reveal delay={120}>
                <ContactInfoCards />
              </Reveal>
            </Reveal>
          ) : (
            <Reveal delay={80}>
              <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field
                    label="First name"
                    id="first-name"
                    placeholder="First name"
                    value={fields.firstName}
                    onChange={set("firstName")}
                    error={errors.firstName}
                  />
                  <Field
                    label="Last name"
                    id="last-name"
                    placeholder="Last name"
                    value={fields.lastName}
                    onChange={set("lastName")}
                    error={errors.lastName}
                  />
                </div>
                <Field
                  label="Email"
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={fields.email}
                  onChange={set("email")}
                  error={errors.email}
                />
                <Field
                  label="Phone number"
                  id="phone"
                  type="tel"
                  placeholder="Phone number"
                  value={fields.phone}
                  onChange={set("phone")}
                />
                <Field
                  label="Message"
                  id="message"
                  as="textarea"
                  placeholder="Leave us a message"
                  rows={7}
                  value={fields.message}
                  onChange={set("message")}
                  error={errors.message}
                />

                {/* Honeypot */}
                <div
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
                >
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={fields.website}
                    onChange={(e) => setFields((f) => ({ ...f, website: e.target.value }))}
                  />
                </div>

                <TurnstileWidget
                  siteKey={TURNSTILE_SITE_KEY}
                  onVerify={(token) => {
                    setTurnstileToken(token);
                    setTurnstileError("");
                  }}
                  onExpire={() => setTurnstileToken("")}
                />
                {turnstileError && (
                  <p className="text-[12px] text-red-500 -mt-3">{turnstileError}</p>
                )}

                {apiError && (
                  <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-[13px] text-red-600">
                    {apiError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="w-full bg-[#16a34a] hover:bg-[#15803d] active:bg-[#14532d] disabled:opacity-60 
                    disabled:cursor-not-allowed text-white font-semibold text-[15px] py-4 rounded-lg 
                    transition-colors cursor-pointer border-none mt-1 flex items-center justify-center gap-2"
                >
                  {formState === "loading" ? (
                    <>
                      <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>

              {/* ── Contact Info Cards ── */}
              <Reveal delay={160}>
                <ContactInfoCards />
              </Reveal>
            </Reveal>
          )}
        </section>
      </main>
    </div>
  );
}