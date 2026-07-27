import { Building2, Users, MapPin, BadgeCheck } from "lucide-react";

export default function QuickStats() {
  const stats = [
    {
      icon: <Building2 size={40} className="text-blue-700" />,
      number: "25,000+",
      title: "Verified Properties",
    },
    {
      icon: <Users size={40} className="text-blue-700" />,
      number: "8,000+",
      title: "Verified Agents",
    },
    {
      icon: <MapPin size={40} className="text-blue-700" />,
      number: "36 States",
      title: "Nationwide Coverage",
    },
    {
      icon: <BadgeCheck size={40} className="text-blue-700" />,
      number: "98%",
      title: "Customer Satisfaction",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-8">

          {stats.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-xl shadow p-8 text-center hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-4">
                {item.icon}
              </div>

              <h2 className="text-4xl font-bold text-blue-900">
                {item.number}
              </h2>

              <p className="mt-2 text-gray-600">
                {item.title}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}