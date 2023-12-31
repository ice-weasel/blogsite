"use client";
import React, { useState } from "react";
import { Inter, Raleway, Roboto, Roboto_Serif } from "next/font/google";
import EventType from "../src/components/Eventbutton";
import StatusButton from "../src/components/Statusbutton";
import Navbar from "../src/components/Navbar";
import SingleEvent from "../src/components/SingleEvent";
import "tailwindcss/tailwind.css";

import EventDetails from "../src/components/SingleEvent";

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: "400",
});




export default function HomePage() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const mainStyle: React.CSSProperties = {
    fontFamily: "Raleway, sans-serif", // Specify "Raleway" as the font-family
  };

  return (
    
    <main className="bg-white font-raleway relative" style={mainStyle}>
      <Navbar />
      
      <div className="flex  flex-col drop-shadow-lg  h-48 md:flex-col bg-slate-200 rounded-t-lg justify-evenly z-10 mt-2 max-w-screen">
        <span className="text-3xl self-center  text-black">
          These are the Recent Events
        </span>
      
      </div>
      <div className="flex flex-rows shadow:3xl  h-screen  items-start  justify-evenly mt-24 ml-4 mr-4 rounded-t-lg bg-slate-100">
        <div
          style={{
            maxHeight: "80vh",
            overflowY: "auto",
            width: "100%",
            overflowX: "hidden",
          }}
        >
          <EventDetails eventId={""} />
        </div>
      </div>
    </main>
  );
}
