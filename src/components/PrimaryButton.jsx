import React from "react";

export default function PrimaryButton({ children, disabled, ...props }) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={[
        "w-full h-11 rounded-full font-medium transition",
        "bg-pink-200 text-gray-900 hover:bg-pink-300 active:scale-[0.99]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
