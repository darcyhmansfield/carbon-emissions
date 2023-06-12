// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDInx4-g2ELTy1KE_JEOecQ2uSTIe1eDNM",
  authDomain: "carbon-emissions-42cdd.firebaseapp.com",
  projectId: "carbon-emissions-42cdd",
  storageBucket: "carbon-emissions-42cdd.appspot.com",
  messagingSenderId: "363721289004",
  appId: "1:363721289004:web:2a12d3e539beeea2949089",
  measurementId: "G-8L0C3PMN6R",
  databaseURL: 'https://carbon-emissions-42cdd-default-rtdb.asia-southeast1.firebasedatabase.app/'
};

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
