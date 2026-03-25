import type { Metadata } from "next";
import TermsClient from "./TermsClient"; 

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the ChangPay terms of service and usage policies.",
  alternates: { canonical: "https://www.usechangpay.com/terms" },
  openGraph: {
    url: "https://www.usechangpay.com/terms",
    title: "Terms of Service | ChangPay",
  },
};

export default function Terms() {
  return <TermsClient />;
}