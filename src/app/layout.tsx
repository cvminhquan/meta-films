import NextTopLoaderClient from "@/components/next-top-loader-client";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "./globals.css";
import movieServerApi from "@/lib/api/server/categoriesMovieServer";

export const metadata: Metadata = {
  title: "Meta films",
  description: "Meta films",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <html lang="en">
      <body>
        <NextTopLoaderClient />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
