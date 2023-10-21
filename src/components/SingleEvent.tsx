'use client'
import React, { useState } from "react";
import dynamic from "next/dynamic";

interface AccordionItem {
  heading: string;
  content: string;
  imageSrc: string;
}

const Carousel = dynamic(() => import("./Carousel"), {
  loading: () => <p>Loading...</p>,
});


//Add new Data Here
const accordionData: AccordionItem[] = [
  {
    heading: "What is Flowbite?",
    content:
      "Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.",
    imageSrc: "url_to_image_1",
  },
  {
    heading: "Is there a Figma file available?",
    content:
      "Flowbite is first conceptualized and designed using the Figma software, so everything you see in the library has a design equivalent in our Figma file.",
      imageSrc: "",
    },
  {
    heading: "What are the differences between Flowbite and Tailwind UI?",
    content:
      "The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.",
    imageSrc: "",
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
                <Carousel/>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
