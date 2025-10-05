"use client";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { ArrowDown } from "lucide-react";

export const UserMenu = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  if (!session) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className=" flex items-center gap-2 text-white font-bold border-b-2 cursor-pointer border-[#FE7F2D] transition duration-200 ease-in-out"
      >
        {session.user?.name || "User"}
        <ArrowDown className="text-[#FE7F2D]" size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-4 w-40 bg-[#FE7F2D] border-4 border-[#233d4d] rounded-lg hover:bg-white transition duration-200 ease-in-out">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="block w-full px-4 py-2 text-sm text-[#233d4d] cursor-pointer font-bold rounded-lg hover:text-[#FE7F2D] transition duration-200 ease-in-out"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
