// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRaMQzAQBBfhDwRpMCzQIDmKf_o17G8OM",
  authDomain: "interview-25dbb.firebaseapp.com",
  projectId: "interview-25dbb",
  storageBucket: "interview-25dbb.appspot.com",
  messagingSenderId: "694539158702",
  appId: "1:694539158702:web:4204eb9f3b7fe688bcd93f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();