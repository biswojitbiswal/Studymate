'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useCheckoutDetails } from '@/hooks/public/useOrder';
import { useCheckoutCoupons, useValidateCoupon } from '@/hooks/admin/useCoupon';
import { toast } from 'sonner';
import { CheckoutSkeleton } from '@/components/skeleton/CheckoutSkeleton';
import { InlineLoader } from '@/components/common/InlineLoader';


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
    if (!days || days?.length === 0) return "Flexible";
    return days.map(d => DAY_MAP[d] || d).join(", ");
}



const CheckoutPage = () => {
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    // const [promoCode, setPromoCode] = useState('');
    // const [currentCouponIndex, setCurrentCouponIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [enableTransition, setEnableTransition] = useState(true);


    const param = useParams();

    const { data, isLoading: checkoutLoading } = useCheckoutDetails(param?.id);
    const { data: availableCoupons, isLoading: couponLoading } = useCheckoutCoupons(param?.id, 'CLASS')
    const validateCouponMutation = useValidateCoupon();

    const loopCoupons = availableCoupons?.length > 0 ? [...availableCoupons, availableCoupons[0]] : [];


    const goTo = (index) => {
        setActiveIndex(index);
    };

    useEffect(() => {
        if (!availableCoupons?.length) return;
        if (selectedCoupon) return;
        if (isPaused) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => prev + 1);
        }, 3000);

        return () => clearInterval(interval);
    }, [availableCoupons, selectedCoupon, isPaused]);


    useEffect(() => {
        if (!availableCoupons?.length) return;

        // reached cloned slide
        if (activeIndex === availableCoupons?.length) {
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


    const classDetails = {
        title: 'Math Tutoring Session',
        instructor: 'Mr. Sharma',
        duration: '1 Hour',
        image: '/class-image.jpg',
        tutorFee: 500,
        platformFee: 50,
        gstRate: 18
    };


    const applyCoupon = (coupon) => {
        validateCouponMutation.mutate(
            {
                couponCode: coupon.code,
                productId: param?.id,
                itemType: "CLASS",
            },
            {
                onSuccess: (res) => {
                    // console.log(res);

                    setSelectedCoupon({
                        ...coupon,
                        pricing: res?.data?.pricing,
                    });
                    // setPromoCode(coupon.code);

                    // lock slider on selected coupon
                    const index = availableCoupons.findIndex(c => c?.id === coupon?.id);
                    setActiveIndex(index);

                    toast.success("Coupon applied 🎉");
                },

                onError: (err) => {
                    const msg =
                        err?.response?.data?.message || "Coupon not valid";
                    toast.error(msg);
                },
            }
        )
    };


    const removeCoupon = () => {
        setSelectedCoupon(null);
    };


    // Create Order
    // Intergrate Razorpay


    return (
        checkoutLoading ? <CheckoutSkeleton /> : <div className="min-h-screen px-4 sm:px-6 lg:px-22 pb-6">
            <div className="max-w-7xl mx-auto pb-14 lg:pb-0">
                {/* Header */}
                <div className="hidden lg:block text-center mb-4">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                        Secure Checkout
                    </h1>
                    <p className="text-gray-600">Complete your payment to book your class</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-8">
                    {/* Left Section - Class Details & Coupons */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Class Details Card */}
                        <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.1)] py-4 px-5 sm:px-6 overflow-hidden">

                            {/* HEADER */}
                            <div className="flex items-start justify-between mb-3">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Class Details
                                </h2>

                                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span className="font-medium">Secure Payment</span>
                                </div>
                            </div>

                            {/* MAIN BODY */}
                            <div className="flex flex-col lg:flex-row gap-6">

                                {/* LEFT SIDE */}
                                <div className="flex-1">

                                    <div className="flex flex-col lg:flex-row gap-5">

                                        {/* IMAGE */}
                                        <div className="lg:w-44 flex-shrink-0">
                                            <img
                                                src={data?.klass?.previewImg}
                                                alt={data?.klass?.title}
                                                className="w-full h-44 lg:h-32 object-cover rounded-xl"
                                            />
                                        </div>

                                        {/* CLASS INFO */}
                                        <div className="flex-1">

                                            {/* TITLE */}
                                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 break-words">
                                                {data?.klass?.title}
                                            </h3>

                                            {/* INSTRUCTOR */}
                                            <p className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Instructor:
                                                <span className="font-medium">
                                                    {data?.klass?.tutor?.user?.name || "Instructor"}
                                                </span>
                                            </p>

                                            {/* SCHEDULE */}
                                            <p className="flex items-center gap-2 text-sm text-gray-600 mt-2">
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

                                    {/* ===== MOBILE INFO PANEL ===== */}
                                    <div className="grid grid-cols-3 gap-3 mt-4 lg:hidden">

                                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                                            <p className="text-xs text-gray-500">Price</p>
                                            <p className="font-bold text-blue-600">
                                                ₹{data?.klass?.price?.toFixed(2)}
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                                            <p className="text-xs text-gray-500">Type</p>
                                            <p className="font-semibold">
                                                {data?.klass?.type === "GROUP" ? "Group" : "Private"}
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                                            <p className="text-xs text-gray-500">Seats</p>
                                            <p className="font-semibold">
                                                {data?.klass?.capacity}
                                            </p>
                                        </div>

                                    </div>
                                </div>


                                {/* ===== RIGHT SIDEBAR (DESKTOP ONLY) ===== */}
                                <div className="hidden lg:flex w-52 border-l pl-6 flex-col justify-between">

                                    <div className="space-y-4">

                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Class Price</span>
                                            <span className="text-xl font-bold text-blue-600">
                                                ₹{data?.klass?.price?.toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Type</span>
                                            <span className="font-medium">
                                                {data?.klass?.type === "GROUP" ? "Group" : "Private"}
                                            </span>
                                        </div>

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
                        {availableCoupons?.length > 0 && (
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
                                            const isApplied = selectedCoupon?.id === coupon?.id;

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
                                                                    {coupon?.code}
                                                                </span>

                                                                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md">
                                                                    {coupon?.discountType === "PERCENTAGE"
                                                                        ? `${coupon?.discountValue}% OFF`
                                                                        : `₹${coupon.discountValue} OFF`}
                                                                </span>
                                                            </div>

                                                            {coupon.description && (
                                                                <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">
                                                                    {coupon?.description}
                                                                </p>
                                                            )}
                                                        </div>

                                                        {/* RIGHT BUTTON */}
                                                        <button
                                                            onClick={() => applyCoupon(coupon)}
                                                            disabled={isApplied || validateCouponMutation.isPending}
                                                            className={`flex-shrink-0 px-4 py-1.5 rounded-lg text-sm font-medium transition hover:cursor-pointer
                                                            ${isApplied
                                                                    ? "bg-green-600 text-white cursor-not-allowed"
                                                                    : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                                                                }`}
                                                        >
                                                            {validateCouponMutation.isPending
                                                                ? <InlineLoader />
                                                                : isApplied
                                                                    ? "Applied"
                                                                    : "Apply"}
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
                                            className={`h-2 w-2 rounded-full transition hover:cursor-pointer ${activeIndex % availableCoupons?.length === index
                                                ? "bg-blue-600 w-4"
                                                : "bg-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}




                        {/* Payment Methods */}
                        <div className="hidden lg:block bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6">
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
                                            className="text-red-600 hover:text-red-700 hover:cursor-pointer"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <code className="text-xs font-mono text-green-700">
                                        {selectedCoupon?.code}
                                    </code>
                                </div>
                            )}

                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-gray-700">
                                    <span>Tutor Fee</span>
                                    <span className="font-medium">₹{selectedCoupon?.pricing?.subtotal ?? data?.pricing?.subtotal?.toFixed(2)}</span>
                                </div>


                                {selectedCoupon && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount</span>
                                        <span className="font-medium">-₹{selectedCoupon?.pricing?.discount?.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between text-gray-700 text-sm">
                                    <span>Tax ({selectedCoupon?.pricing?.toalTaxPecentage ?? data?.pricing?.toalTaxPecentage}%)</span>
                                    <span className="font-medium">₹{selectedCoupon?.pricing?.totaltaxAmount ?? data?.pricing?.totaltaxAmount?.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                                    <span className="text-2xl font-bold text-blue-600">
                                        ₹{selectedCoupon?.pricing?.totalAmount ?? data?.pricing?.totalAmount?.toFixed(2)}
                                    </span>
                                </div>
                                {selectedCoupon && (
                                    <p className="text-sm text-green-600 mt-1 text-right">
                                        You saved ₹{selectedCoupon?.pricing?.discount?.toFixed(2)}!
                                    </p>
                                )}
                            </div>

                            <button className="hidden lg:block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:cursor-pointer hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                Pay ₹{selectedCoupon?.pricing?.totalAmount ?? data?.pricing?.totalAmount?.toFixed(2)}
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

                    {/* Mobile Sticky Pay Bar */}
                    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3">

                        {/* Price Row */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500">Total Amount</span>
                                <span className="text-lg font-bold text-gray-900">
                                    ₹{selectedCoupon?.pricing?.totalAmount ?? data?.pricing?.totalAmount?.toFixed(2)}
                                </span>
                                {selectedCoupon && (
                                    <span className="text-xs text-green-600">
                                        Saved ₹{selectedCoupon?.pricing?.discount?.toFixed(2)}
                                    </span>
                                )}
                            </div>

                            {/* Pay Button */}
                            <button className="ml-4 flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold text-base hover:from-blue-700 hover:cursor-pointer hover:to-indigo-700 transition-all shadow-md active:scale-95">
                                Pay ₹{selectedCoupon?.pricing?.totalAmount ?? data?.pricing?.totalAmount?.toFixed(2)}
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default CheckoutPage;