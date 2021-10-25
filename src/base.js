// Import the functions you need from the SDKs you need.
// Firebase version 9.0 and up has completely changed to a modular import syntax.
// Reference: https://firebase.google.com/docs/firestore
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = require("./config/config").firebaseConfig;

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();