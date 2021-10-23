// Import the functions you need from the SDKs you need
import { firebase } from "@firebase/app";
import "@firebase/auth";
import {firebaseConfig} from './config/config'

// As per the Docs
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
export const app = initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = getFirestore();