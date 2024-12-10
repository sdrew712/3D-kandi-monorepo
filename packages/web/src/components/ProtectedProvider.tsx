"use client";

import Unauthenticated from "../components/Unauthenticated";
import { useAuth } from "../utils/useAuth";
import TopNav from "./TopNav";

export default function ProtectedProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = useAuth();

  if (userId) {
    return <>{children}</>;
  }

  return (
    <div>
      <TopNav />
      <Unauthenticated />
    </div>
  );
}
