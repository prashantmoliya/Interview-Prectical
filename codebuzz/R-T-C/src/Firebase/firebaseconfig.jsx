
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyD0mNMYQn0hDAc2XvaVtUjbE27eFUqtMuY",
  authDomain: "react-prectice.firebaseapp.com",
  projectId: "react-prectice",
  storageBucket: "react-prectice.appspot.com",
  messagingSenderId: "70036735560", 
  appId: "1:70036735560:web:5c4d553e7f640df3423a7d",
  measurementId: "G-80ZSJM753Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth= getAuth(app);
const firestoreDB = getFirestore(app);

export { app, auth, firestoreDB }; 