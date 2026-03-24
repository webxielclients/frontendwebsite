import Image from 'next/image';
import Link from 'next/link';
import { GooglePlay, ApplePay } from '@/public/icons';


function SocialBtn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="w-9 h-9 rounded-full bg-[#1e293b] hover:bg-[#16a34a] flex items-center justify-center transition-all hover:-translate-y-0.5"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const cols = [
    { heading: 'Features',  links: [{ label: 'Crypto to Cash', href: '/crypto-to-cash' }, { label: 'Pay to China', href: '/pay-to-china' }] },
    { heading: 'Solutions', links: [{ label: 'Terms and Condition', href: '/terms' }, { label: 'Privacy policy page', href: '/policy' }] },
    { heading: 'About',     links: [{ label: 'Company', href: '/About' }, { label: 'FAQ', href: '/faq' }] },
  ];

  return (
    <footer className="bg-white pt-14 pb-8 px-4 md:px-12" style={{ fontFamily: "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif" }}>
      <div className="max-w-[1100px] mx-auto">

        {/* Top — brand + columns */}
        <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between gap-10 pb-12">

          {/* Brand + store buttons */}
          <div className="flex flex-col items-center md:items-start gap-5">
            <Image src="/Group.png" alt="ChangPay" width={120} height={45} />
            <div className="flex flex-col gap-3">
              <GooglePlay/>
              <ApplePay/>
            </div>
          </div>

          {/* Nav columns */}
          <div className="flex flex-wrap justify-center md:justify-end gap-x-14 gap-y-8">
            {cols.map(({ heading, links }) => (
              <div key={heading} className="flex flex-col items-center md:items-start gap-2.5">
                <p className="text-[13px] font-semibold text-gray-700 mb-1">{heading}</p>
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
          <span className="text-[12.5px] text-gray-400">© 2026 ChangPay. All right reserved</span>

          <div className="flex gap-3">
            <SocialBtn label="LinkedIn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </SocialBtn>
            <SocialBtn label="Twitter">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </SocialBtn>
            <SocialBtn label="Facebook">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </SocialBtn>
          </div>
        </div>
      </div>
    </footer>
  );
}