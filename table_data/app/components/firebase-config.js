import { initializeApp } from "firebase/app";
import { getDatabase , } from "firebase/database";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBT4l37paGl9mKj-hhtaK-GbP6Fnu8BnhQ",
  authDomain: "next-firebase-c5083.firebaseapp.com",
  databaseURl: "https://next-firebase-c5083-default-rtdb.firebaseio.com/",

  projectId: "next-firebase-c5083",
  storageBucket: "next-firebase-c5083.appspot.com",
  messagingSenderId: "249295988091",
  appId: "1:249295988091:web:3de417db3f6532f9e8c9de",
};

// Initialize Firebase
export const firebaseapp = initializeApp(firebaseConfig);
export const database = getDatabase(firebaseapp);
export const firestore=getFirestore(firebaseapp);