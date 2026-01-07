"use client";

import { ShieldCheck, CreditCard, Calendar } from "lucide-react";

export default function CheckoutPage() {
  const itemType = "class"; // class | resource | subscription

  return (
    <section className="px-18 py-16">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Checkout
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Complete your purchase securely
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

          {/* ================= LEFT: ORDER DETAILS ================= */}
          <div className="space-y-8">

            {/* ITEM CARD */}
            <div className="rounded-2xl border p-6 space-y-4 bg-white">

              <p className="text-xs font-medium text-blue-600 uppercase">
                {itemType === "class" && "Class Enrollment"}
                {itemType === "resource" && "Digital Resource"}
                {itemType === "subscription" && "Subscription Plan"}
              </p>

              <h2 className="text-xl font-semibold text-gray-900">
                Class 10 Mathematics – Live Batch
              </h2>

              {/* Context-aware info */}
              {itemType === "class" && (
                <div className="space-y-2 text-sm text-gray-700">
                  <p>Tutor: <span className="font-medium">Anil Kumar</span></p>
                  <p>Schedule: Mon · Wed · Fri</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span>6:00 PM – 7:30 PM (IST)</span>
                  </div>
                </div>
              )}

              {itemType === "resource" && (
                <p className="text-sm text-gray-700">
                  Includes downloadable materials and lifetime access.
                </p>
              )}

              {itemType === "subscription" && (
                <p className="text-sm text-gray-700">
                  Monthly access to all premium classes and resources.
                </p>
              )}
            </div>

            {/* REFUND / POLICY */}
            <div className="rounded-xl border p-4 text-sm text-gray-600">
              <p className="font-medium text-gray-900 mb-1">
                Refund Policy
              </p>
              <p>
                Refunds are available within 48 hours of purchase
                if no sessions are attended.
              </p>
            </div>

          </div>

          {/* ================= RIGHT: PAYMENT ================= */}
          <aside className="space-y-6">

            <div className="rounded-2xl border p-6 bg-white space-y-4">

              <h3 className="text-lg font-semibold text-gray-900">
                Payment Summary
              </h3>

              {/* PRICE BREAKDOWN */}
              <div className="space-y-2 text-sm">
                <Row label="Price">
                  ₹1,999
                </Row>
                <Row label="Discount">
                  ₹0
                </Row>
                <Row label="Taxes">
                  ₹0
                </Row>

                <div className="border-t pt-3 flex justify-between font-semibold text-gray-900">
                  <span>Total</span>
                  <span className="text-blue-600">
                    ₹1,999
                  </span>
                </div>
              </div>

              {/* COUPON */}
              <input
                placeholder="Enter coupon code"
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* PAY CTA */}
              <button className="mt-4 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition">
                Pay Now
              </button>

              {/* SECURITY */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                Secure payment · SSL encrypted
              </div>
            </div>

            {/* PAYMENT METHODS */}
            <div className="rounded-xl border p-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-blue-600" />
                <span>UPI · Cards · Net Banking</span>
              </div>
            </div>

          </aside>

        </div>
      </div>
    </section>
  );
}

/* ================= HELPERS ================= */

function Row({ label, children }) {
  return (
    <div className="flex justify-between text-gray-700">
      <span>{label}</span>
      <span>{children}</span>
    </div>
  );
}
