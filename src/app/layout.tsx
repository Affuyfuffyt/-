import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from 'next/font/google'
import "./globals.css";

const arabicFont = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "تسجيل الدخول | بودي",
  description: "صفحة تسجيل دخول بتصميم مستوحى من أندرويد.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={arabicFont.className}>
      <body>{children}</body>
    </html>
  );
}
