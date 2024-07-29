import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/utils/helpers";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
const satoshi = localFont({
  src: "../public/assets/fonts/Satoshi-Regular.woff2",
  variable: "--satoshi",
});
const inter = Inter({ subsets: ["latin"], variable: "--inter" });
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(satoshi.variable, inter.variable, "bg-light-silver font-satoshi")}
      >
        {children}
      </body>
    </html>
  );
}
