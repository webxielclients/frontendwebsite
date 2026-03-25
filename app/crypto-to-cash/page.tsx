import type { Metadata } from "next";
import CryptoToCashPage from "./CryptoToCashClient";

export const metadata: Metadata = {
  title: "Crypto to Cash",
  description: "Convert USDT, BTC, ETH and more into NGN or USD instantly. Fast settlement, transparent rates.",
  alternates: { canonical: "https://www.usechangpay.com/crypto-to-cash" },
  openGraph: { url: "https://www.usechangpay.com/crypto-to-cash", title: "Crypto to Cash | ChangPay" },
};

export default function Page() { return <CryptoToCashPage />; }