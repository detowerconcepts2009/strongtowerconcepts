import { BadgeCheck, Phone, Mail } from "lucide-react";

export default function FeaturedAgents() {
  const agents = [
    {
      name: "Victor Properties",
      location: "Lagos",
      listings: "245 Properties",
    },
    {
      name: "Prime Realtors",
      location: "Abuja",
      listings: "180 Properties",
    },
    {
      name: "BlueSky Homes",
      location: "Port Harcourt",
      listings: "132 Properties",
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900">
            Featured Verified Agents
          </h2>

          <p className="text-gray-600 mt-4">
            Meet trusted and verified real estate professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {agents.map((agent, index) => (

            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition"
            >

              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto text-4xl font-bold text-blue-800">
                {agent.name.charAt(0)}
              </div>

              <h3 className="text-2xl font-bold text-center mt-5">
                {agent.name}
              </h3>

              <div className="flex justify-center mt-2">
                <BadgeCheck className="text-green-600 mr-2" />
                <span className="text-green-700 font-semibold">
                  Verified Agent
                </span>
              </div>

              <p className="text-center text-gray-600 mt-4">
                📍 {agent.location}
              </p>

              <p className="text-center text-gray-600">
                🏠 {agent.listings}
              </p>

              <div className="flex justify-center gap-4 mt-6">

                <button className="bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                  View Profile
                </button>

                <button className="border border-blue-900 px-5 py-2 rounded-lg hover:bg-blue-900 hover:text-white">
                  Contact
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}