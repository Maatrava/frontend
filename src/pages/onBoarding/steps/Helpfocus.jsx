import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../components/PrimaryButton.jsx";
import { useOnboarding } from "../OnboardingContext";
import ProgressBar from "../../../components/ProgressBar.jsx";
import apiClient from "../../../api/client.js";

const HELP_OPTIONS = [
  { value: "baby-care", label: "Baby care" },
  { value: "mother-recovery", label: "Mother's recovery" },
  { value: "both", label: "Both" },
  { value: "exploring", label: "Just exploring" },
];

export default function HelpFocus() {
  const nav = useNavigate();
  const { data, setField } = useOnboarding();
  const [selected, setSelected] = useState(data.helpFocus || null);

  const handleSelect = (value) => {
    setSelected(value);
    setField("helpFocus", [value]); // Backend expects array of strings
  };

  const handleFinish = async () => {
    try {
      const payload = {
        preferredLanguage: data.preferredLanguage,
        feedingType: data.feedingType,
        babyAgeWeeks: data.babyAgeWeeks,
        deliveryType: data.deliveryType,
        helpFocus: data.helpFocus,
      };
      await apiClient("/api/onboarding", {
        method: "POST",
        body: payload,
      });
      nav("/home");
    } catch (err) {
      console.error("Onboarding failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50/30 flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <button
          onClick={() => nav(-1)}
          className="w-10 h-10 rounded-full bg-white hover:bg-gray-50 shadow-sm flex items-center justify-center transition-all duration-200 hover:shadow-md active:scale-95"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="px-6 pb-8">
        <ProgressBar value={100} />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-6 flex flex-col">
        <div className="flex-1 flex flex-col justify-start pt-12 max-w-md mx-auto w-full">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight leading-tight">
            What would you
            <br />
            like help with
            <br />
            right now?
          </h1>

          <p className="text-gray-500 text-sm mb-8">
            We'll personalize your experience
          </p>

          {/* Options Grid */}
          <div className="space-y-3">
            {HELP_OPTIONS.map((option, index) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full h-16 rounded-2xl border-2 transition-all duration-200 active:scale-[0.98] flex items-center px-6 gap-3 ${selected === option.value
                  ? "bg-yellow-50 border-yellow-300 shadow-lg shadow-emerald-100/50"
                  : "bg-white border-gray-200 hover:border-yellow-300 hover:shadow-md"
                  }`}
                style={{
                  animation: `slideIn 0.3s ease-out ${index * 0.08}s backwards`,
                }}
              >
                <span
                  className={`text-base font-medium ${selected === option.value ? "text-emerald-900" : "text-gray-700"
                    }`}
                >
                  {option.label}
                </span>
              </button>
            ))}
          </div>

          {/* Bottom Button */}
          <div className="mt-12 bg-pink-200 hover:bg-pink-300 transition font-semibold text-gray-800 shadow-md rounded-full">
            <PrimaryButton
              onClick={handleFinish}
              disabled={!selected}
            >
              Get Started
            </PrimaryButton>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}