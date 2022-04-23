// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcNBOhNFp4KcadehJP7rflGWPD7dAXLhY",
  authDomain: "eskri-e31a7.firebaseapp.com",
  projectId: "eskri-e31a7",
  storageBucket: "eskri-e31a7.appspot.com",
  messagingSenderId: "31315296106",
  appId: "1:31315296106:web:ce88f808917b6e2fd9ef13",
  measurementId: "G-CF342C4RKQ"
};

// Initialize Firebase

const app = !getApps().length? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(); //pass the app if didn't work
const storage = getStorage();

export {app,db,storage};