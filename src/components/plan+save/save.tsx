
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

const Save = () => {
  const [saved, setSaved] = useState<IWorkout[]>([]);

  useEffect(() => {
    const savedData: IWorkout[] = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]",
    );

    setSaved(savedData);
  }, []);

  // REMOVE FROM SAVED
  const handleRemove = (id: number) => {
    const updatedSaved = saved.filter(
      (workout) => workout.id !== id,
    );

    setSaved(updatedSaved);

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved),
    );

    window.dispatchEvent(new Event("fitlog-update"));
  };

  // STATS
  const totalExercises = saved.length;

  const totalMinutes = saved.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = saved.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  // SORT: DURATION HIGH TO LOW, THEN CALORIES HIGH TO LOW
  const sortedSaved = [...saved].sort(
    (a, b) =>
      b.duration - a.duration ||
      b.caloriesBurned - a.caloriesBurned,
  );

  return (
    <div>
      {/* STATS */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:mb-8 sm:grid-cols-3 sm:gap-4">
        {/* EXERCISES */}
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

        {/* MINUTES */}
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

        {/* CALORIES */}
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

      {/* EMPTY SAVED */}
      {saved.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#111217] px-4 py-14 text-center sm:py-20">
          <Bookmark
            size={40}
            className="mx-auto mb-5 text-gray-600 sm:h-[45px] sm:w-[45px]"
          />

          <h2 className="text-xl font-black uppercase sm:text-2xl">
            Nothing Here Yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-xs text-gray-500 sm:text-sm">
            Browse the library and add a lift to get today moving.
          </p>

          <Link
            href="/"
            className="mt-5 inline-block rounded-lg bg-lime-400 px-5 py-3 text-xs font-black uppercase text-black hover:bg-lime-300 sm:mt-6 sm:px-6 sm:text-sm"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        /* SAVED CARDS */
        <div className="flex flex-col gap-3 sm:gap-4">
          {sortedSaved.map((workout) => (
            <div
              key={workout.id}
              className="flex items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-[#15161d] p-2 transition hover:border-lime-400/40 sm:gap-4 sm:p-3"
            >
              {/* IMAGE */}
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md sm:h-16 sm:w-24 md:h-16 md:w-24">
                <Image
                  src={workout.image}
                  alt={workout.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              {/* WORKOUT INFO */}
              <div className="min-w-0 flex-1">
                {/* NAME */}
                <h3 className="truncate text-xs font-black uppercase text-white sm:text-sm">
                  {workout.name}
                </h3>

                {/* EQUIPMENT */}
                <p className="mt-1 truncate text-[10px] text-gray-400 sm:text-xs">
                  {workout.equipment}
                </p>

                {/* STATS */}
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[9px] text-gray-300 sm:text-[10px]">
                  <span className="flex items-center gap-1">
                    <Clock size={11} className="text-lime-400" />
                    {workout.duration} min
                  </span>

                  <span className="flex items-center gap-1">
                    <Flame size={11} className="text-lime-400" />
                    {workout.caloriesBurned} kcal
                  </span>

                  <span className="flex items-center gap-1">
                    <Star size={11} className="text-lime-400" />
                    {workout.rating}
                  </span>
                </div>
              </div>

              {/* BUTTONS RIGHT SIDE */}
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/Work/${workout.id}`}
                  className="rounded-lg border border-white/10 px-2 py-1.5 text-[9px] font-medium text-gray-300 transition hover:border-lime-400 hover:text-lime-400 sm:px-3 sm:text-[10px]"
                >
                  View Details
                </Link>

                <button
                  onClick={() => handleRemove(workout.id)}
                  aria-label="Remove workout"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-gray-500 transition hover:bg-white/5 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Save;