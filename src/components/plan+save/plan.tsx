"use client";

import { IWorkout } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  Check,
  Clock,
  Flame,
  Star,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MyPlan = () => {
  const [plan, setPlan] = useState<IWorkout[]>([]);
  const [saved, setSaved] = useState<IWorkout[]>([]);

  useEffect(() => {
    const planData: IWorkout[] = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    const savedData: IWorkout[] = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    setPlan(planData);
    setSaved(savedData);
  }, []);

  
  const handleRemove = (id: number) => {
    const updatedPlan = plan.filter(
      (workout) => workout.id !== id
    );

    setPlan(updatedPlan);

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    window.dispatchEvent(new Event("fitlog-update"));
  };

  const handleDone = (id: number) => {
    const updatedPlan = plan.filter(
      (workout) => workout.id !== id
    );

    setPlan(updatedPlan);

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    window.dispatchEvent(new Event("fitlog-update"));
  };

  const handleSave = (workout: IWorkout) => {
    const alreadySaved = saved.some(
      (item) => item.id === workout.id
    );

    let updatedSaved: IWorkout[];

    if (alreadySaved) {
      updatedSaved = saved.filter(
        (item) => item.id !== workout.id
      );

      toast.info("Plan removed from saved!");
    } else {
      updatedSaved = [...saved, workout];

      toast.success("Plan saved successfully!");
    }

    setSaved(updatedSaved);

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    window.dispatchEvent(new Event("fitlog-update"));
  };

  // STATS
  const totalExercises = plan.length;

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  
  const sortedPlan = [...plan].sort(
    (a, b) =>
      b.duration - a.duration ||
      b.caloriesBurned - a.caloriesBurned
  );

  return (
    <div>
     
      <div className="mb-6 grid grid-cols-1 gap-3 sm:mb-8 sm:grid-cols-3 sm:gap-4">

        <div className="rounded-xl border border-white/10 bg-[#15161d] p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lime-400 text-black sm:h-10 sm:w-10">
              <Check size={18} />
            </div>

            <span className="text-[11px] font-bold uppercase text-gray-400 sm:text-xs">
              Exercises
            </span>
          </div>

          <h2 className="text-2xl font-black sm:text-3xl">
            {totalExercises}
          </h2>
        </div>

      
        <div className="rounded-xl border border-white/10 bg-[#15161d] p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lime-400 text-black sm:h-10 sm:w-10">
              <Clock size={18} />
            </div>

            <span className="text-[11px] font-bold uppercase text-gray-400 sm:text-xs">
              Minutes
            </span>
          </div>

          <h2 className="text-2xl font-black sm:text-3xl">
            {totalMinutes}
          </h2>
        </div>

        
        <div className="rounded-xl border border-white/10 bg-[#15161d] p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lime-400 text-black sm:h-10 sm:w-10">
              <Flame size={18} />
            </div>

            <span className="text-[11px] font-bold uppercase text-gray-400 sm:text-xs">
              Calories
            </span>
          </div>

          <h2 className="text-2xl font-black sm:text-3xl">
            {totalCalories}
          </h2>
        </div>
      </div>

      
      {plan.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#111217] px-4 py-14 text-center sm:py-20">
          <Check
            size={40}
            className="mx-auto mb-5 text-gray-600 sm:h-[45px] sm:w-[45px]"
          />

          <h2 className="text-xl font-black uppercase sm:text-2xl">
            Your Plan Is Empty
          </h2>

          <p className="mx-auto mt-2 max-w-md text-xs text-gray-500 sm:text-sm">
            Add workouts from the library to build your plan.
          </p>

          <Link
            href="/"
            className="mt-5 inline-block rounded-lg bg-lime-400 px-5 py-3 text-xs font-black uppercase text-black hover:bg-lime-300 sm:mt-6 sm:px-6 sm:text-sm"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        /* PLAN CARDS */
        <div className="flex flex-col gap-3 sm:gap-4">
          {sortedPlan.map((workout) => {
            const isSaved = saved.some(
              (item) => item.id === workout.id
            );

            return (
              <div
                key={workout.id}
                className="flex items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-[#15161d] p-2 transition hover:border-lime-400/40 sm:gap-4 sm:p-3"
              >
               
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md sm:h-16 sm:w-24 md:h-16 md:w-24">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />

                
                  <button
                    onClick={() => handleSave(workout)}
                    aria-label={
                      isSaved
                        ? "Remove from saved"
                        : "Save workout"
                    }
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
                  >
                    <Bookmark
                      size={13}
                      fill={
                        isSaved
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                </div>

                
                <div className="min-w-0 flex-1">
                 
                  <h3 className="truncate text-xs font-black uppercase text-white sm:text-sm">
                    {workout.name}
                  </h3>

                  <p className="mt-1 truncate text-[10px] text-gray-400 sm:text-xs">
                    {workout.equipment}
                  </p>

                 
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[9px] text-gray-300 sm:text-[10px]">
                    <span className="flex items-center gap-1">
                      <Clock
                        size={11}
                        className="text-lime-400"
                      />
                      {workout.duration} min
                    </span>

                    <span className="flex items-center gap-1">
                      <Flame
                        size={11}
                        className="text-lime-400"
                      />
                      {workout.caloriesBurned} kcal
                    </span>

                    <span className="flex items-center gap-1">
                      <Star
                        size={11}
                        className="text-lime-400"
                      />
                      {workout.rating}
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                  <Link
                    href={`/Work/${workout.id}`}
                    className="rounded-lg border border-white/10 px-2 py-1.5 text-[9px] font-medium text-gray-300 transition hover:border-lime-400 hover:text-lime-400 sm:px-3 sm:text-[10px]"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() => handleDone(workout.id)}
                    className="flex items-center gap-1 rounded-lg bg-lime-400 px-2 py-1.5 text-[9px] font-black uppercase text-black transition hover:bg-lime-300 sm:px-3 sm:text-[10px]"
                  >
                    <Check size={12} />

                    <span className="hidden sm:inline">
                      Mark as Done
                    </span>

                    <span className="sm:hidden">
                      Done
                    </span>
                  </button>

                  <button
                    onClick={() => handleRemove(workout.id)}
                    aria-label="Remove workout"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-gray-500 transition hover:bg-white/5 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyPlan;