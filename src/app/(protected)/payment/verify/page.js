"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useOrderStatus } from "@/hooks/public/useOrder";

export default function VerifyPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");

  // start polling
  const { data, isLoading, isError } = useOrderStatus(orderId);
  console.log(data);
  
  // to avoid infinite redirect calls
  const redirectedRef = useRef(false);

  // timeout protection (UPI bank delay case)
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!orderId) {
      router.replace("/learning");
      return;
    }

    // 60 sec fallback protection
    timeoutRef.current = setTimeout(() => {
      if (!redirectedRef.current) {
        router.replace("/dashboard/student/learning?verification=pending");
      }
    }, 60000);

    return () => clearTimeout(timeoutRef.current);
  }, [orderId, router]);

  useEffect(() => {
    if (!data || redirectedRef.current) return;

    // SUCCESS
    if (data?.data?.status === "PAID") {
      redirectedRef.current = true;
      clearTimeout(timeoutRef.current);

      setTimeout(() => {
        router.replace("/dashboard/student/learning?payment=success");
      }, 1500);
    }

    // FAILURE
    if (data?.data?.status === "FAILED" || data?.data?.status === "CANCELLED") {
      redirectedRef.current = true;
      clearTimeout(timeoutRef.current);

      router.replace(`/payment/failed?orderId=${orderId}`);
    }
  }, [data, orderId, router]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8 border">

        {/* Spinner */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-50 p-5 rounded-full">
            <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-gray-800">
          Confirming your payment...
        </h1>

        {/* Description */}
        <p className="text-gray-600 mt-3 leading-relaxed">
          We’ve received your payment request and are verifying it securely with
          our payment partner.
        </p>

        <p className="text-gray-600 mt-2">
          This usually takes a few seconds.
        </p>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-700">
          Please don’t refresh or close this page.  
          You will be automatically redirected to your class once confirmed.
        </div>

        {/* Footer reassurance */}
        <p className="mt-6 text-xs text-gray-400">
          If the amount was deducted, your seat is safe.  
          We are finalizing your enrollment.
        </p>

        {/* Network error */}
        {isError && (
          <p className="text-red-500 mt-6 text-sm">
            We’re still verifying your payment.  
            You can safely wait here — your access will update automatically.
          </p>
        )}

      </div>
    </div>
  );
}
