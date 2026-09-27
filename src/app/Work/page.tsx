import Banner from "@/components/shared/Home/Banner";
import WorkoutCard from "@/components/shared/WorkoutsCard";
import { IWorkout } from "@/types/type";

const getWorkoutsPage = async (): Promise<IWorkout[]> => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/fitlog"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const data = await res.json();
  return Array.isArray(data) ? data : data.data;
};

const WorkoutsPage = async () => {
  const workouts = await getWorkoutsPage();

  return (
    <div>
      <Banner />

      <main className="min-h-screen bg-[#0b0c10] px-3 py-8 text-white sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <h2 className="text-xl font-extrabold sm:text-2xl">
              THE LIBRARY
            </h2>

            <p className="mt-1 text-xs text-gray-400 sm:text-sm">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 ">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkoutsPage;