// Import the functions you need from the SDKs you need
import { firebase } from "@firebase/app";
import "@firebase/auth";

// As per the Docs
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
export const app = initializeApp({
  apiKey: "AIzaSyBJNmbubofqnI1hko1awOhzBjQA5ooOsYw",
  authDomain: "viuteca-app.firebaseapp.com",
  projectId: "viuteca-app",
  storageBucket: "viuteca-app.appspot.com",
  messagingSenderId: "512178021982",
  appId: "1:512178021982:web:b8f6bbb7ed72d0a44d76cf"
});

export const auth = firebase.auth();
export const db = getFirestore();