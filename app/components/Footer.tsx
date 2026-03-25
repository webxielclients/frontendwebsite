import Image from "next/image";
import Link from "next/link";
import { GooglePlay, ApplePay } from "@/public/icons";

function SocialBtn({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full bg-[#1e293b] hover:bg-[#16a34a] flex items-center justify-center transition-all hover:-translate-y-0.5"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const cols = [
    {
      heading: "Features",
      links: [
        { label: "Crypto to Cash", href: "/crypto-to-cash" },
        { label: "Pay to China", href: "/pay-to-china" },
      ],
    },
    {
      heading: "Solutions",
      links: [
        { label: "Terms and Condition", href: "/terms" },
        { label: "Privacy policy page", href: "/policy" },
      ],
    },
    {
      heading: "About",
      links: [
        { label: "Company", href: "/About" },
        { label: "FAQ", href: "/faq" },
      ],
    },
  ];

  return (
    <footer
      className="bg-white pt-14 pb-8 px-4 md:px-12"
      style={{
        fontFamily:
          "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between gap-10 pb-12">
          <div className="flex flex-col gap-3">
            <div className="relative inline-block">
              <GooglePlay />
              <span className="absolute -top-2 -right-2 bg-[#16a34a] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
               Coming Soon
              </span>
            </div>
            <div className="relative inline-block">
              <ApplePay />
              <span className="absolute -top-2 -right-2 bg-[#16a34a] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                Coming Soon
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-x-14 gap-y-8">
            {cols.map(({ heading, links }) => (
              <div
                key={heading}
                className="flex flex-col items-center md:items-start gap-2.5"
              >
                <p className="text-[13px] font-semibold text-gray-700 mb-1">
                  {heading}
                </p>
                {links.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="text-[13px] text-gray-400 hover:text-[#16a34a] transition-colors no-underline"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom — copyright + social */}
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-4 pt-6">
          <span className="text-[12.5px] text-gray-400">
            © 2026 ChangPay. All right reserved
          </span>

          <div className="flex gap-3">
            <SocialBtn label="Twitter / X" href="https://x.com/changpayafrica">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </SocialBtn>
            <SocialBtn
              label="Facebook"
              href="https://www.facebook.com/share/1Acw74WUx9"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </SocialBtn>
            <SocialBtn
              label="Instagram"
              href="https://www.instagram.com/changpayafrica"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
              </svg>
            </SocialBtn>
          </div>
        </div>
      </div>
    </footer>
  );
}
