import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "tailwindcss/tailwind.css";
import app from "@/app/firebase";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth, getAuth } from "firebase/auth"; // Import Auth from 'firebase/auth'

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

interface EventCardProps {
  data: CardData;
}

interface CardData {
  title: string;
  content: string;
  imageSrc: string;
}

interface EventDetailsProps {
  eventId: string;
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventId }) => {
  const [eventDetails, setEventDetails] = useState<CardData[]>([]);
  const [user, loading] = useAuthState(getAuth(app)); 
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      const db = getFirestore(app);
      const usersRef = collection(db, "users");

      const usersSnapshot = await getDocs(usersRef);

      const postsPromises = usersSnapshot.docs.map(async (userDoc) => {
        const userId = userDoc.id;
        const postsRef = collection(db, "users", userId, "posts");
        const postsSnapshot = await getDocs(postsRef);

        if (!postsSnapshot.empty) {
          const userPosts: CardData[] = postsSnapshot.docs.map(
            (postDoc) => postDoc.data() as CardData
          );
          return userPosts;
        }

        return [];
      });

      const allPosts = await Promise.all(postsPromises);
      const flattenedPosts = allPosts.flat();

      if (flattenedPosts.length > 0) {
        console.log("Posts loaded:", flattenedPosts);
        setEventDetails(flattenedPosts);
      } else {
        console.log("No posts found.");
      }

      setLoadingData(false);
    };

    fetchEventDetails();
  }, [eventId, user]);

  if (loading || loadingData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-3 ml-5">
      {eventDetails.map((event, index) => (
        <EventCard key={index} data={event} />
      ))}
    </div>
  );
};

const EventCard: React.FC<EventCardProps> = ({ data }) => {
  return (
    <>
      <Card className="mt-6 p-3 rounded-lg">
        <CardHeader className="relative">
          <Typography
            variant="h5"
            color="blue-gray"
            className="flex p-3 mt-1 mb-2"
          >
            {data.title}
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col items-start">
          <hr className="h-0.5 my-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <p>{data.content}</p>
          <Link href="/continue">
            <Button className="text-black">Read More</Button>
          </Link>
        </CardBody>
      </Card>
    </>
  );
};

export default EventDetails;
