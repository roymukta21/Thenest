import Link from "next/link";

export const metadata = {
  title: "Service Details | TheNest",
};

export default function ServiceDetails({ params }) {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        {params.id.toUpperCase()} Service
      </h1>

      <Link
        href={`/booking/${params.id}`}
        className="btn btn-primary mt-6"
      >
        Book Service
      </Link>
    </div>
  );
}
