"use client";

import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { Github, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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

    const res = await signIn("credentials", {
      redirect: false,
      username: formData.username,
      password: formData.password,
    });
    if (res.ok) {
      setPending(false);
      toast.success("Login successful", {
        duration: 2000,
      });
      router.push("/");
    } else if (res.status === 401) {
      setPending(false);
      setError("Invalid credentials");
    } else {
      setPending(false);
      setError("Something went wrong");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#233d4d]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg w-5/12 flex flex-col items-center justify-center gap-6"
      >
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-2xl text-[#233d4d] font-extrabold">Login</h1>
          <p className="text-[#233d4d] font-semibold">Login to your account</p>
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
          {pending ? "Logging in..." : "Login"}
        </button>
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="flex items-center gap-2 px-6 py-3 bg-white text-[#233d4d] rounded-2xl hover:bg-[#233d4d] hover:text-white border border-[#233d4d] transition"
        >
          <Github /> Sign in with Github
        </button>
        <p>
          Don&apos;t have an account?{" "}
          <Link
            className="text-[#233d4d] underline hover:text-[#FE7F2D] hover:font-bold transition-all duration-400 ease-in-out"
            href="/signup"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Page;
