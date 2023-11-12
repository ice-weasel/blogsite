"use client";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";


import app from "@/app/firebase";
import { getStorage } from "firebase/storage";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    phonenumber: "",
    address: "",
    country: "",
    gender: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Update the button's disa bled state
    updateButtonStatus(); // Call the function to update button status
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const auth = getAuth(app);
    const { email, password, name, age, gender, phonenumber, address, country } = formData;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const db = getFirestore(app);
      const userDocRef = doc(db, "users", user.uid);
      const userData = {
        name,
        age,
        phonenumber,
        address,
        country,
        gender,
      };

      await setDoc(userDocRef, userData);

      console.log("User created and data stored in Firestore");
      window.location.href="/createpage"
     
    } catch (error: any) {
      console.log("Error Creating user:",error.code,error.message); 
    }
  };

  // Function to enable or disable the button
  const updateButtonStatus = () => {
    const { email, password } = formData;
    setIsButtonDisabled(!email || !password);
  };

  return (
    <div className="flex flex-col bg-auto bg-white px-6 py-7">
      <nav className="relative flex w-full flex-wrap items-center justify-between bg-white">
        <Link
          href={{ pathname: "/" }}
          className="inline-flex items-center justify-center w-full px-4 py-3 mb-2 text-lg text-black bg-white rounded-md hover:bg-white sm:w-auto sm:mb-0"
          data-primary="green-400"
          data-rounded="rounded-2xl"
          data-primary-reset="{}"
        >
        <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth="1.5" 
  stroke="currentColor"
  className="w-6 h-6"
>
  <path
    strokeLinecap="round" 
    strokeLinejoin="round"
    d="M15.75 19.5L8.25 12l7.5-7.5"
  />
</svg>
          BACK
        </Link>
      </nav>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 py-4">
          Sign Up
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSignup}
        >
          <div>
            <div className="relative h-11 w-full min-w-[200px] text-slate-500">
              <input
                placeholder="Name"
                name="name" // Add the 'name' attribute
                value={formData.name}
                onChange={onChange}
                className="peer h-full w-full border-b bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-grey outline outline-0 transition-all focus:border-black focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />

              <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 text-xs font-bold flex h-full w-full select-none text-xs font-normal leading-tight  transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-black after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:after:scale-x-100 black-focus:after:border-black peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-slate-500">
                NAME
              </label>
            </div>
          </div>

          <div className="relative h-11 w-full min-w-[200px] text-slate-500">
            <input
              placeholder="Age"
              name="age"
              value={formData.age}
              onChange={onChange}
              className="peer h-full w-full border-b bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-grey outline outline-0 transition-all  focus:border-black focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 text-xs font-bold flex h-full w-full select-none text-xs font-normal leading-tight  transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-black after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:after:scale-x-100 black-focus:after:border-black peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-slate-500">
              AGE
            </label>
          </div>

          <div className="relative h-11 w-full min-w-[200px] text-slate-500">
            <input
              placeholder="Gender"
              name="gender"
              onChange={onChange}
              value={formData.gender}
              
              className="peer h-full w-full border-b bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-grey outline outline-0 transition-all  focus:border-black focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 text-xs font-bold flex h-full w-full select-none text-xs font-normal leading-tight  transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-black after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:after:scale-x-100 black-focus:after:border-black peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-slate-500">
              GENDER
            </label>
          </div>

          <div className="relative h-11 w-full min-w-[200px] text-slate-500">
            <input
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={onChange}
              className="peer h-full w-full border-b bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-grey outline outline-0 transition-all  focus:border-black focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 text-xs font-bold flex h-full w-full select-none text-xs font-normal leading-tight  transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-black after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:after:scale-x-100 black-focus:after:border-black peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-slate-500">
              ADDRESS
            </label>
          </div>

          <div className="relative h-11 w-full min-w-[200px] text-slate-500">
            <input
              placeholder="Country/Region"
              name="country"
              value={formData.country}
              onChange={onChange}
              className="peer h-full w-full border-b bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-grey outline outline-0 transition-all  focus:border-black focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 text-xs font-bold flex h-full w-full select-none text-xs font-normal leading-tight  transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-black after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:after:scale-x-100 black-focus:after:border-black peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-slate-500">
              COUNTRY/REGION
            </label>
          </div>

          <div className="relative h-11 w-full min-w-[200px] text-slate-500">
            <input
              placeholder="Phone Number"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={onChange}
              className="peer h-full w-full border-b bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-grey outline outline-0 transition-all  focus:border-black focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 text-xs font-bold flex h-full w-full select-none text-xs font-normal leading-tight  transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-black after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:after:scale-x-100 black-focus:after:border-black peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-slate-500">
              PHONE NUMBER
            </label>
          </div>

        
          <div className="relative h-11 w-full min-w-[200px] text-slate-500">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="peer h-full w-full border-b bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-grey outline outline-0 transition-all focus:border-black focus:outline-0 disabled:border-0 disabled-bg-blue-gray-50"
            />
            <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 text-xs font-bold flex h-full w-full select-none text-xs font-normal leading-tight transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-black after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:after:scale-x-100 black-focus:after:border-black peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-slate-500">
              EMAIL
            </label>
          </div>

          <div className="relative h-11 w-full min-w-[200px] text-slate-500">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={onChange}
              className="peer h-full w-full border-b bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-grey outline outline-0 transition-all focus:border-black focus:outline-0 disabled:border-0 disabled-bg-blue-gray-50"
            />
            <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 text-xs font-bold flex h-full w-full select-none text-xs font-normal leading-tight transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-black after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:after:scale-x-100 black-focus:after:border-black peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-slate-500">
              PASSWORD
            </label>
          </div>

          <div>
            <button
              type="submit"
             
              className={`flex w-full justify-center bg-gray-300 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover-bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
                isButtonDisabled ? "pointer-events-none" : ""
              }`}
              disabled={isButtonDisabled}
             
            >
              CONFIRM
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?
          <Link
            href="/login"
            className="font-semibold text-xs leading-6 text-black hover:text-black"
          >
            {" "}
            LOG IN
          </Link>
        </p>
      </div>
    </div>
  );
}
