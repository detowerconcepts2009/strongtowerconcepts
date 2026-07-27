export default function HeroStats() {
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
    <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-lg">

      {stats.map((item) => (
        <div
          key={item.label}
          className="border-r border-white/10 last:border-r-0 p-8 text-center"
        >
          <h2 className="text-4xl font-black text-yellow-400">
            {item.value}
          </h2>

          <p className="mt-3 text-blue-100">
            {item.label}
          </p>
        </div>
      ))}

    </div>
  );
}