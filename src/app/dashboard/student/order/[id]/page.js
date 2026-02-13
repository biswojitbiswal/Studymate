"use client";

import { Loader2 } from "lucide-react";

export default function OrderProcessingPage() {
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

      </div>
    </div>
  );
}
