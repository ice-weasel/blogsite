import React from "react";
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
}

const cardData: CardData[] = [
  {
    heading: "TechEvent 1",
    desc: "This is a tech event-1",
    ImgSrc: "/img1.jpg",
  },
  {
    heading: "TechEvent 2",
    desc: "This is a tech event-2",
    ImgSrc: "/img2.jpg",
  },
  {
    heading: "TechEvent 3",
    desc: "This is a tech event-3",
    ImgSrc: "/img3.jpg",
  },
  {
    heading: "TechEvent 4",
    desc: "This is a tech event-4",
    ImgSrc: "/img3.jpg",
  },
  {
    heading: "TechEvent 5",
    desc: "This is a tech event-5",
    ImgSrc: "/img2.jpg",
  },
  
];

export default function SingleEvent() {
  return (
    <div className="grid grid-cols-2 gap-4 ml-5">
    {cardData.map((event, index) => (
  <EventCard key={index} data={event} />
))}

    </div>
  );
}

function EventCard({ data }: { data: CardData }) {
  return (
    <Card className="mt-6 p-7 rounded-lg shadow-lg hover:shadow-xl">
      <img
        src={data.ImgSrc}
        alt={data.heading}
        style={{ width: "900px", height: "550px" }}
      />
      <CardHeader className="relative">
        <Typography
          variant="h5"
          color="blue-gray"
          className="flex p-2 mt-5 mb-2"
        >
          {data.heading}
        </Typography>
      </CardHeader>
      <CardBody>
        <hr className="h-0.5 my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <p>{data.desc}</p>
        <Button className="text-black">Read More</Button>
      </CardBody>
    </Card>
  );
}

