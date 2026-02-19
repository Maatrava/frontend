import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../components/PrimaryButton.jsx";
import { useOnboarding } from "../OnboardingContext";
import ProgressBar from "../../../components/ProgressBar.jsx";

const LANGS = [
  "English",
  "Hindi",
  "Malayalam",
  "Tamil",
  "Telugu",
];

export default function PreferredLanguage() {
  const nav = useNavigate();
  const { data, setField } = useOnboarding();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (lang) => {
    setField("preferredLanguage", lang);
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50/30 flex flex-col">
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
        <ProgressBar value={33} />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-6 flex flex-col">
        <div className="flex-1 flex flex-col justify-start pt-12 max-w-md mx-auto w-full">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">
            Preferred
            <br />
            Language
          </h1>

          {/* Custom Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full h-14 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 px-5 flex items-center justify-between text-left transition-all duration-200 hover:shadow-md hover:border-amber-200 active:scale-[0.98]"
            >
              <span className="text-gray-900 font-medium">
                {data.preferredLanguage || "Select"}
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                  }`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsOpen(false)}
                />

                {/* Menu */}
                <div className="absolute z-20 mt-2 w-full rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 shadow-xl overflow-hidden animate-slideDown">
                  {LANGS.map((lang, index) => (
                    <button
                      key={lang}
                      onClick={() => handleSelect(lang)}
                      className={`w-full px-5 py-3.5 text-left text-gray-900 transition-all duration-150 hover:bg-white/60 active:bg-white/80 ${data.preferredLanguage === lang
                        ? "bg-white/40 font-medium"
                        : ""
                        } ${index !== LANGS.length - 1 ? "border-b border-amber-100/50" : ""}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Helper Text */}
          <p className="mt-4 text-sm text-gray-500 text-center">
            You can change language later in settings
          </p>

          {/* Bottom Button */}
          <div className="mt-12 bg-pink-200 hover:bg-pink-300 transition font-semibold text-gray-800 shadow-md rounded-full">
            <PrimaryButton
              onClick={() => nav("/onboarding/babyage")}
              disabled={!data.preferredLanguage}
            >
              Proceed
            </PrimaryButton>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}