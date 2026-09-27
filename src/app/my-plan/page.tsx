"use client";

import MyPlan from "@/components/plan+save/plan";
import Save from "@/components/plan+save/save";
import { useState } from "react";

const MyPlanPage = () => {
  const [activeTab, setActiveTab] = useState<
    "plan" | "save"
  >("plan");

  return (
    <main className="min-h-screen bg-[#0b0c10] px-3 py-7 text-white sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">


        <div className="mb-6 sm:mb-8">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-lime-400 sm:text-xs sm:tracking-[0.3em]">
            FITLOG
          </p>

          <h1 className="text-3xl font-black uppercase sm:text-4xl md:text-5xl">
            My Plan
          </h1>

          <p className="mt-2 max-w-xl text-xs leading-relaxed text-gray-400 sm:text-sm">
            Manage your workout plan and saved exercises.
          </p>
        </div>

        <div className="mb-6 flex gap-1 border-b border-white/10 sm:mb-8 sm:gap-2">

          <button
            onClick={() => setActiveTab("plan")}
            className={`px-4 py-3 text-xs font-black uppercase transition sm:px-6 sm:text-sm ${
              activeTab === "plan"
                ? "border-b-2 border-lime-400 text-lime-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Plan
          </button>

          

          <button
            onClick={() => setActiveTab("save")}
            className={`px-4 py-3 text-xs font-black uppercase transition sm:px-6 sm:text-sm ${
              activeTab === "save"
                ? "border-b-2 border-lime-400 text-lime-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Saved
          </button>

        </div>

        

        {activeTab === "plan" && <MyPlan />}

      

        {activeTab === "save" && <Save />}

      </div>
    </main>
  );
};

export default MyPlanPage;