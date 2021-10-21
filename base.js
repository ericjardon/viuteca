// Import the functions you need from the SDKs you need
import { firebase } from "@firebase/app";
import "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJNmbubofqnI1hko1awOhzBjQA5ooOsYw",
  authDomain: "viuteca-app.firebaseapp.com",
  projectId: "viuteca-app",
  storageBucket: "viuteca-app.appspot.com",
  messagingSenderId: "512178021982",
  appId: "1:512178021982:web:b8f6bbb7ed72d0a44d76cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const app;
export const auth = firebase.auth();