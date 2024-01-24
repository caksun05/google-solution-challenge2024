// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCs-IdD3VvAB9s_amfQY-va5J4JCykEc2E",
    authDomain: "chatbot-1000.firebaseapp.com",
    projectId: "chatbot-1000",
    storageBucket: "chatbot-1000.appspot.com",
    messagingSenderId: "916926694978",
    appId: "1:916926694978:web:2626b4474ebb4564de0fdb",
    measurementId: "G-1S42V399Q4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);

export {
    app,
    db,
    auth
};