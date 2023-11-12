import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, AuthError } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth/cordova";
import "tailwindcss/tailwind.css";

import Link from "next/link";
import app from '@/app/firebase'

// Your Firebase configuration

// Initialize Firebase

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("handleLogin function called");

    const { email, password } = formData;

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
      window.location.href = "/createpage";
    } catch (error) {
      if (error instanceof FirebaseError) {
        // The error variable is now of type FirebaseError
        console.log(error);
      }
    }
  };

  return (
    <div className="h-screen bg-white md:h-screen md:bg-white">
      <nav className="bg-white fixed w-full z-20 top-0 left-0">
        {/* Your navigation bar code */}
      </nav>

      <div className="flex mb-5 px-6 mt-10">
        <div className="flex flex-col justify-center px-6 py-5 mx-auto mt-20">
          <h1 className="flex items-center mb-6 text-2xl text-center justify-center font-semibold text-gray-900 dark:text-black">
            Log in to BlogSite
          </h1>

          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex justify-center align-middle flex-col">
            <div className="relative h-11 w-full min-w-[200px] text-slate-500">
              <input
                name="email"
                type="email"
                placeholder="name@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="peer h-full w-full border-b bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-grey outline outline-0 transition-all focus:border-black focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
              <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 text-sx font-bold  flex h-full w-full select-none text-sm font-normal leading-tight  transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-black after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-black peer-focus:after:scale-x-100 black-focus:after:border-black peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-slate-500">
                Email
              </label>
            </div>

            <div className="relative h-11 w-full min-w-[200px] text-slate-500">
              <input
                name="password"
                type="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
                className="h-full w-full border-b bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-grey outline outline-0 transition-all focus:border-black focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
              <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 text-sx font-bold flex h-full w-full select-none text-sm font-normal leading-tight  transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-black after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-black peer-focus:after:scale-x-100 black-focus:after:border-black peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-slate-500">
                Password
              </label>
            </div>

            <button
              onClick={handleLogin}
              type="submit"
              className="flex w-full justify-center bg-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Log in
            </button>

            {error && <p className="text-red-500">{error}</p>}

            <p className="text-sm font-light text-black dark:text-black">
              Dont have an account yet?{" "}
              <Link
                href="/Signup"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </Link>
            </p>
            <a
              href="#"
              className="font-medium text-primary-600 mx-auto text-black hover:underline dark:text-primary-500"
            >
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
