// pages/[postId].tsx
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '@/app/firebase';

interface CardData {
  userId: string;
  postId: any;
  title: string;
  content: string;
  imageSrc: string;
}

const fetchPostDataFromFirestore = async (postId: string, userId: string): Promise<CardData | null> => {
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
          console.error('Post ID not provided in router query:', router.query);
          // Redirect to home or another page
          return;
        }

        if (userId === undefined) {
          console.error('User ID not provided in router query:', router.query);
          // Redirect to home or another page
          return;
        }

        const fetchedPostData = await fetchPostDataFromFirestore(postId as string, userId as string);
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
    <div>
      <h1>{postDetails.title}</h1>
      <p>{postDetails.content}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default Post;
