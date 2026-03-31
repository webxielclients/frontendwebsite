"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useToast } from "./hooks/useToast";

interface Option {
  value: string;
  label: string;
}

interface WaitlistFormProps {
  onClose?: () => void;
  isModal?: boolean;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  source: string;
  referral_code: string;
  metadata: {
    interest: string;
    product_type: string;
  };
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  source?: string;
  interest?: string;
  product_type?: string;
}

interface HoneypotState {
  website: string;
}

type Status = "idle" | "loading" | "success" | "error";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!;

const SOURCE_OPTIONS: Option[] = [
  { value: "google", label: "Google" },
  { value: "friend", label: "Friend" },
  { value: "email", label: "Email" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "x", label: "X" },
  { value: "youtube", label: "YouTube" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "tiktok", label: "TikTok" },
  { value: "event", label: "Event" },
  { value: "other", label: "Other" },
];

const INTEREST_OPTIONS: Option[] = [
  { value: "financial-services", label: "Financial Services" },
  { value: "e-commerce-enablement", label: "E-commerce Enablement" },
  { value: "cross-border-payments", label: "Cross-border Payments" },
  { value: "business-solutions", label: "Business Solutions" },
  { value: "consumer-convenience", label: "Consumer Convenience" },
];

const PRODUCT_TYPE_OPTIONS: Option[] = [
  {
    value: "mobile-wallet-digital-wallet",
    label: "Mobile Wallet / Digital Wallet",
  },
  { value: "payment-gateway", label: "Payment Gateway" },
  { value: "money-transfer-service", label: "Money Transfer Service" },
  {
    value: "fintech-platform-b2c-b2b",
    label: "Fintech Platform (B2C and/or B2B)",
  },
  {
    value: "api-based-payment-infrastructure",
    label: "API-based Payment Infrastructure",
  },
];

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  source: "",
  referral_code: "",
  metadata: { interest: "", product_type: "" },
};

interface SelectFieldProps {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

function SelectField({
  id,
  label,
  required,
  optional,
  options,
  value,
  onChange,
  error,
  placeholder,
}: SelectFieldProps) {
  return (
    <div className="wl-field">
      <label htmlFor={id} className="wl-label">
        {label}
        {required && <span className="wl-req"> *</span>}
        {optional && <span className="wl-opt"> (optional)</span>}
      </label>
      <div className="wl-select-wrap">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`wl-select${error ? " wl-input-error" : ""}`}
        >
          <option value="" disabled>
            {placeholder ?? `Select ${label.toLowerCase()}`}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="wl-err-msg">{error}</p>}
    </div>
  );
}

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  tabIndex?: number;
}

function InputField({
  id,
  label,
  type = "text",
  required,
  optional,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
  tabIndex,
}: InputFieldProps) {
  return (
    <div className="wl-field">
      <label htmlFor={id} className="wl-label">
        {label}
        {required && <span className="wl-req"> *</span>}
        {optional && <span className="wl-opt"> (optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`wl-input${error ? " wl-input-error" : ""}`}
        tabIndex={tabIndex}
      />
      {error && <p className="wl-err-msg">{error}</p>}
    </div>
  );
}

interface TurnstileWidgetProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire: () => void;
}

function TurnstileWidget({
  siteKey,
  onVerify,
  onExpire,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!siteKey) return;

    function renderWidget() {
      if (
        !containerRef.current ||
        widgetIdRef.current !== null ||
        !window.turnstile
      )
        return;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: onVerify,
        "expired-callback": onExpire,
        theme: "light",
      });
    }

    if (window.turnstile) {
      renderWidget();
      return;
    }

    const existing = document.querySelector(
      'script[src*="challenges.cloudflare.com/turnstile"]',
    );
    if (existing) {
      existing.addEventListener("load", renderWidget, { once: true });
    } else {
      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
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

  return <div ref={containerRef} />;
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim() || form.name.trim().length < 2)
    errors.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email address.";
  if (!/^[\+\d\s\-()\u0000-\uffff]{7,20}$/.test(form.phone))
    errors.phone = "Enter a valid phone number.";
  if (!form.source) errors.source = "Please select a source.";
  if (!form.metadata.interest)
    errors.interest = "Please select a service of interest.";
  if (!form.metadata.product_type)
    errors.product_type = "Please select a product type.";
  return errors;
}

