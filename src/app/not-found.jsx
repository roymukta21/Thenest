import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center p-20">
      <h1 className="text-4xl font-bold">404 Not Found</h1>

      <Link href="/" className="btn btn-primary mt-6">
        Back Home
      </Link>
    </div>
  );
}
