import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDT9idyERyC8yOu_dJrKRL-_XnpArsiiDw",
  authDomain: "my-react-app-14754.firebaseapp.com",
  projectId: "my-react-app-14754",
  storageBucket: "my-react-app-14754.firebasestorage.app",
  messagingSenderId: "277853744544",
  appId: "1:277853744544:web:cd243b98d07d46397e08c5",
  measurementId: "G-8KZF9EL7KN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);