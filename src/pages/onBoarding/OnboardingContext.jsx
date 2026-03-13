import React, { createContext, useContext, useMemo, useState } from "react";

const OnboardingContext = createContext(null);

const initial = {
  feedingType: "",
  babyAgeWeeks: 0,
  deliveryType: "",
  helpFocus: [],
};

export function OnboardingProvider({ children }) {
  const [data, setData] = useState(initial);

  const value = useMemo(
    () => ({
      data,
      setField: (key, val) => setData((prev) => ({ ...prev, [key]: val })),
      reset: () => setData(initial),
    }),
    [data]
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used inside OnboardingProvider");
  return ctx;
}