export default function WaitlistForm({
  onClose,
  isModal = false,
}: WaitlistFormProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [honeypot, setHoneypot] = useState<HoneypotState>({ website: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState(false);
  const { toast } = useToast();

  const [successMessage, setSuccessMessage] = useState("");

  const set = (field: keyof Omit<FormState, "metadata">) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const setMeta = (field: keyof FormState["metadata"]) => (value: string) => {
    setForm((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, [field]: value },
    }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token);
    setCaptchaError(false);
  }, []);

  const handleTurnstileExpire = useCallback(() => setTurnstileToken(null), []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const errs = validate(form);
      setErrors(errs);

      if (!turnstileToken) {
        setCaptchaError(true);
      } else {
        setCaptchaError(false);
      }

      if (Object.keys(errs).length || !turnstileToken) return;

      setStatus("loading");

      try {
        const res = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            source: form.source,
            referral_code: form.referral_code.trim() || null,
            turnstile_token: turnstileToken,
            website: honeypot.website,
            metadata: {
              interest: form.metadata.interest,
              product_type: form.metadata.product_type,
            },
          }),
        });

        const data = await res.json().catch(() => ({}));

        console.log(data);
        console.log(data.message);

        if (!res.ok) throw new Error(data?.message ?? "Request failed");

        setStatus("success");
        setSuccessMessage(
          data.message || "You have been added to the waitlist!",
        );
        toast("success", data.message);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.";
        toast("error", "Submission failed", message);
        setStatus("idle");
      }
    },
    [form, honeypot, turnstileToken, toast],
  );

  if (status === "success") {
    return (
      <div className="wl-root">
        <style>{WL_STYLES}</style>
        <div className="wl-header">
          {isModal && onClose && (
            <button className="wl-close-x" onClick={onClose} aria-label="Close">
              ✕
            </button>
          )}
          <div className="wl-badge">
            <span className="wl-badge-dot" /> Now Accepting Signups
          </div>
          <h2 className="wl-header-title">
            Join the <span>Waitlist</span>
          </h2>
        </div>
        <div className="wl-body">
          <div className="wl-success-wrap">
            <div className="wl-success-ring">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M5 14l6 6L23 8"
                  stroke="#16a34a"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="wl-success-title">You&apos;re on the list!</h3>
            <p className="wl-success-sub">
              {successMessage} We&apos;ll reach out to{" "}
              <strong>{form.email}</strong>. <br /> Please confirm your email to
              secure your spot and stay updated on our launch.
            </p>
            {onClose && (
              <button
                onClick={onClose}
                className="wl-submit"
                style={{ marginTop: 8 }}
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{WL_STYLES}</style>

      <div className="wl-root">
        <div className="wl-header">
          {isModal && onClose && (
            <button className="wl-close-x" onClick={onClose} aria-label="Close">
              ✕
            </button>
          )}
          <div className="wl-badge">
            <span className="wl-badge-dot" />
            Now Accepting Signups
          </div>
          <h2 className="wl-header-title">
            Join the <span>Waitlist</span>
          </h2>
          <p className="wl-header-sub">
            Be among the first to access our platform. Drop your details and
            we&apos;ll reach out when you&apos;re up.
          </p>
        </div>

        <div className="wl-body">
          <form onSubmit={handleSubmit} noValidate>
            <div className="wl-hp" aria-hidden="true">
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot.website}
                onChange={(e) => setHoneypot({ website: e.target.value })}
              />
            </div>

            <p className="wl-section-label">Personal Info</p>

            <div className="wl-row">
              <InputField
                id="name"
                label="Full Name"
                required
                value={form.name}
                onChange={set("name")}
                placeholder="Emmanuel Doe"
                autoComplete="name"
                error={errors.name}
              />
              <InputField
                id="phone"
                label="Phone Number"
                type="tel"
                required
                value={form.phone}
                onChange={set("phone")}
                placeholder="+234 801 234 5678"
                autoComplete="tel"
                error={errors.phone}
              />
            </div>

            <InputField
              id="email"
              label="Email Address"
              type="email"
              required
              value={form.email}
              onChange={set("email")}
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email}
            />

            <hr className="wl-divider" />
            <p className="wl-section-label">Your Interests</p>

            <div className="wl-row">
              <SelectField
                id="interest"
                label="Service of Interest"
                required
                placeholder="Select service interest"
                options={INTEREST_OPTIONS}
                value={form.metadata.interest}
                onChange={setMeta("interest")}
                error={errors.interest}
              />
              <SelectField
                id="product_type"
                label="Product Type"
                required
                placeholder="Select product type"
                options={PRODUCT_TYPE_OPTIONS}
                value={form.metadata.product_type}
                onChange={setMeta("product_type")}
                error={errors.product_type}
              />
            </div>

            <SelectField
              id="source"
              label="How did you hear about us?"
              required
              placeholder="Select source"
              options={SOURCE_OPTIONS}
              value={form.source}
              onChange={set("source")}
              error={errors.source}
            />

            <InputField
              id="referral_code"
              label="Referral Code"
              optional
              value={form.referral_code}
              onChange={set("referral_code")}
              placeholder="e.g. FRIEND123"
              autoComplete="off"
            />

            <hr className="wl-divider" />

            <div className="wl-captcha-wrap">
              <TurnstileWidget
                siteKey={TURNSTILE_SITE_KEY}
                onVerify={handleTurnstileVerify}
                onExpire={handleTurnstileExpire}
              />
              {captchaError && (
                <p className="wl-captcha-err">
                  Please complete the verification above.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="wl-submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <span className="wl-spinner" />
                  Submitting…
                </>
              ) : (
                "Join the Waitlist →"
              )}
            </button>
          </form>

          <p className="wl-privacy">No spam, ever. Your data stays private.</p>
        </div>
      </div>
    </>
  );
}

