import Image from "next/image";
import banner from "@/assets/banner.png";

const Banner = () => {
  return (
    <section className="mx-3 my-3 rounded-2xl bg-[#15161d] px-5 py-10 text-white sm:mx-5 sm:my-5 sm:px-8 sm:py-14 md:py-16 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 sm:gap-10 md:flex-row md:gap-6 lg:gap-10">

       
        <div className="w-full text-center md:w-3/5 md:text-left">

          <p className="mb-4 text-[10px] font-bold tracking-[0.25em] text-lime-400 sm:mb-5 sm:tracking-widest">
            WORKOUT LIBRARY
          </p>

          <h1 className="font-[Oswald] text-3xl leading-tight font-extrabold tracking-wide sm:text-4xl md:text-5xl lg:text-6xl">
            TRAIN WITH INTENT. LOG
            <br className="hidden sm:block" />
            EVERY SET.
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-gray-400 md:mx-0">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>

          <a
            href="#library"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-lime-400 px-5 py-3 text-[10px] font-bold text-black transition hover:bg-lime-300"
          >
            BROWSE WORKOUTS
          </a>
        </div>

     
        <div className="flex w-full justify-center md:w-2/5 md:justify-end">
          <Image
            src={banner}
            alt="Athlete doing a workout"
            width={400}
            height={400}
            priority
            className="h-auto w-52 object-contain sm:w-64 md:w-full md:max-w-xs lg:max-w-sm"
          />
        </div>

      </div>
    </section>
  );
};

export default Banner;