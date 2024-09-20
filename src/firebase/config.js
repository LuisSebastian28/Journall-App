// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcnR3v2KjHbPf6nl_6LHPXTWYaMmo6ny0",
  authDomain: "react-cursos-a38dd.firebaseapp.com",
  projectId: "react-cursos-a38dd",
  storageBucket: "react-cursos-a38dd.appspot.com",
  messagingSenderId: "393896954047",
  appId: "1:393896954047:web:e422ab7c87bf4036dc5e0a"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB =  getFirestore(FirebaseApp);