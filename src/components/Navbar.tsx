import React, { useState } from "react";
import SearchBar from "./Searchbar";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";
import EventDetails from "./SingleEvent";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  weight: "400",
});



export default function Navbar() {
  const mainStyle: React.CSSProperties = {
    fontFamily: "Raleway, sans-serif",
    color: "black",
  };

  const [searchResults, setSearchResults] = useState<number[]>([]);

  const [searchValue,setSearchValue] = useState("");

  const handleSearch = (value:string) => {
    console.log(value);
    setSearchValue(value);
  }

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  const handleDropdownOpen = () => {
    setDropdownOpen(true);
  };
  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Reload the page after logout
      window.location.reload();
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const [user, loading] = useAuthState(auth);

  return (
    <main className="font-raleway" style={mainStyle}>
      <nav className="items-center flex flex-col md:flex-row bg-gray-900">
        <div className="p-7 justify-start">
          <Link href="/">
            <span className="text-5xl text-white self-start whitespace-nowrap hover:text-blue-400 transition-colors duration-500">
              BlogSite
            </span>
          </Link>
        </div>
        <div className="relative w-full">
        <SearchBar onSearch={handleSearch}/>
         
        </div>
      
        {user ? (
          <>
            <div className="flex p-7">
              <Link
                href="/createpage"
                className="relative  inline-flex mr-5  px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
              >
                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                  Create
                </span>
              </Link>
              <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded={isDropdownOpen}
                  onClick={isDropdownOpen ? handleDropdownClose : handleDropdownOpen}/* Add this line to toggle dropdown */
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/docs/images/people/profile-picture-3.jpg"
                    alt="user photo"
                  ></img>
                </button>
          {isDropdownOpen && (
                <div
                className="absolute top-14 z-24 right-0 mt-7 bg-gray-800 py-2 w-48 bg-white  z-10 rounded-md shadow-lg"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      Bonnie Green
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      {user.email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <Link
                        href="/Home"
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
                )} 
                <button
                  data-collapse-toggle="navbar-user"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-user"
                  aria-expanded={isDropdownOpen}
                  onClick={isDropdownOpen ? handleDropdownClose : handleDropdownOpen}
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="relative  inline-flex mr-5  px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
            >
              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                Create
              </span>
            </Link>
          </>
        )}
      </nav>
    </main>
  );
}

