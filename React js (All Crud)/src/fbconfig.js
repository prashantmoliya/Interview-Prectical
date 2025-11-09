// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD5JKTtLmT5PDig_vifdhmeMzi6TbD97eM",
    authDomain: "crud-2005.firebaseapp.com",
    projectId: "crud-2005",
    storageBucket: "crud-2005.appspot.com",
    messagingSenderId: "956482997907",
    appId: "1:956482997907:web:3022706ffc3db86d9d8766",
    measurementId: "G-4BH8E66F3C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const fb= getFirestore(app);



