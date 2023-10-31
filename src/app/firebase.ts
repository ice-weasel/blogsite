
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


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
const auth = getAuth(app);

export default app;