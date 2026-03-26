import type { Metadata } from "next";
import MultiCurrencyPage from "./MultiCurrencyClient";

export const metadata: Metadata = {
  title: "Multi-Currency | ChangPay | Recieve, Convert &  Pay Globally",
  description: "ChangPay Offers Secured Global Payments, Instant Crypto to Cash and Payment to Chinese Merchants",
  alternates: { canonical: "https://www.usechangpay.com/faq" },
  openGraph: { url: "https://www.usechangpay.com/faq", title: "Multi-Currency | ChangPay" },
};

export default function Page() { return <MultiCurrencyPage />; }