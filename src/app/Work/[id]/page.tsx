
import WorkoutActions from "@/components/WorkoutActions";
import { IWorkout } from "@/types/type";
import Image from "next/image";
import { notFound } from "next/navigation";


interface IWorkoutDetailsPage {
  params: Promise<{
    id: string;
  }>;
}

const getWorkouts = async (): Promise<IWorkout[]> => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/fitlog"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const result = await res.json();

  return Array.isArray(result) ? result : result.data;
};

const WorkoutDetailsPage = async ({
  params,
}: IWorkoutDetailsPage) => {
  const { id } = await params;
  const workoutData = await getWorkouts();

  const workout = workoutData.find(
    (workout) => String(workout.id) === String(id)
  );

  if (!workout) {
    notFound();
  }

  return (
    <section className="min-h-screen bg-[#0e0f14] text-white">
      <div className="container mx-auto px-4 py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-11 items-start">

          
          <div className="relative w-full h-[420px] sm:h-[520px] lg:h-[570px] overflow-hidden rounded-xl border border-[#292c36] bg-[#171923]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
         
          <div className="w-full">
          
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wide leading-tight">
              {workout.name}
            </h1>

           
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-gray-400">
              {workout.description}
            </p>

          
            <div className="flex flex-wrap gap-2 mt-4">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-lime-400 px-3 py-1 text-xs font-medium text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

          
            <div className="mt-5 overflow-hidden rounded-xl border border-[#292c36] bg-[#171923]">
              {[
                ["EQUIPMENT", workout.equipment],
                ["DIFFICULTY", workout.difficulty],
                ["SETS", String(workout.sets)],
                ["REPS", workout.reps],
                ["DURATION", `${workout.duration} min`],
                ["CALORIES", `${workout.caloriesBurned} kcal`],
                ["RATING", String(workout.rating)],
              ].map(([label, value], index, arr) => (
                <div
                  key={label}
                  className={`flex items-center justify-between gap-4 px-5 py-3 ${
                    index !== arr.length - 1
                      ? "border-b border-[#292c36]"
                      : ""
                  }`}
                >
                  <span className="text-[11px] font-bold tracking-wider text-gray-400">
                    {label}
                  </span>
                  <span className="text-sm text-gray-200 text-right">
                    {value}
                  </span>
                </div>
              ))}
            </div>

           
            <div className="mt-6">
              <h2 className="mb-3 text-sm font-extrabold tracking-wider">
                INSTRUCTIONS
              </h2>

              <ol className="list-decimal list-inside space-y-2 text-sm leading-relaxed text-gray-400">
                {workout.instructions.map((step, index) => (
                  <li key={index} className="pl-0.5">
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-7">
              <WorkoutActions workout={workout} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkoutDetailsPage;