import { useState } from "react";
import { LockKeyhole, User, Mail, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import apiClient from "../api/client";
import { setAuthToken, setUserData } from "../auth/token";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await apiClient("/api/auth/signup", {
        body: { name, email, password },
      });
      setAuthToken(response.token);
      setUserData(response.user);

      if (response.user.onboardingCompleted) {
        navigate("/home");
      } else {
        navigate("/onboarding/language");
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="maatrava_logo.png"
            alt="App Logo"
            className="w-28 h-28 rounded-full shadow-md"
          />
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Create your account
        </h1>
        <p className="text-center text-sm text-indigo-300 mt-1 mb-6">
          Join Maatrava today, where motherly care meets smart guidance.
        </p>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex items-center bg-amber-50 rounded-full px-4 py-3">
            <span className="mr-3 text-gray-500"><User /></span>
            <input
              type="text"
              placeholder="Full Name"
              className="bg-transparent outline-none w-full text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="flex items-center bg-amber-50 rounded-full px-4 py-3">
            <span className="mr-3 text-gray-500"><LockKeyhole /></span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-transparent outline-none w-full text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-pink-200 hover:bg-pink-300 transition font-semibold text-gray-800 shadow-md disabled:bg-gray-200"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">Or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google Signup */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border rounded-xl py-3 text-sm font-medium shadow-sm hover:bg-gray-50"
          >
            <img
              src="/google.png"
              alt="Google"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>
        </form>

        {/* Bottom link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span className="font-semibold text-gray-900 cursor-pointer hover:underline">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
