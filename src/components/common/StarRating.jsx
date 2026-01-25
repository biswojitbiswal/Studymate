import { Star } from "lucide-react";

// export const StarRating = ({ rating, max = 5 }) => {
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 >= 0.5;
//   const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

//   return (
//     <div className="flex items-center gap-0.5">
//       {/* Full stars */}
//       {Array.from({ length: fullStars }).map((_, i) => (
//         <Star
//           key={`full-${i}`}
//           className="w-4 h-4 fill-yellow-400 text-yellow-400"
//         />
//       ))}

//       {/* Half star */}
//       {hasHalfStar && (
//         <Star
//           className="w-4 h-4 text-yellow-400"
//           style={{
//             fill: "url(#half-star)",
//           }}
//         />
//       )}

//       {/* Empty stars */}
//       {Array.from({ length: emptyStars }).map((_, i) => (
//         <Star
//           key={`empty-${i}`}
//           className="w-4 h-4 text-gray-300"
//         />
//       ))}

//       {/* Rating number */}
//       <span className="ml-1 text-sm font-semibold text-gray-700">
//         {rating.toFixed(1)}
//       </span>
//     </div>
//   );
// };



export const StarRating = ({ rating, size = 16 }) => {
  const fullStars = Math.floor(rating);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={`${
            i < fullStars
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}

      <span
        className="ml-1 font-semibold text-gray-700"
        style={{ fontSize: size - 2 }}
      >
        {rating.toFixed(1)}
      </span>
    </div>
  );
};



// export const StarRating = ({ rating }) => {
//     const stars = Math.round(rating);

//     return (
//         <div className="flex items-center gap-0.5">
//             {Array.from({ length: 5 }).map((_, i) => (
//                 <Star
//                     key={i}
//                     className={`w-4 h-4 ${i < stars
//                             ? "fill-yellow-400 text-yellow-400"
//                             : "text-gray-300"
//                         }`}
//                 />
//             ))}
//             <span className="ml-1 text-sm font-semibold text-gray-700">
//                 {rating.toFixed(1)}
//             </span>
//         </div>
//     );
// };
