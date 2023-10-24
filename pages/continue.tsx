import dynamic from "next/dynamic";
import "tailwindcss/tailwind.css";
import { Raleway } from "next/font/google";


interface PageData {
  heading: string;
  body: string;
}

interface ImageData {
  imgSrc: string;
}

const raleway = Raleway({
  subsets: ["latin"],
  weight: "400",
});

const Navbar = dynamic(() => import("@/components/Navbar"), {
  loading: () => <p>Loading...</p>,
});

const Carousel = dynamic(() => import("@/components/Scr_Carousel"), {
  loading: () => <p>Loading Carousel...</p>,
});

const imagedata: ImageData[] = [
  {
    imgSrc: "/img1.jpg",
  },
  {
    imgSrc: "/img2.jpg",
  },
  {
    imgSrc: "/img3.jpg",
  },
];

const pagedata: PageData[] = [
  {
    heading: "Your Heading",
    body: "Your Body Text",
  },
  {
    heading: "Your Heading",
    body: "Your Body Text",
  },
  {
    heading: "Your Heading",
    body: "Your Body Text",
  },
];

export default function Continue() {

  const mainStyle: React.CSSProperties = {
    fontFamily: 'Raleway, sans-serif', // Specify "Raleway" as the font-family
  };
  
  return (
    <main className="bg-white font-raleway" style={mainStyle} >
      <Navbar />
      <div className="flex flex-col  items-center h-screen shadow-xl hover:xl mt-20 ml-4 mr-4 rounded-t-lg bg-slate-100">
        <img
          className="self-center p-8    w-screen h-96 object-contain  "
          src="/img1.jpg"
          alt="Image description"
        />

        <div className="mt-16">
          
<p className="mb-3 text-gray-500 dark:text-gray-400">Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest data from other software development tools, so your IT support and operations teams have richer contextual information to rapidly respond to requests, incidents, and changes.</p>
<p className="text-gray-500 dark:text-gray-400">Deliver great service experiences fast - without the complexity of traditional ITSM solutions.Accelerate critical development work, eliminate toil, and deploy changes with ease, with a complete audit trail for every change.</p>

        </div>
      </div>
    </main>
  );
}
