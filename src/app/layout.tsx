"use client";

import { Footer } from "@/components/footer";
import { MobileHeader } from "@/components/mobile-header";
import { RightSidebar } from "@/components/right-sidebar";
import SearchBar from "@/components/searchbar/searchbar";
import { Sidebar } from "@/components/sidebar";
import { queryClient } from "@/libs/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import { ReactNode } from "react";
import "./globals.css";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <MobileHeader />
            <main className="flex min-h-screen">
              <Sidebar />
              <div className="w-[70vw] container relative">
                <div className="flex justify-between items-center px-4 md:px-8 pt-10 pb-4 lg:pb-0 lg:pt-0">
                  <div className="flex items-center gap-8">
                    <ChevronLeft size={40} />
                    <ChevronRight size={40} />
                    <SearchBar className="hidden lg:block" />
                  </div>
                  <div className="flex items-center gap-4">
                    <p>Hi, Quan Chau</p>
                    <Image
                      src="/assets/images/defaultAvatar.jpg"
                      alt="Logo"
                      title="Logo"
                      width={50}
                      height={50}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                  </div>
                </div>
                {children}
              </div>
              <RightSidebar />
            </main>
            <Footer />
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
