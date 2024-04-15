import { getApp, getApps, initializeApp } from "firebase/app";
import { Auth, initializeAuth, browserLocalPersistence } from 'firebase/auth';
import dotenv from 'dotenv'
import AsyncStorage from "@react-native-async-storage/async-storage";


dotenv.config();

let firebaseApp;

export const getFirebaseApp = () => {
  if (firebaseApp) {
    return firebaseApp;
  }

  const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
    databaseURL: process.env.databaseURL// Specify the database URL with the correct region
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
