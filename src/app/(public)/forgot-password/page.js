"use client"
import { useForgotPassword } from "@/hooks/public/useAuth";
import { Mail, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { mutate, isPending } = useForgotPassword();


    const handleSubmit = (e) => {
        e.preventDefault();

        mutate(email, {
            onSuccess: () => {
                toast.success("If an account exists, a reset link has been sent 📩");
                setIsSubmitted(true);
                setEmail(""); // optional
            },

            onError: (err) => {
                toast.error(
                    err.response?.data?.message || "Something went wrong"
                );
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-md p-6">

                {/* Back to login */}
                <button className="flex items-center text-sm text-gray-500 mb-4 hover:text-black hover:cursor-pointer">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to login
                </button>

                {!isSubmitted ? (
                    <>
                        {/* Heading */}
                        <h2 className="text-2xl font-semibold mb-2">
                            Forgot Password?
                        </h2>
                        <p className="text-gray-500 text-sm mb-6">
                            Enter your email and we’ll send you a reset link.
                        </p>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Email
                                </label>

                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full pl-10 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition hover:cursor-pointer"
                            >
                                {isPending ? "Sending..." : "Send Reset Link"}
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        {/* Success State */}
                        <h2 className="text-2xl font-semibold mb-2 text-green-600">
                            Check your email
                        </h2>
                        <p className="text-gray-500 text-sm">
                            We’ve sent a password reset link to{" "}
                            <span className="font-medium">{email}</span>
                        </p>

                        <button
                            className="mt-6 w-full bg-gray-100 py-2 rounded-lg hover:bg-gray-200 hover:cursor-pointer"
                            onClick={() => setIsSubmitted(false)}
                        >
                            Resend
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}