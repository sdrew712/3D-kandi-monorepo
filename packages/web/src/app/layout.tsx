"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ApolloWrapper } from "./ApolloWrapper";
import ProtectedProvider from "@/components/ProtectedProvider";
import TopNav from "../components/TopNav";
import { usePathname } from "next/navigation";

const pixelFont = localFont({
  src: "./fonts/PressStart2P.woff2",
  variable: "--font-pixel",
  display: "swap",
});

const monoFont = localFont({
  src: [
    { path: "./fonts/SpaceMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/SpaceMono-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
});

function isProtectedRoute() {
  const pathname = usePathname();

  const unprotectedRoutes = ["/signin", "/signup", "/forgot-password"];

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
      <body className={`${pixelFont.variable} ${monoFont.variable}`}>
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
