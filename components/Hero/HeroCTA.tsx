export default function HeroCTA() {
  const stats = [
    {
      value: "1200+",
      label: "Properties",
    },
    {
      value: "300+",
      label: "Vehicles",
    },
    {
      value: "50+",
      label: "Business Services",
    },
    {
      value: "24/7",
      label: "Customer Support",
    },
  ];

  return (
    <section className="mt-16">

      <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-lg">

        <div className="grid grid-cols-2 md:grid-cols-4">

          {stats.map((item) => (

            <div
              key={item.label}
              className="p-8 text-center border-b md:border-b-0 md:border-r last:border-r-0 border-white/10"
            >

              <h3 className="text-3xl font-black text-yellow-300">
                {item.value}
              </h3>

              <p className="mt-2 text-blue-100">
                {item.label}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}