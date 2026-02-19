"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { XCircle } from "lucide-react";

export default function PaymentFailedPage() {
  const router = useRouter();
  const params = useSearchParams();

  const orderId = params.get("orderId");

  const handleRetry = () => {
    if (!orderId) {
      router.push("/purchases");
      return;
    }

    // call your retry order page or checkout again
    // router.push(`/checkout/retry?orderId=${orderId}`);
    alert("Comming soon, Please wait it will be available very soon.")
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border text-center">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-50 p-5 rounded-full">
            <XCircle className="h-12 w-12 text-red-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800">
          Payment Failed
        </h1>

        {/* Description */}
        <p className="text-gray-600 mt-3 leading-relaxed">
          We couldn't complete your payment. This may happen due to
          bank issues, UPI timeout, or network interruption.
        </p>

        {/* Reassurance */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
          If money was deducted, don’t worry.  
          Banks usually reverse the amount automatically within a few minutes to a few hours.
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3">

          <button
            onClick={handleRetry}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Retry Payment
          </button>

          <button
            onClick={() => router.push("/purchases")}
            className="w-full border py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Go to Purchases
          </button>

        </div>

        {/* Footer note */}
        <p className="mt-6 text-xs text-gray-400">
          Need help? Contact support if the amount is not refunded within 24 hours.
        </p>

      </div>
    </div>
  );
}
