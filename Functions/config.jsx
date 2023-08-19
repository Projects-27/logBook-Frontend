// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnZJbJ8ltgYBcgIASy5YcywcQbkub8Sts",
  authDomain: "project-24-4c553.firebaseapp.com",
  projectId: "project-24-4c553",
  storageBucket: "project-24-4c553.appspot.com",
  messagingSenderId: "1051593534490",
  appId: "1:1051593534490:web:b028597cec956ae1b235a3",
  measurementId: "G-GD5NZ1GSXE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default getFirestore