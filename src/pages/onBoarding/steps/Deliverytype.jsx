import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../components/PrimaryButton.jsx";
import { useOnboarding } from "../OnboardingContext.jsx";
import ProgressBar from "../../../components/ProgressBar.jsx";

const DELIVERY_OPTIONS = [
  { value: "normal", label: "Normal" },
  { value: "c-section", label: "C-section" },
];

export default function DeliveryType() {
  const nav = useNavigate();
  const { data, setField } = useOnboarding();
  const [selected, setSelected] = useState(data.deliveryType || null);

  const handleSelect = (value) => {
    setSelected(value);
    setField("deliveryType", value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50/30 flex flex-col">
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
        <ProgressBar value={80} />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-6 flex flex-col">
        <div className="flex-1 flex flex-col justify-start pt-12 max-w-md mx-auto w-full">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight leading-tight">
            How was the
            <br />
            delivery?
          </h1>

          {/* Options Grid */}
          <div className="space-y-3">
            {DELIVERY_OPTIONS.map((option, index) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full h-16 rounded-2xl border-2 transition-all duration-200 active:scale-[0.98] flex items-center px-6 gap-3 ${selected === option.value
                  ? "bg-yellow-50 border-yellow-300 shadow-lg shadow-purple-100/50"
                  : "bg-white border-gray-200 hover:border-yellow-300 hover:shadow-md"
                  }`}
                style={{
                  animation: `slideIn 0.3s ease-out ${index * 0.08}s backwards`,
                }}
              >
                <span
                  className={`text-base font-medium ${selected === option.value ? "text-purple-900" : "text-gray-700"
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
              onClick={() => nav("/onboarding/helpfocus")}
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