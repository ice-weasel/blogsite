"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const EventType = dynamic(() => import("../components/Eventbutton"), {
  loading: () => <p>Loading...</p>,
});
const StatusButton = dynamic(() => import("../components/Statusbutton"), {
  loading: () => <p>Loading...</p>,
});
const Navbar = dynamic(() => import("../components/Navbar"), {
  loading: () => <p>Loading...</p>,
});
const SingleEvent = dynamic(() => import("../components/SingleEvent"), {
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <main className="bg-slate-300">
      <Navbar />
      <div className="flex flex-col ml-5 mr-5 justify-center items-center h-32 md:flex-row bg-slate-700 rounded-t-lg justify-start  items-start justify-evenly mt-2 max-w-screen">
        <EventType />
        <StatusButton />
      </div>
      <div className="flex flex-col mt-2 h-screen ml-4 mr-4 rounded-t-lg bg-slate-700">
        <SingleEvent />
      </div>
    </main>
  );
}
