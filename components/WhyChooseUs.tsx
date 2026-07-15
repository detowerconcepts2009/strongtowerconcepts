import { ShieldCheck, BadgeCheck, Users, Headset } from "lucide-react";

export default function WhyChooseUs() {
  const items = [
    {
      icon: <ShieldCheck size={45} className="text-blue-700" />,
      title: "Verified Properties",
      text: "Every property is reviewed before publication to reduce fake listings.",
    },
    {
      icon: <BadgeCheck size={45} className="text-blue-700" />,
      title: "Verified Agents",
      text: "Only approved agents and registered realtors can publish listings.",
    },
    {
      icon: <Users size={45} className="text-blue-700" />,
      title: "Trusted Community",
      text: "Connect buyers, tenants, landlords and agents in one secure platform.",
    },
    {
      icon: <Headset size={45} className="text-blue-700" />,
      title: "Dedicated Support",
      text: "Our support team is available whenever you need assistance.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-blue-900">
          Why Choose Strong Tower Concepts
        </h2>

        <p className="text-center mt-4 text-gray-600">
          Secure. Reliable. Professional.
        </p>

        <div className="grid md:grid-cols-4 gap-8 mt-14">

          {items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 text-center shadow hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600">
                {item.text}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}