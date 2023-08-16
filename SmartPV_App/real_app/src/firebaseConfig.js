import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7a4A3ffxLGUQhSy3RK5fnbKxOz1kmiYY",
  authDomain: "smart-pv-313fa.firebaseapp.com",
  projectId: "smart-pv-313fa",
  storageBucket: "smart-pv-313fa.appspot.com",
  messagingSenderId: "1019350409618",
  appId: "1:1019350409618:web:463e1ff954cdde47c5614b",
  measurementId: "G-839GDD3CKF",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(firebaseApp);

export const signInFirebase = async (email, password) =>
  signInWithEmailAndPassword(firebaseAuth, email, password);
