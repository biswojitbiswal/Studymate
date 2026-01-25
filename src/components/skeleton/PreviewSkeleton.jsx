export const PreviewSkeleton = () => {
  return (
    <div className="sticky w-80 top-6 bg-white rounded-xl shadow-lg p-4 animate-pulse">
      <div className="h-5 w-40 bg-gray-200 rounded mb-4" />

      {/* Video */}
      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4" />

      {/* Title */}
      <div className="h-4 w-3/4 bg-gray-200 rounded mb-3" />

      {/* Tutor */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gray-200 rounded-full" />
        <div>
          <div className="h-3 w-24 bg-gray-200 rounded mb-1" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Meta */}
      <div className="space-y-2">
        <div className="h-3 w-40 bg-gray-200 rounded" />
        <div className="h-3 w-32 bg-gray-200 rounded" />
      </div>

      {/* Buttons */}
      <div className="mt-4 space-y-2">
        <div className="h-10 bg-gray-300 rounded-lg" />
        <div className="h-10 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
};
