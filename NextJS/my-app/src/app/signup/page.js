"use client";

import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { TriangleAlert, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { set } from "mongoose";

const Page = () => {
  const [formData, setFormData] = useState({});
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      setPending(false);
      toast.success(data.message, {
        duration: 2000,
      });
      router.push("/login");
    } else if (res.status === 400) {
      setPending(false);
      setError(data.message);
    } else {
      setPending(false);
      setError(data.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#233d4d]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg w-7/12 flex flex-col items-center justify-center gap-6"
      >
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-2xl text-[#233d4d] font-extrabold">Sign Up</h1>
          <p className="text-[#233d4d] font-semibold">Sign up form goes here</p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[#FE7F2D] font-bold" htmlFor="name">
            Name
          </label>
          <input
            className="border border-[#FE7F2D] rounded-2xl px-4 py-2 focus:scale-105 transition duration-300 ease-in-out"
            placeholder="Enter your name"
            onChange={handleChange}
            disabled={pending}
            value={formData.name || ""}
            type="text"
            id="name"
            name="name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[#FE7F2D] font-bold" htmlFor="username">
            Username
          </label>
          <input
            className="border border-[#FE7F2D] rounded-2xl px-4 py-2 focus:scale-105 transition duration-300 ease-in-out"
            placeholder="Enter your username"
            onChange={handleChange}
            disabled={pending}
            value={formData.username || ""}
            type="text"
            id="username"
            name="username"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[#FE7F2D] font-bold" htmlFor="password">
            Password
          </label>
          <input
            className="border border-[#FE7F2D] rounded-2xl px-4 py-2 focus:scale-105 transition duration-300 ease-in-out"
            placeholder="Enter your password"
            onChange={handleChange}
            disabled={pending}
            value={formData.password || ""}
            type="password"
            id="password"
            name="password"
          />
        </div>
        {error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive font-bold">
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}
        <button
          disabled={pending}
          className="bg-[#233d4d] text-white px-4 py-2 rounded-2xl font-bold text-lg hover:bg-[#FE7F2D] border border-[#233d4d] hover:border-[#FE7F2D] transition duration-300 ease-in-out cursor-pointer"
        >
          {pending ? "Signing up..." : "Sign Up"}
        </button>
        <p>
          Already have an account?{" "}
          <Link
            className="text-[#233d4d] underline hover:text-[#FE7F2D] hover:font-bold transition-all duration-400 ease-in-out"
            href="/login"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Page;
