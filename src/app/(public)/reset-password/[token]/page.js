"use client"
import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useResetPassword } from "@/hooks/public/useAuth";
import { toast } from "sonner";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showCnfPassword, setShowCnfPassword] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { mutate, isPending } = useResetPassword();

    // ✅ Get token from URL
    const {token} = useParams();
    console.log(token);
    

    const handleSubmit = (e) => {
        e.preventDefault();

        // ❌ No token
        if (!token) {
            toast.error("Invalid or missing token");
            return;
        }

        // ❌ Validation
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        // ✅ API call
        mutate(
            {
                token,
                data: { newPassword: password },
            },
            {
                onSuccess: () => {
                    toast.success("Password reset successful 🎉");
                    setIsSuccess(true);
                },
                onError: (err) => {
                    toast.error(
                        err.response?.data?.message || "Invalid or expired token"
                    );
                },
            }
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">

                {!isSuccess ? (
                    <>
                        {/* Heading */}
                        <h2 className="text-2xl font-semibold mb-2">
                            Reset Password
                        </h2>
                        <p className="text-gray-500 text-sm mb-6">
                            Enter your new password below.
                        </p>

                        <form onSubmit={handleSubmit}>
                            {/* Password */}
                            <div className="mb-4">
                                <label className="block text-sm mb-1">
                                    New Password
                                </label>

                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2"
                                        placeholder="Enter new password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-gray-500 hover:cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="mb-4">
                                <label className="block text-sm mb-1">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <input
                                        type={showCnfPassword ? "text" : "password"}
                                        className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2"
                                        placeholder="Confirm password"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCnfPassword(!showCnfPassword)}
                                        className="absolute right-3 top-3 text-gray-500 hover:cursor-pointer"
                                    >
                                        {showCnfPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 hover:cursor-pointer"
                            >
                                {isPending ? "Resetting..." : "Reset Password"}
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        {/* Success State */}
                        <h2 className="text-2xl font-semibold text-green-600 mb-2">
                            Password Updated ✅
                        </h2>

                        <p className="text-gray-500 text-sm mb-6">
                            Your password has been successfully reset. You can now log in.
                        </p>

                        <Link
                            href="/signin"
                            className="block text-center w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer"
                        >
                            Go to Login
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}