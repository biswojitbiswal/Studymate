"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useCreateReview, useGetReviewByStudent } from "@/hooks/public/useReview";

export default function ReviewCard({ classId }) {
  const { data, isLoading } = useGetReviewByStudent(classId);

  const {
    mutate: createReview,
    isPending: isSubmitting,
  } = useCreateReview();

  const existingReview = data?.data?.data || null;
  console.log(existingReview, "----------------");
  

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const isAlreadyReviewed = !!existingReview;

  // ✅ Prefill if already reviewed
  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setReviewText(existingReview.reviewText);
    }
  }, [existingReview]);

  // ✅ Submit handler
  const handleSubmit = () => {
    // 🔥 Validation
    if (!rating) {
      return toast.error("Please select a rating");
    }

    // if (reviewText.length < 10) {
    //   return toast.error("Review must be at least 10 characters");
    // }

    createReview(
      {
        classId,
        rating,
        reviewText,
      },
      {
        onSuccess: () => {
          toast.success("Review submitted successfully 🎉");
        },
        onError: (err) => {
          toast.error(
            err?.response?.data?.message || "Something went wrong"
          );
        },
      }
    );
  };

  // ⏳ Loading state
  if (isLoading) {
    return (
      <div className="p-5 border rounded-md">Loading review...</div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-md p-2 md:p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {isAlreadyReviewed ? "Your Review" : "Rate this Class"}
      </h3>

      {/* ⭐ Rating */}
      <div className="flex items-center gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            disabled={isAlreadyReviewed}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="transition-transform hover:scale-110 hover:cursor-pointer"
          >
            <Star
              className={`w-6 h-6 ${
                (hover || rating) >= star
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>

      {/* 📝 Review Text */}
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        disabled={isAlreadyReviewed}
        placeholder="Write your experience..."
        className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        rows={4}
      />

      {/* 🚀 Submit Button */}
      {!isAlreadyReviewed && (
        <button
          onClick={handleSubmit}
          disabled={!rating || isSubmitting}
          className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium disabled:opacity-50 hover:cursor-pointer"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      )}

      {/* ✅ Already Reviewed UI Enhancement */}
      {isAlreadyReviewed && (
        <div className="mt-4 text-sm text-green-600 font-medium">
          ✅ You have already reviewed this class
        </div>
      )}
    </div>
  );
}