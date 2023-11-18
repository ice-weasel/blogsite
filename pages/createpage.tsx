import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";
import "tailwindcss/tailwind.css";
import { serverTimestamp } from "firebase/firestore";

import app from "@/app/firebase";
import { useRouter } from "next/router";

interface FormData {
  title: string;
  content: string;
  image: File | null;
}

export default function CreatePage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    image: null,
  });

  const [user, loading] = useAuthState(auth);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const router =useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    updateButtonStatus();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
    updateButtonStatus();
  };
  const updateButtonStatus = () => {
    const { title, content } = formData;
    setIsButtonDisabled(!title || !content || !formData.image);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user) {
      try {
        const db = getFirestore(app);
        const storage = getStorage(app);

        // Upload image to Firebase Storage
        const imageRef = ref(storage, `images/${formData.image?.name}`);
        await uploadBytes(imageRef, formData.image!);

        // Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(imageRef);

        console.log("Image uploaded:", imageUrl);

        const postsCollectionRef = collection(db, "users", user.uid, "posts");

        // Save data, including image URL, to Firestore
        const docRef = await addDoc(postsCollectionRef, {
          title: formData.title,
          content: formData.content,
          imageUrl,
          timestamp: serverTimestamp(),
        });

        console.log("Post created and saved in Firestore");

        // Use the newly created document ID (postId) and user ID to navigate
        router.push(`/[postId]?userId=${user.uid}`, `/${docRef.id}?userId=${user.uid}`);

        // Clear the form data
        setFormData({
          title: "",
          content: "",
          image: null,
        });
      } catch (error) {
        console.error("Error creating post:", error);
      }
    } else {
      console.error("User is not logged in.");
    }
  };
  
  return (
    <main className="min-h-screen flex flex-col">
      <div className="ml-auto">
        {user ? (
          <>
            <span className="text-black gap-4">
              Current logged in user: {user.email}
            </span>
            <button
              type="button"
              onClick={async () => {
                try {
                  await auth.signOut();
                  // Reload the page after logout
                  window.location.href = "/login";
                } catch (error) {
                  console.error("Error logging out", error);
                }
              }}
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Sign out
            </button>
          </>
        ) : (
          <span>Not logged in</span>
        )}
      </div>
      <div className="flex flex-col  ">
        <form
          className="p-14 text-black"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="relative z-0 w-full mb-6 group">
            <input
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-3 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Enter Title "
              required
            />
            <label
              htmlFor="image"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            ></label>
          </div>

          <div className=" mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
              <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                <div className="flex items-center  space-x-1 sm:pr-4">
                <label
                   
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 20"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2ZM6.709 13.809a1 1 0 1 1-1.418 1.409l-2-2.013a1 1 0 0 1 0-1.412l2-2a1 1 0 0 1 1.414 1.414L5.412 12.5l1.297 1.309Zm6-.6-2 2.013a1 1 0 1 1-1.418-1.409l1.3-1.307-1.295-1.295a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1-.001 1.408v.004Z"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"
                      />
                    </svg>
                    <span className="text-black sr-only">Upload image</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
              <label htmlFor="editor" className="sr-only">
                Publish post
              </label>
              <textarea
                id="content"
                name="content"
                rows={8}
                className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                placeholder="Write an article..."
                value={formData.content}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Publish post
          </button>
        </form>
      </div>
    </main>
  );
}
