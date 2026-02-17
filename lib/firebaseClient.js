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
  const isValid = !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
  );
  
  if (!isValid && typeof window !== "undefined") {
    console.error("❌ Firebase configuration is missing. Please add environment variables in Vercel:");
    console.error("Required variables: NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, NEXT_PUBLIC_FIREBASE_PROJECT_ID, NEXT_PUBLIC_FIREBASE_APP_ID");
  }
  
  return isValid;
};

// Initialize Firebase only in browser and with valid config
let app;
let auth;
let googleProvider;
let analytics;

if (typeof window !== "undefined") {
  if (isValidConfig()) {
    try {
      app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
      auth = getAuth(app);
      googleProvider = new GoogleAuthProvider();
      analytics = getAnalytics(app);
      console.log("✅ Firebase initialized successfully");
    } catch (error) {
      console.error("❌ Firebase initialization error:", error);
    }
  }
}

export { auth, googleProvider, analytics };
