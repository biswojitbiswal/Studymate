"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function BookLoader({
  text = "Preparing your learning space...",
}) {
  return (
    <div
      className="
        h-screen 
        w-full 
        flex 
        flex-col 
        items-center 
        justify-center 
        
        gap-3
        bg-gradient-to-b 
        from-blue-50 
        via-white 
        to-blue-100
      "
    >
      {/* Lottie as spinner */}
      <div className="w-40 h-40">
        <DotLottieReact
          src="/Session.lottie"
          loop
          autoplay
        />
      </div>

      {/* Text */}
      {/* <p className="pl-8 text-sm font-medium text-gray-600">
        {text}
      </p> */}
    </div>
  );
}
