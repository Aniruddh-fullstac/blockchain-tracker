import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAk0w-kJFrxrt24rzUO0v9RR9Ex0Xm3EDo",
  authDomain: "bingo-7332c.firebaseapp.com",
  databaseURL: "https://bingo-7332c-default-rtdb.firebaseio.com",
  projectId: "bingo-7332c",
  storageBucket: "bingo-7332c.firebasestorage.app",
  messagingSenderId: "972563330020",
  appId: "1:972563330020:web:fb98ccef79220f21ce0df1",
  measurementId: "G-5WZ761QELD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

// Analytics removed to prevent offline errors

export default app;
