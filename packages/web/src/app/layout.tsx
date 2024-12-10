"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "./ApolloWrapper";
import ProtectedProvider from "@/components/ProtectedProvider";
import TopNav from "../components/TopNav";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

function isProtectedRoute() {
  const pathname = usePathname();

  const unprotectedRoutes = ["/signin", "/signup"];

  if (unprotectedRoutes.includes(pathname)) return false;
  return true;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          {isProtectedRoute() ? (
            <ProtectedProvider>
              <TopNav />
              {children}
            </ProtectedProvider>
          ) : (
            <>
              <TopNav />
              {children}
            </>
          )}
        </ApolloWrapper>
      </body>
    </html>
  );
}
