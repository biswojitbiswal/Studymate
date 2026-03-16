"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AdminOrderDetailsSkeleton() {
  return (
    <div className="p-4 md:p-6 space-y-6 animate-pulse">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-9 w-28 bg-gray-200 rounded-lg"></div>
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
      </div>

      <div className="h-7 w-64 bg-gray-200 rounded"></div>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <div className="h-5 w-40 bg-gray-200 rounded"></div>
        </CardHeader>

        <CardContent className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map((i)=>(
            <div key={i} className="space-y-2">
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
              <div className="h-5 w-28 bg-gray-200 rounded"></div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Student */}
      <Card>
        <CardHeader>
          <div className="h-5 w-28 bg-gray-200 rounded"></div>
        </CardHeader>

        <CardContent className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>

          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-3 w-44 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>

      {/* Product */}
      <Card>
        <CardHeader>
          <div className="h-5 w-40 bg-gray-200 rounded"></div>
        </CardHeader>

        <CardContent className="flex gap-6">

          <div className="w-24 h-16 bg-gray-200 rounded-lg"></div>

          <div className="space-y-2">
            <div className="h-4 w-40 bg-gray-200 rounded"></div>
            <div className="h-3 w-28 bg-gray-200 rounded"></div>
            <div className="h-3 w-36 bg-gray-200 rounded"></div>
          </div>

        </CardContent>
      </Card>

      {/* Coupon */}
      <Card>
        <CardHeader>
          <div className="h-5 w-28 bg-gray-200 rounded"></div>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
        </CardContent>
      </Card>

      {/* Price Breakdown */}
      <Card>
        <CardHeader>
          <div className="h-5 w-40 bg-gray-200 rounded"></div>
        </CardHeader>

        <CardContent className="space-y-3">
          {[1,2,3,4].map((i)=>(
            <div key={i} className="flex justify-between">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Transactions */}

      <Card>
        <CardHeader>
          <div className="h-5 w-36 bg-gray-200 rounded"></div>
        </CardHeader>

        <CardContent>

          {/* Desktop Skeleton Table */}
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

          {/* Mobile Skeleton Cards */}
          <div className="md:hidden space-y-3">
            {[1,2].map((i)=>(
              <div key={i} className="border rounded-lg p-3 space-y-2">

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