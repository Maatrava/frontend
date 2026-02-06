import { useState } from "react";
import {User, LockKeyhole, Eye, EyeOff} from 'lucide-react'
import {Link} from 'react-router-dom'
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect backend
    console.log("Login submitted");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="maatrava_logo.png"
            alt="Maatrava Logo"
            className="w-28 h-28 rounded-full shadow-md"
          />
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Welcome to Maatrava
        </h1>
        <p className="text-center text-sm text-indigo-300 mt-1 mb-6">
          Your Companion in Maternal & Child Health
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="flex items-center bg-amber-50 rounded-full px-4 py-3">
            <span className="mr-3 text-gray-500"><User /></span>
            <input
              type="text"
              placeholder="Username"
              className="bg-transparent outline-none w-full text-sm"
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

          {/* Forgot password */}
          <div className="text-right">
            <button
              type="button"
              className="text-xs text-gray-400 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-pink-200 hover:bg-pink-300 transition font-semibold text-gray-800 shadow-md"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">Or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google login */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border rounded-xl py-3 text-sm font-medium shadow-sm hover:bg-gray-50"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </form>

        {/* Bottom text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span className="font-semibold text-gray-900 cursor-pointer hover:underline">
            <Link to="/signin">Sign Up</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
