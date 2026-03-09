import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { Link } from 'react-router-dom';
import apiClient from "../api/client";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");
        try {
            const response = await apiClient("/auth/forgot-password", {
                body: { email },
            });
            setMessage(response.message);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-sm">
                <div className="flex justify-center mb-4">
                    <img
                        src="/maatrava_logo.png"
                        alt="Logo"
                        className="w-28 h-28 rounded-full shadow-md"
                    />
                </div>

                <h1 className="text-center text-2xl font-bold text-gray-900">
                    Forgot Password
                </h1>
                <p className="text-center text-sm text-indigo-300 mt-1 mb-6">
                    Enter your email to receive a password reset link.
                </p>

                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                {message && <p className="text-green-500 text-sm text-center mb-4">{message}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center bg-amber-50 rounded-full px-4 py-3">
                        <span className="mr-3 text-gray-500"><Mail /></span>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="bg-transparent outline-none w-full text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-full bg-pink-200 hover:bg-pink-300 transition font-semibold text-gray-800 shadow-md disabled:bg-gray-200"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    <Link to="/login" className="flex items-center justify-center gap-2 font-semibold text-gray-900 hover:underline">
                        <ArrowLeft className="w-4 h-4" /> Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
