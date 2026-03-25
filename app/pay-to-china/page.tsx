import type { Metadata } from "next";
import PayToChinaPage from "./PayToChinaClient";

export const metadata: Metadata = {
  title: "Pay Suppliers in China",
  description: "Send fast, secure Yuan payments to Chinese suppliers via Alipay, WeChat Pay, or bank transfer.",
  alternates: { canonical: "https://www.usechangpay.com/pay-to-china" },
  openGraph: { url: "https://www.usechangpay.com/pay-to-china", title: "Pay Suppliers in China | ChangPay" },
};

export default function Page() { return <PayToChinaPage />; }