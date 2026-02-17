"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
//import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";

export default function Navbar() {
  const router = useRouter();
  const path = usePathname();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "My Bookings", href: "/my-bookings" },
  ];

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          TheNest
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-6 items-center">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`hover:text-gray-200 ${
                path === link.href ? "underline" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-sm ml-4"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="btn btn-outline btn-sm">
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white font-bold"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-blue-500 p-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-white"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-sm w-full"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="btn btn-outline btn-sm w-full"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
