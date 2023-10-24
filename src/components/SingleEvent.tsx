import React, { useState } from "react";
import EventButton from "./Eventbutton"; // Import the EventButton component
import Router from "next/router";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

interface CardData {
  heading: string;
  desc: string;
  ImgSrc: string;
  tags: string;
}

const cardData: CardData[] = [
  {
    heading: "TechEvent 1",
    desc: "This is a tech event-1",
    ImgSrc: "/img1.jpg",
    tags: "Hackathons",
  },
  {
    heading: "TechEvent 2",
    desc: "This is a tech event-2",
    ImgSrc: "/img2.jpg",
    tags: "Talk-Shows",
  },
  {
    heading: "TechEvent 3",
    desc: "This is a tech event-3",
    ImgSrc: "/img3.jpg",
    tags: "Hackathons",
  },
  {
    heading: "TechEvent 4",
    desc: "This is a tech event-4",
    ImgSrc: "/img3.jpg",
    tags: "Talk-Shows",
  },
  {
    heading: "TechEvent 5",
    desc: "This is a tech event-5",
    ImgSrc: "/img2.jpg",
    tags: "Talk-Shows",
  },
  {
    heading: "TechEvent 6",
    desc: "This is a tech event-6",
    ImgSrc: "/img1.jpg",
    tags: "Hackathon",
  },
];

const SingleEvent: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter the event cards based on the selected tag
  const filteredCards = selectedTag
    ? cardData.filter((event) => event.tags === selectedTag)
    : cardData;

  return (
    <div className="grid grid-cols-3 gap-3 ml-5">
     
      {filteredCards.map((event, index) => (
        <EventCard key={index} data={event} />
      ))}
    </div>
  );
};

interface EventCardProps {
  data: CardData;
}

const EventCard: React.FC<EventCardProps> = ({ data }) => {
  return (
    <Card className="mt-6 p-3 rounded-lg ">
      <img
        src={data.ImgSrc}
        alt={data.heading}
        style={{ width: "900px", height: "400px" }}
      />
      <CardHeader className="relative">
        <Typography
          variant="h5"
          color="blue-gray"
          className="flex p-3 mt-1 mb-2"
        >
          {data.heading}
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col items-start">
        <hr className="h-0.5 my-1  bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <p>{data.desc}</p>
        <Link  href="/continue">
        <Button className="text-black">Read More</Button>
        </Link>
      </CardBody>
    </Card>
  );
};

export default SingleEvent;