interface PropertyOverviewProps {
  description: string;
}

export default function PropertyOverview({
  description,
}: PropertyOverviewProps) {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-8">

      <h2 className="text-2xl font-bold text-blue-950 mb-6">
        Property Description
      </h2>

      <p className="text-gray-600 leading-8 whitespace-pre-line">
        {description}
      </p>

    </section>
  );
}