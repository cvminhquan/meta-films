import NextTopLoaderClient from "@/components/next-top-loader-client";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meta films",
  description: "Meta films",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextTopLoaderClient />
        {/* <Providers> */}
          {children}
          <Toaster />
        {/* </Providers> */}
      </body>
    </html>
  );
}
