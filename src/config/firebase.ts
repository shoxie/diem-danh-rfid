import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDP5tEO9Ekot2PAkm45UshfRwIEXGL7-vI",
  authDomain: "garden-39e7b.firebaseapp.com",
  databaseURL:
    "https://garden-39e7b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "garden-39e7b",
  storageBucket: "garden-39e7b.appspot.com",
  messagingSenderId: "380042676551",
  appId: "1:380042676551:web:ce6109fdf2dbb8fc8aa462",
  measurementId: "G-20D023CC34",
};

// Initialize Firebase
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
