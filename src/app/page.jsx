import Services from "@/components/Services";

export const metadata = {
  title: "Care.xyz | Home",
  description: "Reliable babysitting and elderly care",
};

export default function Home() {
  return (
    <main>
      <section className="text-center py-16 bg-blue-50">
        <h1 className="text-4xl font-bold">
          Reliable Care for Your Loved Ones
        </h1>
        <p className="mt-4 text-gray-600">
          Easy • Secure • Trusted
        </p>
      </section>

      <Services />
    </main>
  );
}
