interface PropertyFeaturesProps {
  features: string[];
}

export default function PropertyFeatures({
  features,
}: PropertyFeaturesProps) {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-8">

      <h2 className="text-2xl font-bold text-blue-950 mb-6">
        Property Features
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {features.map((feature) => (

          <div
            key={feature}
            className="flex items-center gap-3"
          >

            <span className="text-green-600 text-xl">
              ✔
            </span>

            <span className="text-gray-700">
              {feature}
            </span>

          </div>

        ))}

      </div>

    </section>
  );
}