const WL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

  .wl-root {
    font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    color: #111827;
    width: 100%;
  }

  .wl-header {
    background: linear-gradient(135deg, #012D32 0%, #014d3a 100%);
    padding: 28px 32px 24px;
    border-radius: 20px 20px 0 0;
    position: relative;
    overflow: hidden;
  }

  .wl-header::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 180px; height: 180px;
    background: radial-gradient(circle, rgba(22,163,74,0.25) 0%, transparent 70%);
    border-radius: 50%;
  }

  .wl-header::after {
    content: '';
    position: absolute;
    bottom: -40px; left: 40px;
    width: 120px; height: 120px;
    background: radial-gradient(circle, rgba(22,163,74,0.15) 0%, transparent 70%);
    border-radius: 50%;
  }

  .wl-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(22, 163, 74, 0.18);
    border: 1px solid rgba(22, 163, 74, 0.35);
    color: #86efac;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 100px;
    margin-bottom: 14px;
    position: relative;
    z-index: 1;
  }

  .wl-badge-dot {
    width: 5px; height: 5px;
    background: #4ade80;
    border-radius: 50%;
    animation: wlPulse 2s ease-in-out infinite;
  }

  @keyframes wlPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(0.6); }
  }

  .wl-header-title {
    font-size: clamp(22px, 4vw, 28px);
    font-weight: 800;
    color: #ffffff;
    line-height: 1.15;
    margin-bottom: 6px;
    position: relative;
    z-index: 1;
  }

  .wl-header-title span { color: #4ade80; }

  .wl-header-sub {
    font-size: 13px;
    color: rgba(255,255,255,0.58);
    font-weight: 400;
    line-height: 1.55;
    position: relative;
    z-index: 1;
  }

  .wl-close-x {
    position: absolute;
    top: 16px; right: 16px;
    width: 32px; height: 32px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    z-index: 2;
    transition: background 0.2s;
    color: rgba(255,255,255,0.7);
    font-size: 14px;
    line-height: 1;
  }
  .wl-close-x:hover { background: rgba(255,255,255,0.16); }

  .wl-body {
    padding: 28px 32px 24px;
    background: #ffffff;
    border-radius: 0 0 20px 20px;
  }

  .wl-success-wrap {
    text-align: center;
    padding: 24px 0 16px;
  }

  .wl-success-ring {
    width: 60px; height: 60px;
    background: #f0fdf4;
    border: 2px solid #bbf7d0;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 16px;
  }

  .wl-success-title {
    font-size: 22px;
    font-weight: 800;
    color: #111827;
    margin-bottom: 8px;
  }

  .wl-success-sub {
    color: #6b7280;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 24px;
  }

  .wl-section-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #9ca3af;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .wl-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #f3f4f6;
  }

  .wl-divider {
    border: none;
    border-top: 1px solid #f3f4f6;
    margin: 20px 0;
  }

  .wl-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .wl-field { margin-bottom: 16px; }

  .wl-label {
    display: block;
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #374151;
    margin-bottom: 6px;
  }

  .wl-req { color: #16a34a; }
  .wl-opt {
    color: #9ca3af;
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0;
    font-size: 11px;
  }

  .wl-input,
  .wl-select {
    width: 100%;
    background: #f9fafb;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    color: #111827;
    font-family: inherit;
    font-size: 13.5px;
    padding: 10px 13px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    appearance: none;
  }

  .wl-input::placeholder { color: #9ca3af; }

  .wl-input:focus,
  .wl-select:focus {
    border-color: #16a34a;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
  }

  .wl-input-error { border-color: #ef4444 !important; }

  .wl-select-wrap { position: relative; }
  .wl-select-wrap::after {
    content: '';
    position: absolute;
    right: 13px; top: 50%;
    transform: translateY(-50%);
    width: 0; height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #6b7280;
    pointer-events: none;
  }

  .wl-select option { background: #fff; color: #111827; }

  .wl-err-msg {
    color: #ef4444;
    font-size: 11px;
    margin-top: 4px;
    font-weight: 500;
  }

  .wl-captcha-wrap { margin-bottom: 16px; }
  .wl-captcha-err {
    color: #ef4444;
    font-size: 11px;
    margin-top: 5px;
    font-weight: 500;
  }

  .wl-hp {
    position: absolute;
    left: -9999px;
    top: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
  }

  .wl-submit {
    width: 100%;
    background: #16a34a;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: inherit;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.03em;
    padding: 13px;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .wl-submit:hover:not(:disabled) {
    background: #15803d;
    box-shadow: 0 6px 24px rgba(22, 163, 74, 0.3);
    transform: translateY(-1px);
  }
  .wl-submit:active  { transform: scale(0.99); }
  .wl-submit:disabled { opacity: 0.55; cursor: not-allowed; }

  .wl-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.35);
    border-top-color: #fff;
    border-radius: 50%;
    animation: wlSpin 0.7s linear infinite;
    flex-shrink: 0;
  }

  @keyframes wlSpin { to { transform: rotate(360deg); } }

  .wl-privacy {
    text-align: center;
    font-size: 11px;
    color: #9ca3af;
    margin-top: 12px;
    line-height: 1.6;
  }

  @media (max-width: 480px) {
    .wl-row    { grid-template-columns: 1fr; }
    .wl-header { padding: 22px 20px 18px; }
    .wl-body   { padding: 22px 20px 20px; }
  }
`;
