import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyDQ8jOetAoqdQ0ZKp1a1wSgnADrmAANL9E",
  authDomain: "health-center-e1ee9.firebaseapp.com",
  projectId: "health-center-e1ee9",
  storageBucket: "health-center-e1ee9.appspot.com",
  messagingSenderId: "1020312097802",
  appId: "1:1020312097802:web:591354e66a845c867cfbf3",
  measurementId: "G-W889HP6V12"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
