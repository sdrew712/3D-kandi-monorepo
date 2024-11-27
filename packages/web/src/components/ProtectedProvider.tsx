"use client";

import Unauthenticated from "../components/Unauthenticated";
import { useAuth } from "../utils/useAuth";
import { usePathname } from "next/navigation";
import TopNav from "./TopNav";

export default function ProtectedProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { userId } = useAuth();

  if (userId) {
    return <>{children}</>;
  }

  if (!userId && isUnprotectedRoute(pathname)) {
    return <>{children}</>;
  }

  return (
    <div>
      <TopNav />
      <Unauthenticated />
    </div>
  );
}

function isUnprotectedRoute(pathname: string) {
  const unprotectedRoutes = ["/signin", "/signup"];

  if (unprotectedRoutes.includes(pathname)) return true;
  return false;
}
