import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-white lg:px-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid gap-6 lg:gap-18 sm:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-gray-900">StudyNest</span>
            </div>

            <p className="mt-3 text-sm text-gray-600 max-w-sm text-center sm:text-left mx-auto sm:mx-0">
              A smarter learning platform designed for students and tutors to
              collaborate, grow, and track progress together.
            </p>
          </div>

          <div className="flex items-center justify-between md:col-span-3">
            {/* PRODUCT */}
            <div className="text-start sm:text-left">
              <h4 className="text-sm font-semibold text-gray-900">Product</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition">Features</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">How It Works</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Pricing</a></li>
              </ul>
            </div>

            {/* FOR USERS */}
            <div className="text-start sm:text-left">
              <h4 className="text-sm font-semibold text-gray-900">For Users</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li><a href="/classes" className="hover:text-blue-600 transition">Classes</a></li>
                <li><a href="/tutors" className="hover:text-blue-600 transition">Tutors</a></li>
                <li><a href="/signin" className="hover:text-blue-600 transition">Sign In</a></li>
              </ul>
            </div>

            {/* LEGAL */}
            <div className="text-start sm:text-left">
              <h4 className="text-sm font-semibold text-gray-900">Legal</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li><a href="/about" className="hover:text-blue-600 transition">About</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
                {/* <li><a href="#" className="hover:text-blue-600 transition">Terms of Service</a></li> */}
                <li><a href="/contact" className="hover:text-blue-600 transition">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-10 border-t pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} StudyNest. All rights reserved.
          <br />
          Developed by <span className="text-blue-600">Biswojit</span>
        </div>
      </div>
    </footer>

  );
}
