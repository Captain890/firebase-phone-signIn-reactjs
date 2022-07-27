import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyApoCkkZk8RPKNCzGNXnJcl7gt2fGXpytw",
    authDomain: "react-register-1a9cf.firebaseapp.com",
    projectId: "react-register-1a9cf",
    storageBucket: "react-register-1a9cf.appspot.com",
    messagingSenderId: "105303033584",
    appId: "1:105303033584:web:6b803c33ce90cc4a02e435",
    measurementId: "G-XM8C8415WV"
  };



  const app = initializeApp(firebaseConfig);
  export const authentication = getAuth(app);