import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCHNmfEly-G3H2F2MtY6MtkZGG76LVPDJg",
  authDomain: "iconic-places.firebaseapp.com",
  projectId: "iconic-places",
  storageBucket: "iconic-places.appspot.com",
  messagingSenderId: "505441256285",
  appId: "1:505441256285:web:a5f9875dd7f67f4ab5deb4",
  measurementId: "G-6ZG8ZE3KXS",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleAuth = new GoogleAuthProvider();
