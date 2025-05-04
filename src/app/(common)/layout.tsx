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
import "../globals.css";
import { GenreProvider } from "@/components/provider/genre-context/genre-context";
import { Topnav } from "@/components/topnav";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <GenreProvider>
              <MobileHeader />
              <main className="flex min-h-screen">
                <Sidebar />
                <div className="w-[70vw] container relative">
                  <Topnav/>
                  {children}
                </div>
                <RightSidebar />
              </main>
              <Footer />
            </GenreProvider>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
