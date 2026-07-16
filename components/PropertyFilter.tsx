export default function PropertyFilter() {
  const filters = [
    "All",
    "For Sale",
    "For Rent",
    "Lease",
    "Featured",
    "Verified",
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-10">
      {filters.map((filter, index) => (
        <button
          key={index}
          className={`px-5 py-2 rounded-full border transition font-medium ${
            index === 0
              ? "bg-blue-900 text-white border-blue-900"
              : "bg-white text-gray-700 border-gray-300 hover:bg-blue-900 hover:text-white hover:border-blue-900"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}