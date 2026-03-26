import type { Metadata } from "next";
import ContactPage from "./contactClients";

export const metadata: Metadata = {
  title: "Contact Us | ChangPay | Recieve, Convert &  Pay Globally",
  description: "ChangPay Offers Secured Global Payments, Instant Crypto to Cash and Payment to Chinese Merchants",
  alternates: { canonical: "https://www.usechangpay.com/contact" },
  openGraph: { url: "https://www.usechangpay.com/contact", title: "Contact Us | ChangPay | Recieve, Convert &  Pay Globally" },
};

export default function Page() { return <ContactPage />; }