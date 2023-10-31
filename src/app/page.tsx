"use client"
import React, { useEffect } from "react";
import { Inter, Raleway } from "next/font/google";
import Router from "next/router";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: "400",
});

export default function LandingPage() {
  useEffect(() => {
    // Wrap long text with a class name for styling
    const textElements = document.querySelectorAll(".break-text");
    textElements.forEach((el) => {
      const text = el.textContent || "";
      if (text.length > 100) {
        el.innerHTML = text.substring(0, 100) + "<br>" + text.substring(100);
      }
    });
  }, []);

  return (
    <main className="bg-white overflow-hidden">
      <div className="flex flex-col items-center justify-center min-h-screen text-center md:text-left p-4 md:ml-24">
        <span className="text-black text-4xl sm:text-5xl md:text-7xl font-semibold">
          BlogSite
        </span>
        <h1 className="text-black dark:text-black text-2xl sm:text-3xl md:text-5xl font-extrabold mt-4 mb-2">
          Here to explore whats happening in your computer space?
        </h1>

        <p className="text-lg font-normal text-gray-700 dark:text-gray-400 mb-6 break-text">
          Here to explore whats happening in your computer space?
        </p>
        <svg className="animate-bounce w-6 h-6 ..."></svg>
      </div>

      <section className="bg-center min-h-screen bg-no-repeat bg-[url('https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-gray-700 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Explore whats happening around you
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Create your own blog to advertise your tech event for free or
            explore events around you
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Link
              href="/Home"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus-ring-4 focus-ring-blue-300 dark-focus-ring-blue-900"
            >
              Explore
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
            <a
              href="Signup"
              className="inline-flex justify-center hover-text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover-bg-gray-100 focus-ring-4 focus-ring-gray-400"
            >
              Create
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
