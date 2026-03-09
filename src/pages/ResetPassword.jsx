import { useState } from "react";
import { LockKeyhole, Eye, EyeOff } from "lucide-react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiClient from "../api/client";

export default function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setLoading(true);
        setError("");
        try {
            await apiClient("/auth/reset-password", {
                body: { token, newPassword },
            });
            alert("Password reset successful! Please login.");
            navigate("/login");
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-sm">
                <h1 className="text-center text-2xl font-bold text-gray-900 mb-6">
                    Reset Password
                </h1>

                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center bg-amber-50 rounded-full px-4 py-3">
                        <span className="mr-3 text-gray-500"><LockKeyhole /></span>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            className="bg-transparent outline-none w-full text-sm"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center bg-amber-50 rounded-full px-4 py-3">
                        <span className="mr-3 text-gray-500"><LockKeyhole /></span>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm New Password"
                            className="bg-transparent outline-none w-full text-sm"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="ml-2 text-gray-500"
                        >
                            {showPassword ? <Eye /> : <EyeOff />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-full bg-pink-200 hover:bg-pink-300 transition font-semibold text-gray-800 shadow-md disabled:bg-gray-200"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
