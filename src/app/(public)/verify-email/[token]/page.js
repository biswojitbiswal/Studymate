"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useVerifyEmail } from "@/hooks/public/useAuth";

export default function VerifyEmailPage() {
  const params = useParams();
  const token = params?.token;
  const router = useRouter();


  const { mutate, isPending, isSuccess, isError, error } = useVerifyEmail();

  useEffect(() => {
    if (token) {
      mutate(token);
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">

        {isPending && (
          <>
            <Loader2 className="mx-auto h-10 w-10 text-blue-600 animate-spin" />
            <p className="mt-4 text-gray-600">Verifying your email…</p>
          </>
        )}

        {isSuccess && (
          <>
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <p className="mt-4 text-gray-700 font-medium">
              Email verified successfully 🎉
            </p>
            <button
              onClick={() => router.push("/signin")}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Go to Sign In
            </button>
          </>
        )}

        {isError && (
          <>
            <XCircle className="mx-auto h-12 w-12 text-red-500" />
            <p className="mt-4 text-red-600">
              {error ?.response?.data?.message || "Verification failed"}
            </p>
            <button
              onClick={() => router.push("/signin")}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Go to Sign In
            </button>
          </>
        )}

      </div>
    </div>
  );
}
