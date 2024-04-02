import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDODAwMYqs9nQwzAO9sen4-sqPrUAU8koo",
  authDomain: "vtye-2a8b3.firebaseapp.com",
  projectId: "vtye-2a8b3",
  storageBucket: "vtye-2a8b3.appspot.com",
  messagingSenderId: "957769577426",
  appId: "1:957769577426:web:5a39c7d48a178555940e0b",
  measurementId: "G-RF4X8L9N6B"
};

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  export {db, storage};