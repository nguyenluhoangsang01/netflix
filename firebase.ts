// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCad41zBQbX8uC09hUafnbYWgU3B9udhx4",
  authDomain: "netflix-556d5.firebaseapp.com",
  projectId: "netflix-556d5",
  storageBucket: "netflix-556d5.appspot.com",
  messagingSenderId: "562400246711",
  appId: "1:562400246711:web:8ab0a85e1daa9ac65d8632",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default app;
export { db, auth };
