"use client";

import { Footer } from "@/components/footer";
import { MobileHeader } from "@/components/mobile-header";
import { GenreProvider } from "@/components/provider/genre-context/genre-context";
import { RightSidebar } from "@/components/right-sidebar";
import { Sidebar } from "@/components/sidebar";
import { queryClient } from "@/libs/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import "../globals.css";
import { TopNav } from "@/components/topnav";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <GenreProvider>
              <MobileHeader />
              <main className="flex min-h-screen">
                <Sidebar />
                <div className="w-[70vw] container relative">
                  <TopNav />
                  {children}
                </div>
                <RightSidebar />
              </main>
              <Footer />
            </GenreProvider>
          </QueryClientProvider>
        </SessionProvider>
    </>
  );
}
