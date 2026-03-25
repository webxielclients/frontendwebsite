import type { Metadata } from "next";
import ChangPayHomepage from "./HomeClient";

export const metadata: Metadata = {
  title: "Instant Crypto to Cash & Global Payments",
  description: "ChangPay offers secure and instant crypto-to-cash conversions, and payments to Chinese merchants.",
  alternates: { canonical: "https://www.usechangpay.com" },
  openGraph: {
    url: "https://www.usechangpay.com",
    title: "ChangPay | Instant Crypto to Cash & Global Payments",
  },
};

export default function Page() {
  return <ChangPayHomepage />;
}