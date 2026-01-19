// export default function LoadingScreen() {
//   return (
//     <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-3">
//       {/* Spinner */}
//       <div className="relative w-10 h-10">
//         <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
//         <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
//       </div>

//       {/* Text */}
//       {/* <p className="text-sm text-slate-500 animate-pulse">
//         Loading, please wait…
//       </p> */}
//     </div>
//   );
// }


// export default function LoadingScreen() {
//   return (
//     <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-4">

//       {/* Spinner */}
//       <div className="relative w-12 h-12">
//         {/* Outer gradient ring */}
//         <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 animate-spin" />

//         {/* Inner cutout */}
//         <div className="absolute inset-1 rounded-full bg-white" />

//         {/* Center pulse dot */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
//         </div>
//       </div>

//       {/* Text */}
//       <p className="text-sm text-slate-500 tracking-wide animate-pulse">
//         Loading…
//       </p>
//     </div>
//   );
// }
export default function LoadingScreen() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-3">
      
      <div className="relative w-10 h-10">
        {/* Soft base */}
        <div className="absolute inset-0 rounded-full border-2 border-blue-100" />

        {/* Rotating arc */}
        <div className="absolute inset-0 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
      </div>

      <p className="text-xs text-slate-400 tracking-wide">
        Please wait
      </p>
    </div>
  );
}
