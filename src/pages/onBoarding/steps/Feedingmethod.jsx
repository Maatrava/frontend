import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../components/PrimaryButton.jsx";
import { useOnboarding } from "../OnboardingContext";
import ProgressBar from "../../../components/ProgressBar.jsx";

const FEEDING_OPTIONS = [
  { value: "breastfeeding", label: "Breastfeeding" },
  { value: "formula", label: "Formula feeding" },
  { value: "mixed", label: "Mixed" },
];

export default function FeedingMethod() {
  const nav = useNavigate();
  const { data, setField } = useOnboarding();
  const [selected, setSelected] = useState(data.feedingType || null);

  const handleSelect = (value) => {
    setSelected(value);
    setField("feedingType", value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/30 flex flex-col">
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
        <ProgressBar value={60} />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-6 flex flex-col">
        <div className="flex-1 flex flex-col justify-start pt-12 max-w-md mx-auto w-full">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight leading-tight">
            How is your baby
            <br />
            currently fed?
          </h1>

          {/* Options Grid */}
          <div className="space-y-3">
            {FEEDING_OPTIONS.map((option, index) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full h-16 rounded-2xl border-2 transition-all duration-200 active:scale-[0.98] flex items-center px-6 gap-3 ${selected === option.value
                    ? "bg-yellow-50 border-yellow-300 shadow-lg shadow-blue-100/50"
                    : "bg-white border-gray-200 hover:border-yellow-300 hover:shadow-md"
                  }`}
                style={{
                  animation: `slideIn 0.3s ease-out ${index * 0.08}s backwards`,
                }}
              >
                <span className="text-2xl">{option.icon}</span>
                <span
                  className={`text-base font-medium ${selected === option.value ? "text-blue-900" : "text-gray-700"
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
              onClick={() => nav("/onboarding/delivery")}
              disabled={!selected}
            >
              Continue
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