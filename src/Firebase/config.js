
import { initializeApp } from "firebase/app";
import {getAuth}from "firebase/auth"
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"

export const firebaseConfig = {
  apiKey:process.env.REACT_APP_FB_API_KEY,
  authDomain: "shopio-a790f.firebaseapp.com",
  projectId: "shopio-a790f",
  storageBucket: "shopio-a790f.appspot.com",
  messagingSenderId: "965220452705",
  appId: "1:965220452705:web:c09598e0d79c09dbaa5d20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db= getFirestore(app);
export const storage=getStorage(app);
export default app;