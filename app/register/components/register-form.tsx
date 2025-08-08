"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "./custom-button"
import { Input } from "./custom-input"
import { Label } from "./custom-label"

export default function RegisterForm() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("") // Add this line
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Step 1: Perform Registration
      const registerResponse = await fetch("http://217.199.253.46:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }), // Modified line
      })

      const registerData = await registerResponse.json()

      if (!registerResponse.ok) {
        throw new Error(registerData.message || "Registration failed. Please try again.")
      }

      console.log("Registration successful:", registerData)

      // Step 2: Automatically perform Login after successful registration
      const loginResponse = await fetch("http://217.199.253.46:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Modified line
      })

      const loginData = await loginResponse.json()

      if (!loginResponse.ok) {
        // If login fails after successful registration, throw an error
        throw new Error(loginData.message || "Login failed after registration. Please try logging in manually.")
      }

      // Step 3: Store token and username, dispatch event, and redirect
      if (typeof window !== "undefined") {
        localStorage.setItem("token", loginData.data.token)
        localStorage.setItem("username", JSON.stringify(loginData.data.user.username)) // Modified line
      }

      // Dispatch event to notify header and redirect
      window.dispatchEvent(new Event("auth-change"))
      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <form onSubmit={handleRegister} className="w-full max-w-md space-y-6 text-center">
        <h1 className="text-[36px] text-[#283E61] font-[500] leading-tight">Create your account</h1>
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm" role="alert">
            {error}
          </div>
        )}

        <div className="space-y-4 text-left">
          <Label htmlFor="email" className="text-xs font-semibold uppercase text-gray-600">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="h-12 text-[#283E61] bg-gray-100 text-lg border-gray-300 focus:border-black focus:ring-0"
            required
            aria-label="Email address"
          />
          <Label htmlFor="username" className="text-xs font-semibold uppercase text-gray-600">
            Username
          </Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="h-12 text-[#283E61] bg-gray-100 text-lg border-gray-300 focus:border-black focus:ring-0"
            required
            aria-label="Username"
          />
          <Label htmlFor="password" className="text-xs font-semibold uppercase text-gray-600">
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
          {loading ? "Loading..." : "Create account"}
        </Button>
        <div className="mt-4 text-[#283E61] text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </div>
      </form>
    </div>
  )
}
