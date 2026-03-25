import type { Metadata } from "next";
import AboutPage from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about ChangPay's mission to simplify digital payments for individuals and businesses.",
  alternates: { canonical: "https://www.usechangpay.com/about" },
  openGraph: { url: "https://www.usechangpay.com/about", title: "About Us | ChangPay" },
};

export default function Page() { return <AboutPage />; }