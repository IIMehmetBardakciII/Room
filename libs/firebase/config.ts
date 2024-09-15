// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8-s8pt1N-IF8_TungM4hfXOFhyVGGKew",
  authDomain: "room-8facb.firebaseapp.com",
  projectId: "room-8facb",
  storageBucket: "room-8facb.appspot.com",
  messagingSenderId: "313741991223",
  appId: "1:313741991223:web:4dfdb6b5f7b52197ab8eb2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export { db, storage, auth };
