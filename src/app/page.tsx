"use client"
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import EventType from "../components/Eventbutton";
import StatusButton from "../components/Statusbutton";
import Navbar from "../components/Navbar";
import SingleEvent from "../components/SingleEvent";

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <main className="bg-white">
      <Navbar />
      <div className="flex flex-col drop-shadow-lg   items-center h-32 md:flex-row bg-slate-200 rounded-t-lg justify-evenly mt-2 max-w-screen">
        <EventType />
        <StatusButton />
      </div>
      <div className="flex flex-rows justify-center items-center justify-evenly mt-20 ml-4 mr-4 rounded-t-lg bg-slate-100">
        <div style={{ maxHeight: "80vh", overflowY: "auto", width: "100%", overflowX: "hidden" }}>
          <SingleEvent />
        </div>
      </div>
    </main>
  );
}
