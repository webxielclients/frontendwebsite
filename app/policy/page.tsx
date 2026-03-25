import type { Metadata } from "next";
import PolicyClient from "./PolicyClient"; 

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how ChangPay protects and handles your personal data.",
  alternates: { canonical: "https://www.usechangpay.com/policy" },
  openGraph: {
    url: "https://www.usechangpay.com/policy",
    title: "Privacy Policy | ChangPay",
  },
};

export default function Policy() {
  return <PolicyClient />;
}