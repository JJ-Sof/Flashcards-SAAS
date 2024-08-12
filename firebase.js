// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_Ksu_nWUgZbw30HKzAgmx7g5Jmoozc4g",
  authDomain: "flashcards-saas-3f82f.firebaseapp.com",
  projectId: "flashcards-saas-3f82f",
  storageBucket: "flashcards-saas-3f82f.appspot.com",
  messagingSenderId: "925023896014",
  appId: "1:925023896014:web:5fb5bd6020fc17c84e6b9f",
  measurementId: "G-T493F5KTVE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);