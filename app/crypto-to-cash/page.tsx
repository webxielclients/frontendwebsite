import type { Metadata } from "next";
import CryptoToCashPage from "./CryptoToCashClient";

export const metadata: Metadata = {
  title: "Crypto to Cash | ChangPay | Recieve, Convert &  Pay Globally",
  description: "ChangPay Offers Secured Global Payments, Instant Crypto to Cash and Payment to Chinese Merchants",
  alternates: { canonical: "https://www.usechangpay.com/crypto-to-cash" },
  openGraph: { url: "https://www.usechangpay.com/crypto-to-cash", title: "Crypto to Cash | ChangPay" },
};

export default function Page() { return <CryptoToCashPage />; }