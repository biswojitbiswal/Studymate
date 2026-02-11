export const CheckoutSkeleton = () => {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-22 pb-6 animate-pulse">
      <div className="max-w-7xl mx-auto pb-14 lg:pb-0">

        {/* Desktop Header */}
        <div className="hidden lg:block text-center mb-4">
          <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-2" />
          <div className="h-4 w-80 bg-gray-200 rounded mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-8">

          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-4">

            {/* CLASS DETAILS CARD */}
            <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.1)] py-4 px-5 sm:px-6">

              {/* header */}
              <div className="flex justify-between mb-4">
                <div className="h-6 w-40 bg-gray-200 rounded" />
                <div className="hidden sm:block h-5 w-28 bg-gray-200 rounded" />
              </div>

              {/* body */}
              <div className="flex flex-col lg:flex-row gap-6">

                {/* image */}
                <div className="lg:w-44 flex-shrink-0">
                  <div className="w-full h-44 lg:h-32 bg-gray-200 rounded-xl" />
                </div>

                {/* info */}
                <div className="flex-1 space-y-3">
                  <div className="h-6 w-3/4 bg-gray-200 rounded" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded" />

                  {/* tags */}
                  <div className="flex gap-2 mt-3">
                    <div className="h-6 w-24 bg-gray-200 rounded-md" />
                    <div className="h-6 w-20 bg-gray-200 rounded-md" />
                  </div>
                </div>
              </div>

              {/* mobile boxes */}
              <div className="grid grid-cols-3 gap-3 mt-5 lg:hidden">
                <div className="h-16 bg-gray-200 rounded-lg" />
                <div className="h-16 bg-gray-200 rounded-lg" />
                <div className="h-16 bg-gray-200 rounded-lg" />
              </div>
            </div>

            {/* COUPON CARD */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-5">
              <div className="h-5 w-40 bg-gray-200 rounded mb-4" />

              <div className="rounded-xl border px-4 py-3 flex justify-between items-center">
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                  <div className="h-3 w-48 bg-gray-200 rounded" />
                </div>
                <div className="h-8 w-20 bg-gray-300 rounded-lg" />
              </div>
            </div>

            {/* PAYMENT METHODS */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6">
              <div className="h-6 w-40 bg-gray-200 rounded mb-4" />
              <div className="flex gap-4">
                <div className="h-10 w-16 bg-gray-200 rounded" />
                <div className="h-10 w-16 bg-gray-200 rounded" />
                <div className="h-10 w-16 bg-gray-200 rounded" />
                <div className="h-10 w-16 bg-gray-200 rounded" />
              </div>
            </div>

          </div>

          {/* RIGHT SIDE — ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 lg:sticky top-8">

              <div className="h-6 w-36 bg-gray-200 rounded mb-6" />

              <div className="space-y-4">

                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                </div>

                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>

                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                </div>

                <div className="border-t pt-4 mt-4 flex justify-between">
                  <div className="h-5 w-28 bg-gray-200 rounded" />
                  <div className="h-6 w-24 bg-gray-200 rounded" />
                </div>

                <div className="h-12 w-full bg-gray-300 rounded-xl mt-4" />
              </div>

              <div className="h-3 w-56 bg-gray-200 rounded mx-auto mt-4" />
            </div>
          </div>

        </div>
      </div>

      {/* MOBILE STICKY PAY BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="h-10 w-32 bg-gray-200 rounded" />
          <div className="h-12 w-40 bg-gray-300 rounded-xl" />
        </div>
      </div>
    </div>
  );
};
