"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { setUserToken } from "../../../lib/setToken";
import { auth } from "../../../lib/firebaseClient";
//import { auth } from "../../../lib/firebase";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!auth) {
      setError("Authentication service is not available. Please check configuration.");
      return;
    }

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    // ✅ password validation
    if (!/(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
      return setError(
        "Password must be 6+ chars with uppercase & lowercase"
      );
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setUserToken(result.user);

      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center p-10">
      <form
        onSubmit={handleRegister}
        className="border p-8 rounded-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <input
          name="name"
          placeholder="Name"
          className="input input-bordered w-full mb-3"
          required
        />

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

        {error && <p className="text-red-500">{error}</p>}

        <button className="btn btn-primary w-full mt-4">
          Register
        </button>
      </form>
    </div>
  );
}
