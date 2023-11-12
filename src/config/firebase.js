import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBW9lhlIzhSsU6lcwQSi6iP_zvdzKLPCAo",
  authDomain: "kasthamandap-cdfd4.firebaseapp.com",
  projectId: "kasthamandap-cdfd4",
  storageBucket: "kasthamandap-cdfd4.appspot.com",
  messagingSenderId: "1081740869330",
  appId: "1:1081740869330:web:4ac36754773302d327770b",
  measurementId: "G-J90358NT9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
