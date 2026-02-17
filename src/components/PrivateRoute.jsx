"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebaseClient";
//import { auth } from "../../lib/firebase";

export default function PrivateRoute({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login");
      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  if (loading) return <p className="p-10">Loading...</p>;

  return children;
}
