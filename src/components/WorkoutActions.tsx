"use client";

import { IWorkout } from "@/types/type";
import { toast } from "react-toastify";

interface WorkoutActionsProps {
  workout: IWorkout;
}

const WorkoutActions = ({ workout }: WorkoutActionsProps) => {
  
  const handleAddToPlan = () => {
    const plan: IWorkout[] = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    
    if (plan.some((item) => item.id === workout.id)) {
      toast.info("Already added to plan!");
      return;
    }

     if (plan.length >= 5) {
      toast.error("You can add maximum 5 exercises.");
      return;
    }

    const updatedPlan = [...plan, workout];

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

   
    window.dispatchEvent(new Event("fitlog-update"));

    toast.success("Added to today's plan!");
  };

 
  const handleSave = () => {
    const saved: IWorkout[] = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

   
    if (saved.some((item) => item.id === workout.id)) {
      toast.info("Already saved!");
      return;
    }

    const updatedSaved = [...saved, workout];

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

   
    window.dispatchEvent(new Event("fitlog-update"));

    toast.success("Saved for later!");
  };

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">

      
      <button
        type="button"
        onClick={handleAddToPlan}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-lime-400 px-4 py-3 text-xs font-semibold text-black transition hover:bg-lime-300 sm:w-auto sm:px-5 sm:text-sm"
      >
        <span>▣</span>
        Add to today's plan
      </button>

    
      <button
        type="button"
        onClick={handleSave}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#343743] bg-transparent px-4 py-3 text-xs font-medium text-gray-200 transition hover:bg-[#20222c] sm:w-auto sm:px-5 sm:text-sm"
      >
        <span>🔰</span>
        Save for later
      </button>

    </div>
  );
};

export default WorkoutActions;