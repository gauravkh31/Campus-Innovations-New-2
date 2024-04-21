// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDBHTUtOeuCON7AEF3UPPxU1sHsnFfBv-M",
//     authDomain: "ecommerce-for.firebaseapp.com",
//     projectId: "ecommerce-for",
//     storageBucket: "ecommerce-for.appspot.com",
//     messagingSenderId: "609664686595",
//     appId: "1:609664686595:web:302bf25cc8efa64a4e4c36"
// };

const firebaseConfig = {
    apiKey: "AIzaSyCgbD6UkmfdASKgRxaXVzQAs3tdMo4tIRc",
    authDomain: "campus-innovations-new.firebaseapp.com",
    projectId: "campus-innovations-new",
    storageBucket: "campus-innovations-new.appspot.com",
    messagingSenderId: "32913024368",
    appId: "1:32913024368:web:0facd1d2952cb813d39bb5"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }