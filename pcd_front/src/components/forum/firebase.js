import { initializeApp } from "firebase/app";
import {getAuth}from "firebase/auth";
import {getFirestore}from "firebase/firestore";

// Your web app's Firebase configuration
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUUWB1viMwxtmq__nUT4hX4RefaBftd_M",
  authDomain: "chatroom-real-one.firebaseapp.com",
  projectId: "chatroom-real-one",
  storageBucket: "chatroom-real-one.firebasestorage.app",
  messagingSenderId: "560548857946",
  appId: "1:560548857946:web:7953a5de2cbee824333063"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import {getAuth}from "firebase/auth";
// import {getFirestore}from "firebase/firestore";
// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB7Z7DRdTUrOuFVsC47ANHtUc0gVmjv2Pg",
//   authDomain: "chatapp-77af1.firebaseapp.com",
//   projectId: "chatapp-77af1",
//   storageBucket: "chatapp-77af1.firebasestorage.app",
//   messagingSenderId: "428953212374",
//   appId: "1:428953212374:web:f09d65c0a8c35ae517c077"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth();
// export const db = getFirestore(app);



