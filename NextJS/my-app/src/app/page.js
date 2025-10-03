"use client";
import Protected from "@/components/ui/Protected";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Protected>
      <div className="flex justify-center p-16">
        <h1 className="text-2xl text-[#233d4d] font-extrabold">
          Welcome <span className="text-[#FE7F2D]">{session?.user?.name}</span>
        </h1>
      </div>
    </Protected>
  );
}
