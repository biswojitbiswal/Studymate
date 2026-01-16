// src/components/auth/SignInForm.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { Lock, Mail } from "lucide-react";

export default function SignInForm() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [role, setRole] = useState("STUDENT");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false)
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    try {
      const { user } = await login(email, password, rememberMe);

      if (user?.role === "TUTOR") router.push("/dashboard/tutor");
      else if (user?.role === "STUDENT") router.push("/dashboard/student");
      else if (user?.role === "ADMIN") router.push("/dashboard/admin");
      else router.push("/");
    } catch (err) {
      console.error(err);
      setErr(err?.message ?? "Signin failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      <div>
        <label className="block text-sm font-medium mb-1">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-4 h-5 w-5 text-blue-500" />
          <input
            className="w-full pl-10 py-2 rounded-lg border"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
        </div>
      </div>


      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-4 h-5 w-5 text-blue-500" />
          <input
            className="w-full pl-10 py-2 rounded-lg border focus:ring-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
          />
        </div>
      </div>


      {/* Remember + Forgot */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            onChange={() => setRememberMe(!rememberMe)}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 accent-blue-600"
          />
          <span className="text-gray-700">Remember Me</span>
        </label>

        <Link
          href="/forgot-password"
          className="text-red-500 font-medium hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        className="w-full py-2 rounded bg-blue-600 text-white hover:cursor-pointer"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>

      {err && <div className="text-red-600 text-sm mt-1">{err}</div>}
    </form>
  );
}
