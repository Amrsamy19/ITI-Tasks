"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Protected({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect when unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!session) {
    // prevent rendering until redirect
    return null;
  }

  return <>{children}</>;
}
