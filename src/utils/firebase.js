// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqFnAdMXxbyYJtthuZauO0c57npyG2CdM",
  authDomain: "mypathfinder-a1f1d.firebaseapp.com",
  projectId: "mypathfinder-a1f1d",
  // ...other config from Firebase console
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
