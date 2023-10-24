import { Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  weight: "400",
});

export default function Navbar() {
  const mainStyle: React.CSSProperties = {
    fontFamily: 'Raleway, sans-serif',
    color: "#C7A890", // Set the font color to the provided hashtag color
  };

  return (
    <main className="font-raleway" style={mainStyle}>
      <nav className="flex justify-center items-center text-center border-blue-900 dark:bg-white">
        <div className="flex items-center p-4">
          <span className="text-center text-4xl font-semibold whitespace-nowrap">
            Blog Site
          </span>
        </div>
      </nav>
    </main>
  );
}
