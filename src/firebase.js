import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdttAQXUBjLZpX6Y8qI3KeMq5Rwg0Q-yg",
  authDomain: "react-todo-baa18.firebaseapp.com",
  projectId: "react-todo-baa18",
  storageBucket: "react-todo-baa18.firebasestorage.app",
  messagingSenderId: "117997602506",
  appId: "1:117997602506:web:9cb3640f140eafebb35633",
  measurementId: "G-TBCJH7J8VN",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
