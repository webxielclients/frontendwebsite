import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const BASE_URL = "https://www.usechangpay.com";
const OG_IMAGE = `${BASE_URL}/portfolio-2.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL), 
  title: {
    default: "ChangPay | Instant Crypto to Cash & Global Payments",
    template: "%s | ChangPay",
  },
  description:
    "ChangPay offers secure and instant crypto-to-cash conversions, and payments to Chinese merchants. Simplify your financial transactions today.",
  keywords: [
    "crypto to cash", "international payments", "cryptocurrency conversion",
    "NGN wallet", "USD wallet", "Yuan wallet", "fast payments",
    "secure transactions", "ChangPay",
  ],
  authors: [{ name: "ChangPay" }],
  themeColor: "#000000",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "ChangPay",
    title: "ChangPay | Instant Crypto to Cash & Global Payments",
    description:
      "ChangPay helps you convert cryptocurrencies to cash, and send money to Chinese merchants quickly and securely.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "ChangPay Swift Payouts" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChangPay | Instant Crypto to Cash & Global Payments",
    description:
      "ChangPay provides fast, secure solutions for converting crypto to cash and paying Chinese merchants.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ChangPay",
              url: BASE_URL,
              logo: OG_IMAGE,
              sameAs: [
                "https://www.facebook.com/share/1Acw74WUx9",
                "https://x.com/changpayafrica",
                "https://www.instagram.com/changpayafrica",
                "https://www.linkedin.com/company/ChangPay",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+234-704-276-4245",
                contactType: "customer service",
                areaServed: ["US", "NG", "CN"],
                availableLanguage: "English",
              },
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}