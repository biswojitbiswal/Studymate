export default function LoadingScreen() {
  return (
    <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-3">
      {/* Spinner */}
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
      </div>

      {/* Text */}
      {/* <p className="text-sm text-slate-500 animate-pulse">
        Loading, please wait…
      </p> */}
    </div>
  );
}
