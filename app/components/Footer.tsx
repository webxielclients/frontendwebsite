import Link from "next/link";
import { ApplePayFooter,GooglePlayFooter, LinkedInIcon } from "@/public/icons";

function SocialBtn({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  return (
      <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#16a34a] hover:border-[#16a34a] flex items-center justify-center transition-all hover:-translate-y-0.5"
    >
      {children}
    </a>
  );
}

function StoreBtn({ store }: { store: "google" | "apple" }) {
  const isGoogle = store === "google";
  return (
    <div className="relative">
      <div className="flex items-center gap-2.5 bg-[#132e20] border border-[#4ade80]/15 hover:border-[#4ade80]/40 rounded-[10px] px-4 py-2.5 transition-colors cursor-pointer min-w-[180px]">
        {isGoogle ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3.18 1.03C2.47 1.43 2 2.17 2 3.03v17.94c0 .86.47 1.6 1.18 2l10.36-10.97L3.18 1.03z" fill="#EA4335"/>
            <path d="M20.3 10.27l-2.8-1.57-3.17 3.3 3.17 3.3 2.83-1.59c.81-.45.81-1.99-.03-2.44z" fill="#FBBC04"/>
            <path d="M3.18 22.97c.2.12.43.18.67.18.38 0 .75-.11 1.07-.3l12.3-6.9-3.17-3.3-10.87 10.32z" fill="#34A853"/>
            <path d="M3.18 1.03L14.05 11.97l-3.17-3.3L4.92 1.31A2.06 2.06 0 003.18 1.03z" fill="#4285F4"/>
          </svg>
        ) : (
          <svg width="17" height="20" viewBox="0 0 17 22" fill="white">
            <path d="M14.93 11.5c-.02-2.48 2.03-3.67 2.12-3.73-1.16-1.69-2.95-1.92-3.59-1.95-1.53-.16-2.98.9-3.76.9-.78 0-1.99-.88-3.27-.85-1.68.02-3.23.98-4.1 2.48-1.74 3.02-.45 7.51 1.25 9.97.83 1.2 1.82 2.55 3.12 2.5 1.25-.05 1.73-.81 3.24-.81 1.51 0 1.94.81 3.27.79 1.35-.02 2.2-1.22 3.02-2.43 1-1.4 1.4-2.74 1.42-2.81-.03-.01-2.72-1.04-2.74-4.07z"/>
            <path d="M12.38 4.06c.69-.84 1.16-2 1.03-3.16-1 .04-2.2.67-2.91 1.49-.64.73-1.2 1.9-1.05 3.02 1.11.09 2.24-.57 2.93-1.35z"/>
          </svg>
        )}
        <div className="flex flex-col leading-tight">
          <span className="text-[9px] text-white/40">{isGoogle ? "GET IT ON" : "Download on the"}</span>
          <span className="text-[13px] font-bold text-white">{isGoogle ? "Google Play" : "App Store"}</span>
        </div>
      </div>
      <span className="absolute -top-2 -right-2 bg-[#16a34a] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full leading-none whitespace-nowrap">
        Coming Soon
      </span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      className="bg-[#0d2218] pt-12 pb-7 px-4 md:px-12"
      style={{ fontFamily: "-apple-system, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif" }}
    >
      <div className="max-w-[1100px] mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-10 md:gap-12 pb-10 border-b border-white/8">

          <div>
            <p className="text-[11px] font-bold text-white/35 tracking-[.6px] uppercase mb-4">Contact Us</p>
             <p className="text-[11px] font-bold text-white/45 tracking-[.6px] max-w-[300px] w-full uppercase mb-4">ChangPay provides fast, reliable payment infrastructure designed for seamless transactions and high availability</p>
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>,
                  circle: <circle cx="12" cy="10" r="3"/>,
                  text: "Lagos, Nigeria",
                },
                {
                  icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
                  text: "support@usechangpay.com",
                },
                {
                  icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l1.36-1.36a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>,
                  text: "+234 704 276-4245",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 flex-shrink-0">
                    {item.icon}
                    {item.circle}
                  </svg>
                  <span className="text-[13px] text-white/65">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-12">
            {[
              { heading: "Features", links: [{ label: "Crypto to Cash", href: "/crypto-to-cash" }, { label: "Pay to China", href: "/pay-to-china" }, {label: "Multi-currency exchange", href: "/multi-currency"}] },
              { heading: "About", links: [{ label: "Company", href: "/about" }, { label: "FAQ", href: "/faq" }] },
            ].map(({ heading, links }) => (
              <div key={heading} className="flex flex-col gap-2.5">
                <p className="text-[11px] font-bold text-white/35 tracking-[.6px] uppercase mb-1">{heading}</p>
                {links.map(({ label, href }) => (
                  <Link key={label} href={href} className="text-[13px] text-white/60 hover:text-[#4ade80] transition-colors no-underline">
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <div className="relative self-start">
            <GooglePlayFooter />
             <span className="absolute -top-2 -right-2 bg-[#ffffff] text-gray-500 text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none whitespace-nowrap">
              Coming Soon
              </span>
              </div>
            <div className="relative self-start">
            <ApplePayFooter />
            <span className="absolute -top-2 -right-2 bg-[#ffffff] text-gray-500 text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none whitespace-nowrap">
              Coming soon
            </span>
          </div>
        </div>

        <div className="pt-6">
          <div className="flex items-center gap-4 mb-3">
            <Link href="/terms" className="text-[12px] text-white/40 hover:text-[#4ade80] transition-colors no-underline">
              Terms and Conditions
            </Link>
            <span className="w-px h-3 bg-white/15" />
            <Link href="/policy" className="text-[12px] text-white/40 hover:text-[#4ade80] transition-colors no-underline">
              Privacy Policy
            </Link>
            
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="text-[12px] text-white/30">© 2026 ChangPay. All rights reserved.</span>
            <div className="flex gap-2">
              <SocialBtn label="Twitter / X" href="https://x.com/changpayafrica">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </SocialBtn>
              <SocialBtn label="Facebook" href="https://www.facebook.com/share/1Acw74WUx9">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </SocialBtn>
              <SocialBtn label="Instagram" href="https://www.instagram.com/changpayafrica">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/></svg>
              </SocialBtn>
              <SocialBtn label="LinkedIn" href="https://www.linkedin.com/company/usechangpay/">
                <LinkedInIcon />
              </SocialBtn>
            </div>
          </div>
        </div>

      </div>
      </div>
    </footer>
  );
}