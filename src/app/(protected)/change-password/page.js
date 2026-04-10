'use client'
import { useChangePassword } from "@/hooks/public/useAuth";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ChangePassword() {
    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [show, setShow] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const { mutate, isPending } = useChangePassword();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // ❌ Validation
        if (!form.currentPassword) {
            toast.error("Current password is required");
            return;
        }

        if (form.newPassword.length < 6) {
            toast.error("New password must be at least 6 characters");
            return;
        }

        if (form.newPassword !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (form.currentPassword === form.newPassword) {
            toast.error("New password must be different");
            return;
        }

        // ✅ API Call
        mutate(
            {
                oldPassword: form.currentPassword,
                newPassword: form.newPassword,
            },
            {
                onSuccess: () => {
                    toast.success("Password updated successfully ✅");

                    setForm({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    });
                },
                onError: (err) => {
                    toast.error(
                        err.response?.data?.message ||
                        "Failed to update password"
                    );
                },
            }
        );
    };

    return (
        <div className="w-full min-h-screen mt-6">
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">
                Change Password
            </h2>

            <form onSubmit={handleSubmit}>
                {/* Current Password */}
                <PasswordField
                    label="Current Password"
                    name="currentPassword"
                    value={form.currentPassword}
                    onChange={handleChange}
                    show={show.current}
                    toggle={() =>
                        setShow({ ...show, current: !show.current })
                    }
                />

                {/* New Password */}
                <PasswordField
                    label="New Password"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    show={show.new}
                    toggle={() =>
                        setShow({ ...show, new: !show.new })
                    }
                />

                {/* Confirm Password */}
                <PasswordField
                    label="Confirm Password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    show={show.confirm}
                    toggle={() =>
                        setShow({ ...show, confirm: !show.confirm })
                    }
                />

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 hover:cursor-pointer"
                >
                    {isPending ? "Updating..." : "Update Password"}
                </button>
            </form>
        </div>
        </div>
    );
}


function PasswordField({
    label,
    name,
    value,
    onChange,
    show,
    toggle,
}) {
    return (
        <div className="mb-4">
            <label className="block text-sm mb-1">{label}</label>

            <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                <input
                    type={show ? "text" : "password"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2"
                    placeholder={label}
                    required
                />

                <button
                    type="button"
                    onClick={toggle}
                    className="absolute right-3 top-3 text-gray-500 hover:cursor-pointer"
                >
                    {show ? (
                        <EyeOff className="h-5 w-5" />
                    ) : (
                        <Eye className="h-5 w-5" />
                    )}
                </button>
            </div>
        </div>
    );
}