import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t px-18 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-gray-900">StudyMate</span>
            </div>
            <p className="mt-3 text-sm text-gray-600 max-w-xs">
              A smarter learning platform designed for students and tutors to
              collaborate, grow, and track progress together.
            </p>
          </div>

          {/* PRODUCT */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Product</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Features</a></li>
              <li><a href="#" className="hover:text-blue-600">How It Works</a></li>
              <li><a href="#" className="hover:text-blue-600">Pricing</a></li>
            </ul>
          </div>

          {/* FOR USERS */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900">For Users</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Students</a></li>
              <li><a href="#" className="hover:text-blue-600">Tutors</a></li>
              <li><a href="#" className="hover:text-blue-600">Sign In</a></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-600">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-10 border-t pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} StudyMate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
