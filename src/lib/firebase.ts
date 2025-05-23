// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjhFRaNrvCvMy8l0Q7C_Ta6wNtvZVYjbc",
  authDomain: "netxjs-firebase.firebaseapp.com",
  projectId: "netxjs-firebase",
  storageBucket: "netxjs-firebase.firebasestorage.app",
  messagingSenderId: "691630586860",
  appId: "1:691630586860:web:8fa43b44ae333945379ec9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };