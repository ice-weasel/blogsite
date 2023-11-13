import { Raleway } from "next/font/google";
import SearchBar from "./Searchbar";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";

const raleway = Raleway({
  subsets: ["latin"],
  weight: "400",
});

export default function Navbar() {
  const mainStyle: React.CSSProperties = {
    fontFamily: "Raleway, sans-serif",
    color: "black",
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
      <nav className="items-center flex flex-col md:flex-row  border-blue-900 dark:bg-white">
        <div className="p-7 justify-start">
          <Link href="/">
            <span className="text-5xl self-start whitespace-nowrap hover:text-red-500 transition-colors duration-500">
              BlogSite
            </span>
          </Link>
        </div>
        <div className="flex-grow ">
          <SearchBar
            content={[]}
            onSearchResults={function (results: number[]): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        {user ? (
          <>
            <span className="p-7 justify-evenly">{user.email}</span>
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
            <Link
              href="/Home"
              className="relative  inline-flex mr-5  px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
            >
              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
              <button
                onClick={handleLogout}
                className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
              >
                Logout
              </button>
            </Link>
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
                Login
              </span>
            </Link>
          </>
        )}
      </nav>
    </main>
  );
}
