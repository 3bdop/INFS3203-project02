// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEETNjdJkw230OMMrncEbf7bPPxOiFmW8",
  authDomain: "infs3203-project.firebaseapp.com",
  projectId: "infs3203-project",
  storageBucket: "infs3203-project.appspot.com",
  messagingSenderId: "471484750231",
  appId: "1:471484750231:web:d864e29c730afaae3c4cd2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app);