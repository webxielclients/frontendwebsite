import type { Metadata } from "next";
import PolicyClient from "./PolicyClient"; 

export const metadata: Metadata = {
  title: "Privacy Policy | ChangPay | Recieve, Convert &  Pay Globally",
  description: "ChangPay Offers Secured Global Payments, Instant Crypto to Cash and Payment to Chinese Merchants",
  alternates: { canonical: "https://www.usechangpay.com/policy" },
  openGraph: {
    url: "https://www.usechangpay.com/policy",
    title: "Privacy Policy | ChangPay | Recieve, Convert &  Pay Globally",
  },
};

export default function Policy() {
  return <PolicyClient />;
}