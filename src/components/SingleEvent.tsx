'use client'
import React, { useState } from "react";
import dynamic from "next/dynamic";

interface AccordionItem {
  heading: string;
  content: string;
  imageSrc: string;
}

const CarouselImage = dynamic(() => import("./Carousel"), {
  loading: () => <p>Loading...</p>,
});


//Add new Data Here
const accordionData: AccordionItem[] = [
  {
    heading: "TechEvent 1",
    content:
      "This is a tech event-1",
    imageSrc: "/img1.jpg",
  },
  {
    heading: "TechEvent 2",
    content:
      "This is a tech event-2",
      imageSrc: "/img2.jpg",
    },
  {
    heading: "TechEvent 3",
    content:
      "This is a tech event-3",
    imageSrc: "/img3.jpg",
    },
];

export default function SingleEvent() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    if (activeAccordion === index) {
      // If the same accordion item is clicked again, close it
      setActiveAccordion(null);
    } else {
      // Otherwise, open the clicked accordion item
      setActiveAccordion(index);
    }
  };

  return (
    <div id="accordion-collapse" data-accordion="collapse">
      {accordionData.map((item, index) => (
        <div key={index}>
          <h2 id={`accordion-collapse-heading-${index}`}>
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              data-accordion-target={`accordion-collapse-body-${index}`}
              aria-expanded={activeAccordion === index}
              aria-controls={`accordion-collapse-body-${index}`}
              onClick={() => handleAccordionClick(index)}
            >
              <span>{item.heading}</span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 rotate-${
                  activeAccordion === index ? "0" : "180"
                } shrink-0`}
                aria-hidden={true}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id={`accordion-collapse-body-${index}`}
            className={`${
              activeAccordion === index ? "" : "hidden"
            } border border-b-0 border-gray-200 dark:border-gray-700`}
            aria-labelledby={`accordion-collapse-heading-${index}`}
          >
            <div className="p-5">
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                {item.content}
              </p>
              <div>
              <CarouselImage imageSrc={item.imageSrc} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
