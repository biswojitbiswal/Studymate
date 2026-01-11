// SERVER component — no "use client"
import RedirectIfAuthClient from "@/components/auth/RedirectIfAuth";
import SignInForm from "@/components/auth/SigninForm";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

export default function SignInPage() {
  return (
    <RedirectIfAuthClient redirectToHomeIfAuth={true}>
      <section className="min-h-screen flex items-center justify-center bg-white px-6 py-28">
        <div className="w-full max-w-lg rounded-md shadow-md border pt-6">

          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Login</h1>
            <p className="mt-2 text-sm text-gray-500">
              Login to access your learning resources and courses.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl bg-white p-8">

            {/* Form (logic untouched) */}
            <div
              className="
                [&_input]:py-3
                [&_input]:focus:ring-2
                [&_input]:focus:ring-blue-600
              "
            >
              <SignInForm />
            </div>

            {/* Remember + Forgot */}
            {/* <div className="mt-4 flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                />
                <span className="text-gray-700">Remember Me</span>
              </label>

              <a
                href="/forgot-password"
                className="text-red-500 font-medium hover:underline"
              >
                Forgot Password?
              </a>
            </div> */}

            {/* Login Button */}
            {/* <button
              type="submit"
              className="mt-6 w-full rounded-full bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition"
            >
              Login
            </button> */}

            {/* Create account */}
            <p className="mt-4 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="font-semibold text-blue-600 hover:underline"
              >
                Create an account
              </a>
            </p>

            {/* Divider */}
            <div className="mt-2 mb-4 flex items-center gap-3 text-gray-400 text-sm">
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
                <FaInstagramSquare className="w-6 h-6"/>
                {/* <img src="/instagram.svg" alt="Instagram" className="h-7 w-7" /> */}
              </button>
              <button className="hover:scale-110 transition text-blue-600 p-2 bg-blue-100 hover:cursor-pointer rounded-sm">
                <BsTwitterX className="w-6 h-6" />
                {/* <img src="/x.svg" alt="X" className="h-7 w-7" /> */}
              </button>
            </div>

          </div>
        </div>
      </section>
    </RedirectIfAuthClient>
  );
}
