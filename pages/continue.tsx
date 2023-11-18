import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import app from "@/app/firebase";
import { fetchPostDataFromFirestore } from "@/app/firebase";

const Navbar = dynamic(() => import("@/components/Navbar"), {
  loading: () => <p>Loading...</p>,
});

interface CardData {
  postId: any;
  title: string;
  content: string;
  imageSrc: string;
}

interface PostData extends CardData {
  userId: string;
}

const Continue: React.FC = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [postData, setPostData] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const [user, userLoading] = useAuthState(auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (postId && user) {
          setLoading(true);
          const fetchedPostData = await fetchPostDataFromFirestore(
            postId as string
          );
          if (fetchedPostData) {
            setPostData(fetchedPostData);
          } else {
            throw new Error("Post not found");
          }
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId, user]);

  if (loading || userLoading) {
    return <p>Loading...</p>;
  }

  if (!postData) {
    return <p>Error loading post data.</p>;
  }

  return (
    <main className="bg-white font-raleway">
      <Navbar />
      <div className="items-center h-screen shadow-xl hover:xl mt-20 ml-4 mr-4 rounded-t-lg bg-slate-100">
        <div className="mt-16">
          <h1 className="text-3xl font-bold">{postData.title}</h1>
          <p className="text-gray-500 dark:text-gray-400">{postData.content}</p>
        </div>
      </div>
    </main>
  );
};

export default Continue;
