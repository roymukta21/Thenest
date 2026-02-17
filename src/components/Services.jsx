import Link from "next/link";

// Mock services data
const services = [
  { id: "baby", name: "Baby Care", price: 200, description: "Professional care for your little ones" },
  { id: "elderly", name: "Elderly Care", price: 300, description: "Compassionate care for seniors" },
  { id: "sick", name: "Sick People Care", price: 350, description: "Specialized care for the unwell" },
];

export default function Services() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="border rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <p className="text-lg font-bold text-blue-600 mb-4">৳{service.price}/hour</p>
              <Link 
                href={`/service/${service.id}`} 
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
