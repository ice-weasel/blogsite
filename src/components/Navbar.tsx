import { Raleway } from "next/font/google";
import SearchBar from "./Searchbar";

const raleway = Raleway({
  subsets: ["latin"],
  weight: "400",
});

export default function Navbar() {
  const mainStyle: React.CSSProperties = {
    fontFamily: 'Raleway, sans-serif',
    color: "black", // Set the font color to the provided hashtag color
  };

  return (
    <main className="font-raleway" style={mainStyle}>
      <nav className="flex justify-center items-center  border-blue-900 dark:bg-white">
        <div className=" flex-rows  p-4">
          <span className=" text-5xl  whitespace-nowrap">
          BlogSite
          </span>
        </div>
        <SearchBar/>
      </nav>
    </main>
  );
}
