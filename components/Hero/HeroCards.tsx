import {
  Building2,
  Car,
  Sofa,
  Briefcase,
  Laptop,
  Package,
} from "lucide-react";

export default function HeroCards() {
  const services = [
    {
      icon: <Building2 size={34} />,
      title: "Properties",
      desc: "Buy • Sell • Rent",
      color: "text-blue-400",
    },
    {
      icon: <Car size={34} />,
      title: "Vehicles",
      desc: "Buy • Sell • Swap",
      color: "text-blue-400",
    },
    {
      icon: <Sofa size={34} />,
      title: "Interior Needs",
      desc: "Furniture • Décor",
      color: "text-yellow-400",
    },
    {
      icon: <Briefcase size={34} />,
      title: "Business Services",
      desc: "CAC • NIN • TIN",
      color: "text-yellow-400",
    },
    {
      icon: <Laptop size={34} />,
      title: "ICT Solutions",
      desc: "Web • Hosting • CCTV",
      color: "text-yellow-400",
    },
    {
      icon: <Package size={34} />,
      title: "Cargo & Logistics",
      desc: "Worldwide Shipping",
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-6">

      {services.map((service) => (

        <div
          key={service.title}
          className="group rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl p-7 transition-all duration-300 hover:-translate-y-2 hover:bg-white/20 hover:border-yellow-400/50 hover:shadow-2xl"
        >

          <div className={`${service.color} mb-5 transition-transform duration-300 group-hover:scale-110`}>
            {service.icon}
          </div>

          <h3 className="text-xl font-bold">
            {service.title}
          </h3>

          <p className="mt-2 text-blue-100 leading-7">
            {service.desc}
          </p>

        </div>

      ))}

    </div>
  );
}