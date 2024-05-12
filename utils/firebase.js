import { getApp, getApps, initializeApp } from "firebase/app";
import { Auth, initializeAuth, browserLocalPersistence } from 'firebase/auth';
import dotenv from 'dotenv'
import AsyncStorage from "@react-native-async-storage/async-storage";


// dotenv.config();

let firebaseApp;

export const getFirebaseApp = () => {
  if (firebaseApp) {
    return firebaseApp;
  }

  const firebaseConfig = {
    apiKey: "AIzaSyD6MtHR0c6H1BAvm-tRLRttydGF0HlhHbk",
    authDomain: "mliot-sis.firebaseapp.com",
    projectId: "mliot-sis",
    storageBucket: "mliot-sis.appspot.com",
    messagingSenderId: "785611461017",
    appId: "1:785611461017:web:65789c7d4cbade11168308",
    measurementId: "G-51J2WPC9KN",
    databaseURL: "https://mliot-sis-default-rtdb.asia-southeast1.firebasedatabase.app"// Specify the database URL with the correct region
  };

  // Initialize Firebase
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

  // Initialize Firebase Auth with persistence
  initializeAuth(app).setPersistence(browserLocalPersistence)
    .then(() => {
      console.log('Firebase Auth persistence set successfully');
    })
    .catch((error) => {
      console.error('Error setting Firebase Auth persistence:', error);
    });



  firebaseApp = app;

  return app;
}
