"use client"
import { useState } from "react"
import { Mail, Lock, User, ChevronRight, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FaFacebook, FaGoogle, FaInstagramSquare } from "react-icons/fa"
import { BsTwitterX } from "react-icons/bs"
import { useAuthStore } from "@/store/auth"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const SignupForm = ({ type }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    provider: "CREDENTIALS",
    signupIntent: type === "Student" ? "STUDENT" : "TUTOR",
  })
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const signup = useAuthStore((s) => s.signup);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }


  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    try {
      await signup(formData);

      toast.success("Signup Successful, Please verify your email.");
      router.push("/signin");
    } catch (error) {
      const message = error?.message || "Signup failed";
      setErr(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="w-full max-w-md space-y-2">
      <div>
        <label className="block text-sm font-medium mb-0.5">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
          <input
            name="name"
            placeholder="Your full name"
            onChange={handleChange}
            className="w-full pl-10 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-0.5">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
          <input
            name="email"
            placeholder="you@example.com"
            onChange={handleChange}
            className="w-full pl-10 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-0.5">Phone</label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
          <input
            name="phone"
            placeholder="Your Phone No."
            onChange={handleChange}
            className="w-full pl-10 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-0.5">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
          <input
            type="password"
            name="password"
            placeholder="******"
            onChange={handleChange}
            className="w-full pl-10 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 placeholder:not-lg:"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-0.5">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="******"
            onChange={handleChange}
            className="w-full pl-10 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button onClick={handleSubmit} disabled={loading} className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-white font-semibold hover:bg-blue-700 transition hover:cursor-pointer">
        {loading && loading ? 'Signing Up....' : `Sign Up as ${type === "Student" ? "Student" : "Tutor"}`}
        <ChevronRight className="h-4 w-4" />
      </button>

      {err && <div className="text-red-600 text-sm mt-1">{err}</div>}

      <p className="text-center text-md">
        Already have an account?{" "}
        <Link href="/signin" className="text-blue-600 font-semibold hover:underline cursor-pointer">
          Log in
        </Link>
      </p>

      <div className="mt-2 mb-3 flex items-center gap-3 text-gray-400 text-sm">
        <div className="h-px flex-1 bg-gray-300" />
        Or Continue With
        <div className="h-px flex-1 bg-gray-300" />
      </div>

      {/* Social Login */}
      <div className="flex items-center justify-center gap-6">
        <button className="hover:scale-110 transition text-blue-600 p-2 bg-blue-100 hover:cursor-pointer rounded-sm">
          <FaGoogle className="w-6 h-6" />

          {/* <img src="/google.svg" alt="Google" className="h-7 w-7" /> */}
        </button>
        <button className="hover:scale-110 transition text-blue-600 p-2 bg-blue-100 hover:cursor-pointer rounded-sm">
          <FaFacebook className="w-6 h-6" />
          {/* <img src="/facebook.svg" alt="Facebook" className="h-7 w-7" /> */}
        </button>
        <button className="hover:scale-110 transition text-blue-600 p-2 bg-blue-100 hover:cursor-pointer rounded-sm">
          <FaInstagramSquare className="w-6 h-6" />
          {/* <img src="/instagram.svg" alt="Instagram" className="h-7 w-7" /> */}
        </button>
        <button className="hover:scale-110 transition text-blue-600 p-2 bg-blue-100 hover:cursor-pointer rounded-sm">
          <BsTwitterX className="w-6 h-6" />
          {/* <img src="/x.svg" alt="X" className="h-7 w-7" /> */}
        </button>
      </div>
    </div>
  )
}

export default function SignupPage() {
  const [activeRole, setActiveRole] = useState("Student")

  const inactiveRole = activeRole === "Student" ? "Tutor" : "Student"

  const isStudentActive = activeRole === "Student"

  return (
    <div className="min-h-screen flex items-center justify-center px-2 py-28">

      {/* Animations */}
      <style>{`
        @keyframes flipLeft {
          0% { transform: perspective(1000px) rotateY(0deg); opacity: 1; }
          50% { transform: perspective(1000px) rotateY(90deg); opacity: 0; }
          100% { transform: perspective(1000px) rotateY(0deg); opacity: 1; }
        }

        @keyframes flipRight {
          0% { transform: perspective(1000px) rotateY(0deg); opacity: 1; }
          50% { transform: perspective(1000px) rotateY(-90deg); opacity: 0; }
          100% { transform: perspective(1000px) rotateY(0deg); opacity: 1; }
        }

        .animate-flip-left {
          animation: flipLeft 0.6s ease-in-out;
          transform-style: preserve-3d;
        }

        .animate-flip-right {
          animation: flipRight 0.6s ease-in-out;
          transform-style: preserve-3d;
        }
      `}</style>

      {/* SINGLE CARD */}
      <div className="w-full max-w-6xl rounded-md overflow-hidden bg-white shadow-xl border">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* IMAGE SIDE */}
          <div
            className={`relative min-h-[520px] ${isStudentActive ? "order-2 animate-flip-right" : "order-1 animate-flip-left"
              }`}
          >
            <Image
              src={
                inactiveRole === "Student"
                  ? "/StudentIllustration.png"
                  : "/TutorIllustration.png"
              }
              alt="Role preview"
              fill
              className="object-cover"
              priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6 text-white">
              <h2 className="text-3xl font-bold mb-2 capitalize">
                Sign up as {inactiveRole}
              </h2>

              <p className="text-md opacity-90 mb-6 max-w-xs">
                {inactiveRole === "Student"
                  ? "Join study groups, collaborate, and learn together."
                  : "Teach students, manage classes, and grow your tutoring profile."}
              </p>

              <button
                onClick={() => setActiveRole(inactiveRole)}
                className="rounded-full bg-blue-600 px-6 py-2 font-semibold hover:bg-white hover:text-blue-600 hover:cursor-pointer transition"
              >
                Switch to {inactiveRole}
              </button>
            </div>
          </div>

          {/* FORM SIDE */}
          <div
            className={`flex items-center justify-center p-8 ${isStudentActive ? "order-1 animate-flip-left" : "order-2 animate-flip-right"
              }`}
          >
            <SignupForm type={activeRole} />
          </div>

        </div>
      </div>
    </div>
  )
}
