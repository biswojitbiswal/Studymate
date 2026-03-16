"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function OrderDetailsSkeleton() {
  return (
    <div className="p-2 md:p-6 space-y-4 animate-pulse">

      {/* Header */}
      <div className="space-y-2">
        <div className="h-6 w-48 bg-gray-200 rounded"></div>
        <div className="h-4 w-64 bg-gray-200 rounded"></div>
      </div>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <div className="h-5 w-32 bg-gray-200 rounded"></div>
        </CardHeader>

        <CardContent className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
            <div className="h-6 w-20 bg-gray-200 rounded"></div>
          </div>

          <div className="space-y-2">
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
            <div className="h-5 w-28 bg-gray-200 rounded"></div>
          </div>

          <div className="space-y-2">
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>

      {/* Product Details */}
      <Card>
        <CardHeader>
          <div className="h-5 w-36 bg-gray-200 rounded"></div>
        </CardHeader>

        <CardContent className="flex justify-between">
          <div className="space-y-2">
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
            <div className="h-5 w-32 bg-gray-200 rounded"></div>
          </div>

          <div className="space-y-2">
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
            <div className="h-5 w-40 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>

      {/* Price Breakdown */}
      <Card>
        <CardHeader>
          <div className="h-5 w-36 bg-gray-200 rounded"></div>
        </CardHeader>

        <CardContent className="space-y-3">
          {[1,2,3,4].map((i)=>(
            <div key={i} className="flex justify-between">
              <div className="h-4 w-28 bg-gray-200 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <div className="h-5 w-40 bg-gray-200 rounded"></div>
        </CardHeader>

        <CardContent>

          {/* Desktop Table */}
          <div className="hidden md:block space-y-3">
            {[1,2,3].map((i)=>(
              <div key={i} className="grid grid-cols-5 gap-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {[1,2].map((i)=>(
              <div key={i} className="space-y-2 border rounded-lg p-3">
                <div className="flex justify-between">
                  <div className="h-3 w-24 bg-gray-200 rounded"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded"></div>
                </div>

                <div className="flex justify-between">
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                  <div className="h-3 w-28 bg-gray-200 rounded"></div>
                </div>

                <div className="flex justify-between">
                  <div className="h-3 w-16 bg-gray-200 rounded"></div>
                  <div className="h-3 w-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>

        </CardContent>
      </Card>

    </div>
  );
}