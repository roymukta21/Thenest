"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function ServiceDetails() {
  const params = useParams(); // client-safe hook
  const id = params.id;

  if (!id) return <p>Loading...</p>; // safety

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{id.toUpperCase()} Service</h1>
      <p className="mt-4">Professional caregivers available for {id}.</p>

      <Link href={`/booking/${id}`} className="btn btn-primary mt-6">
        Book Service
      </Link>
    </div>
  );
}
