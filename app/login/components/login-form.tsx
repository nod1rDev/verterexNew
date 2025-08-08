"use client";

import { useState } from "react";

interface User {
  id: number;
  email: string;
  username: string;
  is_admin: boolean;
}

interface LoginResponseData {
  user: User;
  token: string;
}

interface LoginApiResponse {
  code: number;
  message: string;
  data: LoginResponseData;
  success: boolean;
}
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "./custom-button";
import { Input } from "./custom-input";
import { Label } from "./custom-label";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://217.199.253.46:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data: LoginApiResponse = await response.json();
      console.log("Login API response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save token and user data to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
      }
      console.log("Token stored:", data.data.token);
      console.log("User stored:", JSON.stringify(data.data.user));

      // Dispatch event to notify header
      window.dispatchEvent(new Event("auth-change"));

      // Redirect based on admin status
      if (data.data.user.is_admin) {
        console.log("User is admin, redirecting to /admin/news");
        router.push("/admin/news");
      } else {
        console.log("User is not admin, redirecting to /");
        router.push("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-6 text-center"
      >
        <h1 className="text-[36px] text-[#283E61] font-[500] leading-tight">
          Want to check out this file? Log in
        </h1>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4 text-left">
          <Label
            htmlFor="email"
            className="text-xs font-semibold uppercase text-gray-600"
          >
            Username
          </Label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Username"
            className="h-12 text-[#283E61] bg-gray-100 text-lg border-gray-300 focus:border-black focus:ring-0"
          />

          <Label
            htmlFor="password"
            className="text-xs font-semibold uppercase text-gray-600"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="h-12 text-[#283E61] bg-gray-100 text-lg border-gray-300 focus:border-black focus:ring-0"
            required
            aria-label="Password"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#283E61] py-6 text-lg font-medium text-white hover:bg-[#354f78] disabled:opacity-50"
          disabled={loading}
          aria-label="Continue with email"
        >
          {loading ? "Loading..." : "Continue with email"}
        </Button>
        <div className="mt-4 text-[#283E61] text-center text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
        <div className="mt-2 text-[#283E61] text-center text-sm">
          <Link href="/forgot-password" className="underline">
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  );
}
