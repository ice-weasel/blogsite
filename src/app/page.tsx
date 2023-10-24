'use client'
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Inter, Raleway, Roboto, Roboto_Serif } from "next/font/google";
import EventType from "../components/Eventbutton";
import StatusButton from "../components/Statusbutton";
import Navbar from "../components/Navbar";
import SingleEvent from "../components/SingleEvent";

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const mainStyle: React.CSSProperties = {
    fontFamily: 'Raleway, sans-serif', // Specify "Raleway" as the font-family
  };

  return (
    <main className="bg-white font-raleway" style={mainStyle}>
      <Navbar />
      <div className="flex flex-col drop-shadow-lg  h-64 md:flex-col bg-slate-200 rounded-t-lg justify-evenly  mt-2 max-w-screen">
      <span className="text-3xl self-center  text-black">Recent Articles</span>
      <div className="flex flex-rows p-5 py-5 justify-evenly ">
        <EventType />
        <StatusButton />
        </div>  
      </div>
      <div className="flex flex-rows justify-center items-center justify-evenly mt-32 ml-4 mr-4 rounded-t-lg bg-slate-100">
        <div style={{ maxHeight: "80vh", overflowY: "auto", width: "100%", overflowX: "hidden" }}>
          <SingleEvent />
        </div>
      </div>
    </main>
  );
}
