"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function ReviewCard({
  existingReview, // { rating: number, reviewText: string }
  onSubmit,
  isSubmitting = false,
}) {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState(
    existingReview?.reviewText || ""
  );

  const isAlreadyReviewed = !!existingReview;

  const handleSubmit = () => {
    if (!rating) return;
    onSubmit({ rating, reviewText });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md p-5 shadow-sm">
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
            className="transition-transform hover:scale-110"
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
          className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      )}
    </div>
  );
}