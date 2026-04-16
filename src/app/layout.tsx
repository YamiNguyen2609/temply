import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/providers/DataProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Temply | Trợ thủ đơn giản và hữu ích",
  description: "Trợ thủ đơn giản và hữu ích giúp bạn quản lý, học tập và làm việc hiệu quả hơn mỗi ngày với các mẫu Google Sheets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} antialiased h-full`}>
      <body className="min-h-full flex flex-col font-sans selection:bg-primary/20">
        <DataProvider>
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
