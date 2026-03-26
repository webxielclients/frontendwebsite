import type { Metadata } from "next";
import TermsClient from "./TermsClient"; 

export const metadata: Metadata = {
  title: "Terms of Service | ChangPay | Recieve, Convert &  Pay Globally",
  description: "ChangPay Offers Secured Global Payments, Instant Crypto to Cash and Payment to Chinese Merchants",
  alternates: { canonical: "https://www.usechangpay.com/terms" },
  openGraph: {
    url: "https://www.usechangpay.com/terms",
    title: "Terms of Service | ChangPay | Recieve, Convert &  Pay Globally",
  },
};

export default function Terms() {
  return <TermsClient />;
}