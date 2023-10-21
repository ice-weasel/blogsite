import Image from "next/image";
import React, { useState } from "react";

interface CarouselImage {
  imageSrc: string;
}

const carouselImg: CarouselImage[] = [
  {
    imageSrc: "/img1.jpg",
  },
  {
    imageSrc: "/img2.jpg",
  },
  {
    imageSrc: "/img3.jpg",
  },
];

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState<number>(2); // Set the active index to 2 or any other starting index

  const prevImage = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? carouselImg.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === carouselImg.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleImageLoad = (index: number) => {
    console.log(`Image ${index} has loaded successfully.`);
  };

  const handleImageError = (index: number) => {
    console.error(`Error loading image ${index}.`);
  };

  return (
    <div
      id="animation-carousel"
      className="relative w-full"
      data-carousel="static"
    >
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {carouselImg.map((item, index) => (
          <div
            key={index}
            className={`hidden duration-200 ease-linear ${
              index === activeIndex ? "" : "hidden"
            }`}
            data-carousel-item={index === activeIndex ? "active" : undefined}
          >
            <Image
              src={item.imageSrc}
              layout="fill"
              objectFit="cover"
              alt={`Carousel Image ${index}`}
              onLoad={() => handleImageLoad(index)}
              onError={() => handleImageError(index)}
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
        onClick={prevImage}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={nextImage}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}
