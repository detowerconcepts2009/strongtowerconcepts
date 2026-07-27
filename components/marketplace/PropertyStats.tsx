import {
  FaCalendarAlt,
  FaEye,
  FaMapMarkerAlt,
  FaHome,
  FaRulerCombined,
  FaCheckCircle,
} from "react-icons/fa";

interface PropertyStatsProps {
  id: string;
  views: number;
  postedAt: string;
  status: string;
  yearBuilt: number;
  area: number;
  location: string;
  latitude: number;
  longitude: number;
}

export default function PropertyStats({
  id,
  views,
  postedAt,
  status,
  yearBuilt,
  area,
  location,
  latitude,
  longitude,
}: PropertyStatsProps) {

  const stats = [
    {
      icon: <FaHome />,
      label: "Reference",
      value: id,
    },
    {
      icon: <FaEye />,
      label: "Views",
      value: views,
    },
    {
      icon: <FaCalendarAlt />,
      label: "Posted",
      value: postedAt,
    },
    {
      icon: <FaCheckCircle />,
      label: "Status",
      value: status,
    },
    {
      icon: <FaRulerCombined />,
      label: "Area",
      value: `${area} sqm`,
    },
    {
      icon: <FaCalendarAlt />,
      label: "Built",
      value: yearBuilt || "N/A",
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "Location",
      value: location,
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "Coordinates",
      value: `${latitude}, ${longitude}`,
    },
  ];

  return (
    <section className="rounded-2xl bg-white shadow-lg p-8">

      <h2 className="text-2xl font-bold text-blue-950 mb-8">
        Property Statistics
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {stats.map((item) => (

          <div
            key={item.label}
            className="flex items-center gap-4 rounded-xl border p-4"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-900 text-lg">
              {item.icon}
            </div>

            <div>

              <p className="text-sm text-gray-500">
                {item.label}
              </p>

              <p className="font-semibold text-blue-950">
                {item.value}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}