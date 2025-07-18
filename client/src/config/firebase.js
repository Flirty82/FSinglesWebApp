import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9AHimDF9JO_w_B3meAUK9lsq-yU08ivE",
  authDomain: "f-singles-24.firebaseapp.com",
  projectId: "f-singles-24",
  storageBucket: "f-singles-24.firebasestorage.app",
  messagingSenderId: "961233473100",
  appId: "1:961233473100:web:db446c19f603c0fd7aaee9",
  measurementId: "G-9GYFF0B1ET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);