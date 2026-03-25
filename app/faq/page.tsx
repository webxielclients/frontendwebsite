import type { Metadata } from "next";
import FAQPage from "./FAQClient";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about ChangPay's services, plans, and payment process.",
  alternates: { canonical: "https://www.usechangpay.com/faq" },
  openGraph: { url: "https://www.usechangpay.com/faq", title: "FAQ | ChangPay" },
};

export default function Page() { return <FAQPage />; }