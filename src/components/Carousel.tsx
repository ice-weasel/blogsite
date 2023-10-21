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
    setActiveIndex((prevIndex) => (prevIndex === 0 ? carouselImg.length - 1 : prevIndex - 1));
  };

  const nextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex === carouselImg.length - 1 ? 0 : prevIndex + 1));
  };

  const handleImageLoad = (index: number) => {
    console.log(`Image ${index} has loaded successfully.`);
  };

  const handleImageError = (index: number) => {
    console.error(`Error loading image ${index}.`);
  };

  return (
    <div id="animation-carousel" className="relative w-full" data-carousel="static">
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
        {/* Previous button code here */}
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={nextImage}
      >
        {/* Next button code here */}
      </button>
    </div>
  );
}
