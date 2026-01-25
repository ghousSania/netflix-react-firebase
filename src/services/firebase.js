import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-zEc4E-9sPr1UEOT5w2sXGC2LbRAjwwI",
  authDomain: "netflix-react-firebase-98266.firebaseapp.com",
  projectId: "netflix-react-firebase-98266",
  storageBucket: "netflix-react-firebase-98266.firebasestorage.app",
  messagingSenderId: "1019965165897",
  appId: "1:1019965165897:web:ae2f30020db3fbbe418a98",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
