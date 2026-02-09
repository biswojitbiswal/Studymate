'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useCheckoutDetails } from '@/hooks/public/useOrder';
import { useCheckoutCoupons } from '@/hooks/admin/useCoupon';


const DAY_MAP = {
    MON: "Mon",
    TUE: "Tue",
    WED: "Wed",
    THU: "Thu",
    FRI: "Fri",
    SAT: "Sat",
    SUN: "Sun",
};

function formatDays(days) {
    if (!days || days.length === 0) return "Flexible";
    return days.map(d => DAY_MAP[d] || d).join(", ");
}



const CheckoutPage = () => {
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [promoCode, setPromoCode] = useState('');
    // const [currentCouponIndex, setCurrentCouponIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [enableTransition, setEnableTransition] = useState(true);


    const param = useParams();

    const { data, isLoading: checkoutLoading } = useCheckoutDetails(param.id);
    const { data: availableCoupons, isLoading: couponLoading } = useCheckoutCoupons(param.id, 'CLASS')
    console.log(availableCoupons);

    const loopCoupons = availableCoupons.length > 0 ? [...availableCoupons, availableCoupons[0]] : [];


    const goTo = (index) => {
        setActiveIndex(index);
    };

    useEffect(() => {
        if (!availableCoupons.length) return;
        if (selectedCoupon) return;
        if (isPaused) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => prev + 1);
        }, 3000);

        return () => clearInterval(interval);
    }, [availableCoupons, selectedCoupon, isPaused]);


    useEffect(() => {
        if (!availableCoupons.length) return;

        // reached cloned slide
        if (activeIndex === availableCoupons.length) {
            setTimeout(() => {
                setEnableTransition(false);
                setActiveIndex(0);
            }, 500);
        }

        // re-enable animation
        if (!enableTransition) {
            const t = setTimeout(() => setEnableTransition(true), 50);
            return () => clearTimeout(t);
        }
    }, [activeIndex, availableCoupons, enableTransition]);


    // Sample class data
    const classDetails = {
        title: 'Math Tutoring Session',
        instructor: 'Mr. Sharma',
        duration: '1 Hour',
        image: '/class-image.jpg',
        tutorFee: 500,
        platformFee: 50,
        gstRate: 18
    };

    const calculateTotal = () => {
        let subtotal = classDetails.tutorFee + classDetails.platformFee;
        let discount = 0;

        if (selectedCoupon) {
            if (selectedCoupon.type === 'percentage') {
                discount = (classDetails.tutorFee * selectedCoupon.discount) / 100;
            } else {
                discount = selectedCoupon.discount;
            }
        }

        const afterDiscount = subtotal - discount;
        const gst = (afterDiscount * classDetails.gstRate) / 100;
        const total = afterDiscount + gst;

        return {
            subtotal,
            discount,
            afterDiscount,
            gst,
            total
        };
    };

    const totals = calculateTotal();

    const applyCoupon = (coupon) => {
        setSelectedCoupon(coupon);
        setPromoCode(coupon.code);

        const index = availableCoupons.findIndex((c) => c.id === coupon.id);
        setActiveIndex(index);
    };



    const applyPromoCode = () => {
        const coupon = availableCoupons.find(
            (c) => c.code.toLowerCase() === promoCode.toLowerCase()
        );

        if (!coupon) {
            alert("Invalid promo code");
            return;
        }

        applyCoupon(coupon);
    };


    const removeCoupon = () => {
        setSelectedCoupon(null);
        setPromoCode("");
    };


    const nextCoupon = () => {
        setActiveIndex((prev) =>
            prev === availableCoupons.length - 1 ? 0 : prev + 1
        );
    };

    const prevCoupon = () => {
        setActiveIndex((prev) =>
            prev === 0 ? availableCoupons.length - 1 : prev - 1
        );
    };


    return (
        <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-22">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                {/* <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    Checkout
                </h1>
                <p className="text-gray-600">Complete your payment to book your class</p>
                </div> */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-8">
                    {/* Left Section - Class Details & Coupons */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Class Details Card */}
                        <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.1)] py-4 px-6">
                            <div className="flex items-start justify-between mb-2">
                                <h2 className="text-xl font-semibold text-gray-900">Class Details</h2>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span className="font-medium">Secure Payment</span>
                                </div>
                            </div>

                            <div className="flex gap-6">

                                {/* LEFT SIDE (existing info) */}
                                <div className="flex gap-4 flex-1">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={data?.klass?.previewImg}
                                            alt={data?.klass?.title}
                                            className="w-24 h-24 object-cover rounded-xl"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {data?.klass?.title}
                                        </h3>

                                        <div className="space-y-2 text-sm text-gray-600">

                                            {/* Instructor */}
                                            <p className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Instructor:
                                                <span className="font-medium">
                                                    {data?.klass?.tutor?.user?.name || "Instructor"}
                                                </span>
                                            </p>

                                            {/* Duration
                                            <p className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Duration:
                                                <span className="font-medium">
                                                    {getClassDuration(data?.sessions)}
                                                </span>
                                            </p> */}

                                            {/* Schedule */}
                                            <p className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                Schedule:
                                                <span className="font-medium">
                                                    {formatDays(data?.klass?.daysOfWeek)}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT SIDE (NEW INFO PANEL) */}
                                <div className="w-48 border-l pl-6 flex flex-col justify-between">

                                    <div className="space-y-3">

                                        {/* Price */}
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-medium text-gray-500">Class Price</span>
                                            <span className="text-medium font-bold text-blue-600">
                                                ₹{data?.klass?.price.toFixed(2)}
                                            </span>
                                        </div>

                                        {/* Type */}
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Type</span>
                                            <span className="font-medium">
                                                {data?.klass?.type === "GROUP" ? "Group" : "Private"}
                                            </span>
                                        </div>

                                        {/* Seats */}
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Capacity</span>
                                            <span className="font-medium">
                                                {data?.klass?.capacity}
                                            </span>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>


                        {/* Available Coupons – Single Card Carousel */}
                        {availableCoupons.length > 0 && (
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-5">

                                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                    Available Offers
                                </h2>

                                {/* Carousel */}
                                <div
                                    className="relative overflow-hidden min-h-[72px]"
                                    onMouseEnter={() => setIsPaused(true)}
                                    onMouseLeave={() => setIsPaused(false)}
                                >
                                    <div
                                        className={`flex ${enableTransition ? "transition-transform duration-500 ease-in-out" : ""
                                            }`}
                                        style={{
                                            transform: `translateX(-${activeIndex * 100}%)`,
                                        }}
                                    >
                                        {loopCoupons.map((coupon, index) => {
                                            const isApplied = selectedCoupon?.id === coupon.id;

                                            return (
                                                <div key={index} className="min-w-full px-1">
                                                    <div
                                                        className={`flex items-center justify-between gap-4 rounded-xl border px-4 py-3 transition
                ${isApplied
                                                                ? "border-green-500 bg-green-50"
                                                                : "border-gray-200 hover:border-blue-400"
                                                            }`}
                                                    >
                                                        {/* LEFT */}
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center gap-3">
                                                                <span className="font-semibold text-gray-900 text-sm tracking-wide">
                                                                    {coupon.code}
                                                                </span>

                                                                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md">
                                                                    {coupon.discountType === "PERCENTAGE"
                                                                        ? `${coupon.discountValue}% OFF`
                                                                        : `₹${coupon.discountValue} OFF`}
                                                                </span>
                                                            </div>

                                                            {coupon.description && (
                                                                <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">
                                                                    {coupon.description}
                                                                </p>
                                                            )}
                                                        </div>

                                                        {/* RIGHT BUTTON */}
                                                        <button
                                                            onClick={() => applyCoupon(coupon)}
                                                            disabled={isApplied}
                                                            className={`flex-shrink-0 px-4 py-1.5 rounded-lg text-sm font-medium transition
                  ${isApplied
                                                                    ? "bg-green-600 text-white cursor-not-allowed"
                                                                    : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                                                                }`}
                                                        >
                                                            {isApplied ? "Applied" : "Apply"}
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Dots */}
                                <div className="flex justify-center gap-2 mt-3">
                                    {availableCoupons.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goTo(index)}
                                            className={`h-2 w-2 rounded-full transition ${activeIndex % availableCoupons.length === index
                                                    ? "bg-blue-600 w-4"
                                                    : "bg-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}




                        {/* Payment Methods */}
                        <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Payment Method
                            </h2>
                            <div className="flex flex-wrap gap-4 items-center">
                                <div className='border border-blue-600 rounded-sm p-0.5'>
                                    <img src="/Visa.png" alt="Visa" className="h-8 w-14 rounded-sm" />
                                </div>
                                <div className='border border-blue-600 rounded-sm p-0.5'>
                                    <img src="/Mastercard.png" alt="Mastercard" className="h-8 w-14 rounded-sm" />
                                </div>

                                <div className='border border-blue-600 rounded-sm p-0.5'>
                                    <img src="/Rupay.png" alt="Rupay" className="h-8 w-14 rounded-sm" />
                                </div>

                                <div className='border border-blue-600 rounded-sm p-0.5'>
                                    <img src="/upi.png" alt="UPI" className="h-8 w-14 rounded-sm" />
                                </div>

                                <span className="text-sm text-gray-600">& more</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Order Summary (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 sticky top-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Order Summary
                            </h2>

                            {selectedCoupon && (
                                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium text-green-800">
                                            Coupon Applied!
                                        </span>
                                        <button
                                            onClick={removeCoupon}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <code className="text-xs font-mono text-green-700">
                                        {selectedCoupon.code}
                                    </code>
                                </div>
                            )}

                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-gray-700">
                                    <span>Tutor Fee</span>
                                    <span className="font-medium">₹{data?.pricing?.subtotal.toFixed(2)}</span>
                                </div>
                                {/* <div className="flex justify-between text-gray-700">
                                    <span>Platform Fee</span>
                                    <span className="font-medium">₹{classDetails.platformFee}</span>
                                </div> */}

                                {selectedCoupon && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount</span>
                                        <span className="font-medium">-₹{totals.discount.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between text-gray-700 text-sm">
                                    <span>Tax ({data?.pricing?.toalTaxPecentage}%)</span>
                                    <span className="font-medium">₹{data?.pricing?.totaltaxAmount.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                                    <span className="text-2xl font-bold text-blue-600">
                                        ₹{data?.pricing?.totalAmount.toFixed(2)}
                                    </span>
                                </div>
                                {selectedCoupon && (
                                    <p className="text-sm text-green-600 mt-1 text-right">
                                        You saved ₹{totals.discount.toFixed(2)}!
                                    </p>
                                )}
                            </div>

                            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                Pay ₹{data?.pricing?.totalAmount.toFixed(2)}
                            </button>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                By proceeding, you agree to the{' '}
                                <a href="#" className="text-blue-600 hover:underline">
                                    Terms & Conditions
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-blue-600 hover:underline">
                                    Privacy Policy
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;