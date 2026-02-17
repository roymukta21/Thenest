"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
//import { auth, googleProvider } from "../../../lib/firebaseClient"; 
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { setUserToken } from "../../../lib/setToken";
import { auth, googleProvider } from "../../../lib/firebaseClient";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);

  // ✅ Ensure Firebase runs only on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevent SSR errors

  // ✅ Email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // reset previous errors

    if (!auth) {
      setError("Authentication service is not available. Please check configuration.");
      return;
    }

    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await setUserToken(result.user);
      router.push("/");
    } catch (err) {
      console.error(err);
      switch (err.code) {
        case "auth/user-not-found":
          setError("User not found. Please sign up first.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password. Try again.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        default:
          setError(err.message);
      }
    }
  };

  // ✅ Google login
  const handleGoogle = async () => {
    setError(""); // reset previous errors
    
    if (!auth || !googleProvider) {
      setError("Authentication service is not available. Please check configuration.");
      return;
    }
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await setUserToken(result.user);
      router.push("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center p-10">
      <form onSubmit={handleLogin} className="border p-8 rounded-xl w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered w-full mb-3"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mb-3"
          required
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>

        <button
          type="button"
          onClick={handleGoogle}
          className="btn btn-outline w-full mt-3"
        >
          Continue with Google
        </button>
      </form>
    </div>
  );
}
