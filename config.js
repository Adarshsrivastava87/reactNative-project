// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI5B5Z2_PqGv640obdNSoKt8sOd1plaaM",
  authDomain: "reactnative-02.firebaseapp.com",
  projectId: "reactnative-02",
  storageBucket: "reactnative-02.appspot.com",
  messagingSenderId: "1025909689339",
  appId: "1:1025909689339:web:b952874048eff4792fd95e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//initializing database
export const db = getDatabase(app);