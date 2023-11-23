import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "@/app/firebase";
import dynamic from "next/dynamic";
import Image from "next/image";

import "tailwindcss/tailwind.css";

interface CardData {
  userId: string;
  postId: any;
  title: string;
  content: string;
  imageUrl: string | null; // Change the type to string
}

const Navbar = dynamic(() => import("@/components/Navbar"), {
  loading: () => <p>Loading...</p>,
});

const fetchPostDataFromFirestore = async (
  postId: string,
  userId: string
): Promise<CardData | null> => {
  try {
    const db = getFirestore(app);
    const postRef = doc(db, `users/${userId}/posts/${postId}`);
    const postSnapshot = await getDoc(postRef);

    if (postSnapshot.exists()) {
      const fetchedPostData = postSnapshot.data() as CardData;
      return fetchedPostData;
    } else {
      console.log("Post not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching post data:", error);
    return null;
  }
};

const Post: FC = () => {
  const router = useRouter();
  const { postId, userId } = router.query;
  const [postDetails, setPostDetails] = useState<CardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (postId === undefined) {
          console.error("Post ID not provided in router query:", router.query);
          // Redirect to home or another page
          return;
        }

        if (userId === undefined) {
          console.error("User ID not provided in router query:", router.query);
          // Redirect to home or another page
          return;
        }

        const fetchedPostData = await fetchPostDataFromFirestore(
          postId as string,
          userId as string
        );
        if (fetchedPostData) {
          setPostDetails(fetchedPostData);
        } else {
          console.log("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchData();
  }, [postId, userId, router.query]);

  if (!postDetails) {
    return <p>Loading...</p>;
  }

  return (
    <main className="bg-white font-raleway">
      <Navbar />
      <div className="items-center h-screen shadow-xl hover:xl mt-20 ml-4 mr-4 rounded-t-lg bg-slate-100">
        <div className="flex flex-col mt-16">
          {/* Use the src and alt props for the Image component */}
          <Image
            src={postDetails?.imageUrl || "/next.svg"} // Replace "/next.svg" with your default image or a placeholder
            alt="Post Image"
            width={600}
            height={400}
            className="max-w-full h-auto"
          />

          <h1 className="text-3xl font-bold">{postDetails?.title}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            {postDetails?.content}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Post;
