import Link from "next/link";

const services = [
  { id: "baby", name: "Baby Care", price: 200 },
  { id: "elderly", name: "Elderly Care", price: 300 },
  { id: "sick", name: "Sick People Care", price: 350 },
];

export default function Services() {
  return (
    <div className="grid md:grid-cols-3 gap-6 p-8">
      {services.map((service) => (
        <div key={service.id} className="border p-6 rounded-xl">
          <h2 className="text-xl font-semibold">{service.name}</h2>
          <p>৳{service.price}/hour</p>

          <Link
            href={`/service/${service.id}`}
            className="btn btn-primary mt-4"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}
