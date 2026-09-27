"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";

const Navbar = () => {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      const plan: unknown[] = JSON.parse(
        localStorage.getItem("fitlog-plan") || "[]"
      );

      const saved: unknown[] = JSON.parse(
        localStorage.getItem("fitlog-saved") || "[]"
      );

      setPlanCount(plan.length);
      setSavedCount(saved.length);
    };

    // Initial count
    updateCounts();

    // Same tab update
    window.addEventListener("fitlog-update", updateCounts);

    // Other tab update
    window.addEventListener("storage", updateCounts);

    return () => {
      window.removeEventListener(
        "fitlog-update",
        updateCounts
      );

      window.removeEventListener(
        "storage",
        updateCounts
      );
    };
  }, []);

  const link = (
    <>
      <li>
        <Link
          href="/"
          className="rounded-full bg-lime-400/10 px-4 py-2 text-xs font-semibold text-lime-400"
        >
          Workouts
        </Link>
      </li>

      <li>
        <Link
          href="/my-plan?tab=plan"
          className="rounded-full px-4 py-2 text-xs text-gray-400 hover:text-white"
        >
          My Plan
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 border-b border-white/10 bg-[#0b0c10] px-4 text-white shadow-sm sm:px-6">

      {/* LEFT */}
      <div className="navbar-start">

        {/* MOBILE MENU */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle lg:hidden"
          >
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content z-10 mt-3 w-52 rounded-box border border-white/10 bg-[#15171d] p-2 text-white shadow-xl"
          >
            {link}
          </ul>
        </div>

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Image
            src={logo}
            alt="FITLOG"
            width={32}
            height={32}
            className="object-contain"
          />

          <span className="text-lg font-extrabold tracking-widest">
            FITLOG
          </span>
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal items-center gap-2 px-1 text-sm font-medium">
          {link}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-5">

        {/* PLAN */}
        <Link
          href="/my-plan?tab=plan"
          className="flex items-center gap-2 text-xs text-gray-300 hover:text-white"
        >
          Plan

          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-400 px-1.5 text-[10px] font-bold text-black">
            {planCount}
          </span>
        </Link>

        {/* SAVED */}
        <Link
          href="/my-plan?tab=saved"
          className="flex items-center gap-2 text-xs text-gray-300 hover:text-white"
        >
          Saved

          <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-white/20 px-1.5 text-[10px]">
            {savedCount}
          </span>
        </Link>

      </div>
    </div>
  );
};

export default Navbar;