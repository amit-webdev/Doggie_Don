
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCgbkRun-Fv0up6JaMZBk1G5-U9Wlx6t7U",
  authDomain: "doggydon-8c38b.firebaseapp.com",
  projectId: "doggydon-8c38b",
  storageBucket: "doggydon-8c38b.firebasestorage.app",
  messagingSenderId: "1004977847897",
  appId: "1:1004977847897:web:7ff31fec3c3d24bbee3b48",
  measurementId: "G-2C2C5CTMZZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db,auth, provider, signInWithPopup };