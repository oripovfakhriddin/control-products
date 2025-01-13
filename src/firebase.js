import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "databaseforcompany-a2953.firebaseapp.com",
  projectId: "databaseforcompany-a2953",
  storageBucket: "databaseforcompany-a2953.firebasestorage.app",
  messagingSenderId: "417670768985",
  appId: "1:417670768985:web:cbb315367dab982cc6c448",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
