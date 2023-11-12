import React, { useState, useEffect } from "react";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";
import { addDoc, updateDoc } from "firebase/firestore";
import "tailwindcss/tailwind.css";

import app from "@/app/firebase";

export default function CreatePage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageSrc: "",
  });

  const [user, loading] = useAuthState(auth);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
//updates form values
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
  //only works if fields are filled
  const updateButtonStatus = () => {
    const { title, content } = formData;
    setIsButtonDisabled(!title || !content);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user) {
      try {
        const db = getFirestore(app);

        const postsCollectionRef = collection(db, "users", user.uid, "posts");

        // Get a reference to the document using doc
        const docRef = doc(postsCollectionRef, formData.title);

        // Check if the document already exists
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          // If the document exists, update it (merge)
          await updateDoc(docRef, formData);
          console.log("Post updated in Firestore");
          window.location.href="/continue"
        } else {
          // If the document doesn't exist, create it
          await addDoc(postsCollectionRef, formData);
          console.log("Post created and saved in Firestore");
          window.location.href="/continue"
        }

        setFormData({
          title: "",
          content: "",
          imageSrc: "",
        });
      } catch (error) {
        console.error("Error creating/updating post:", error);
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
              onClick={() => {
                window.location.href = "/Home";
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
              htmlFor="title"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            ></label>
          </div>

          <div className=" mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
              <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                <div className="flex items-center  space-x-1 sm:pr-4">
                  <button
                    type="button"
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 12 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linejoin="round"
                        strokeWidth="2"
                        d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                      />
                    </svg>
                    <span className="sr-only">Attach file</span>
                  </button>

                  <button
                    type="button"
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 20"
                    >
                      <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                    </svg>
                    <span className="sr-only">Upload image</span>
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 20"
                    >
                      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                      <path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2ZM6.709 13.809a1 1 0 1 1-1.418 1.409l-2-2.013a1 1 0 0 1 0-1.412l2-2a1 1 0 0 1 1.414 1.414L5.412 12.5l1.297 1.309Zm6-.6-2 2.013a1 1 0 1 1-1.418-1.409l1.3-1.307-1.295-1.295a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1-.001 1.408v.004Z" />
                    </svg>
                    <span className="sr-only">Format code</span>
                  </button>
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
