"use client";

import { toast } from "sonner";
import { FaFacebook, FaGoogle, FaInstagramSquare } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const PROVIDERS = [
  { name: "Google", Icon: FaGoogle },
  { name: "Facebook", Icon: FaFacebook },
  { name: "Instagram", Icon: FaInstagramSquare },
  { name: "X", Icon: BsTwitterX },
];

export default function SocialAuthButtons() {
  const showComingSoon = (provider) => {
    toast.info(
      `${provider} login is coming soon. Please use email and password for now.`,
      {
        duration: 2500,
        closeButton: true,
      },
    );
  };

  return (
    <div className="flex items-center justify-center gap-6">
      {PROVIDERS.map(({ name, Icon }) => (
        <button
          key={name}
          type="button"
          onClick={() => showComingSoon(name)}
          aria-label={`Continue with ${name}`}
          title={`Continue with ${name}`}
          className="rounded-sm bg-blue-100 p-2 text-blue-600 transition hover:scale-110 hover:cursor-pointer"
        >
          <Icon className="h-6 w-6" />
        </button>
      ))}
    </div>
  );
}
