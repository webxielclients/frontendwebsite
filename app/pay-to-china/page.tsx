import type { Metadata } from "next";
import PayToChinaPage from "./PayToChinaClient";

export const metadata: Metadata = {
  title: "Pay to China | ChangPay | Recieve, Convert &  Pay Globally",
  description: "ChangPay Offers Secured Global Payments, Instant Crypto to Cash and Payment to Chinese Merchants.",
  alternates: { canonical: "https://www.usechangpay.com/pay-to-china" },
  openGraph: { url: "https://www.usechangpay.com/pay-to-china", title: "Pay to China | ChangPay | Recieve, Convert &  Pay Globally" },
};

export default function Page() { return <PayToChinaPage />; }