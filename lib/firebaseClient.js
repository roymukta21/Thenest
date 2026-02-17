"use client";

import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Validate Firebase config
const isValidConfig = () => {
  return (
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
  );
};

// Initialize Firebase only in browser and with valid config
let app;
let auth;
let googleProvider;
let analytics;

if (typeof window !== "undefined" && isValidConfig()) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    analytics = getAnalytics(app);
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
} else if (typeof window !== "undefined" && !isValidConfig()) {
  console.error("Firebase configuration is invalid. Check your .env.local file.");
}

export { auth, googleProvider, analytics };
