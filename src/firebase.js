// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAq0W5Kh2Jgl4PxiC8dEff9rpqfue2sp7k",
  authDomain: "todoapp-93121.firebaseapp.com",
  projectId: "todoapp-93121",
  storageBucket: "todoapp-93121.appspot.com",
  messagingSenderId: "890719571830",
  appId: "1:890719571830:web:07db79b6a764cf88c4f457",
  measurementId: "G-2RF0D1X1BK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;