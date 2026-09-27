"use client";

import { IWorkout } from "@/types/type";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";


interface FitLogContextType {
  plan: IWorkout[];
  saved: IWorkout[];
  addToPlan: (workout: IWorkout) => void;
  saveWorkout: (workout: IWorkout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
}

const FitLogContext = createContext<FitLogContextType | undefined>(
  undefined
);

export const FitLogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [plan, setPlan] = useState<IWorkout[]>([]);
  const [saved, setSaved] = useState<IWorkout[]>([]);

  const addToPlan = (workout: IWorkout) => {
    setPlan((prev) =>
      prev.some((item) => item.id === workout.id)
        ? prev
        : prev.length >= 5
          ? prev
          : [...prev, workout]
    );
  };

  const saveWorkout = (workout: IWorkout) => {
    setSaved((prev) =>
      prev.some((item) => item.id === workout.id)
        ? prev
        : [...prev, workout]
    );
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        saveWorkout,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
};

export const useFitLog = () => {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error("useFitLog must be used inside FitLogProvider");
  }

  return context;
};