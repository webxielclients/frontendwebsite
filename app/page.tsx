import type { Metadata } from "next";
import ChangPayHomepage from "./HomeClient";

export const metadata: Metadata = {
  title: "Home | ChangPay | Recieve, Convert &  Pay Globally",
  description: "ChangPay Offers Secured Global Payments, Instant Crypto to Cash and Payment to Chinese Merchants",
  alternates: { canonical: "https://www.usechangpay.com" },
  openGraph: {
    url: "https://www.usechangpay.com",
    title: "Home | ChangPay | Recieve, Convert &  Pay Globally",
  },
};

export default function Page() {
  return <ChangPayHomepage />;
}