
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { CardData } from "@/components/SingleEvent";
import { doc, getDoc } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyC_s2RB999pEmbGMri7LxYpjwb07P2jYrI",
  authDomain: "blogsite-ba16d.firebaseapp.com",
  projectId: "blogsite-ba16d",
  storageBucket: "blogsite-ba16d.appspot.com",
  messagingSenderId: "632456946669",
  appId: "1:632456946669:web:bb4a8c9b7862531647bde4",
  measurementId: "G-PSJGKVWQFV"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

export const fetchPostDataFromFirestore = async (postId: string): Promise<CardData | null> => {
  try {
    
    const postRef = doc(db, "posts", postId);
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