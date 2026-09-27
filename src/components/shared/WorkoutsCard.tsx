"use client";

import { IWorkout } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  workout: IWorkout,
}

const WorkoutCard = ({ workout }: Props) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved: IWorkout[] = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    setIsSaved(
      saved.some((item) => item.id === workout.id)
    );
  }, [workout.id]);

  // SAVE / UNSAVE
  const handleSave = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const saved: IWorkout[] = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    const alreadySaved = saved.some(
      (item) => item.id === workout.id
    );

    let updatedSaved: IWorkout[];

    if (alreadySaved) {
      updatedSaved = saved.filter(
        (item) => item.id !== workout.id
      );
    } else {
      updatedSaved = [...saved, workout];
    }

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    setIsSaved(!alreadySaved);

    window.dispatchEvent(new Event("fitlog-update"));
  };

  return (
    <Link
      href={`/Work/${workout.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#15161d] text-white transition hover:-translate-y-1 hover:border-lime-400/50"
    >
    
      <div className="relative h-40 w-full shrink-0 overflow-hidden sm:h-44">
        <Image
          src={workout.image}
          alt={workout.name}
          width={500}
          height={300}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">

        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle, index) => (
            <span
              key={`${muscle}-${index}`}
              className="rounded-full bg-lime-400 px-3 py-1 text-[10px] font-bold uppercase text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        <h3 className="text-sm font-extrabold uppercase sm:text-base">
          {workout.name}
        </h3>

   
        <p className="mt-1 text-xs text-gray-400">
          {workout.equipment}
        </p>

        <div className="my-3 border-t border-white/10" />

        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-gray-400">
          <span>◷ {workout.duration} min</span>

          <span>♥ {workout.caloriesBurned} kcal</span>

          <span>☆ {workout.rating}</span>
        </div>

      </div>
    </Link>
  );
};

export default WorkoutCard;