import type { Metadata } from "next";
import AboutPage from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | ChangPay | Recieve, Convert &  Pay Globally",
  description:
    "ChangPay Offers Secured Global Payments, Instant Crypto to Cash and Payment to Chinese Merchants",
  alternates: { canonical: "https://www.usechangpay.com/about" },
  openGraph: {
    url: "https://www.usechangpay.com/about",
    title: "About Us | ChangPay | Recieve, Convert &  Pay Globally",
  },
};

export default function Page() {
  return <AboutPage />;
}
