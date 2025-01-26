"use client";

import Unauthenticated from "../components/Unauthenticated";
import { useAuth } from "../hooks/useAuth";
import TopNav from "./TopNav";

export default function ProtectedProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div>
      <TopNav />
      <Unauthenticated />
    </div>
  );
}
