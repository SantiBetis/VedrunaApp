// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCn3Jp9hZMc_dLZlIuZsGjBzRw6nEaKeAk",
  authDomain: "vedruna-app.firebaseapp.com",
  projectId: "vedruna-app",
  storageBucket: "vedruna-app.firebasestorage.app",
  messagingSenderId: "101330620401",
  appId: "1:101330620401:web:59b7a2805e26e44d96be50",
  measurementId: "G-G2WJE32MYX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get the Firebase Authentication instance
export { app, auth };