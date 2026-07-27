import {
  Home,
  Building2,
  LandPlot,
  Building,
  Store,
  Warehouse,
  Hotel,
  Trees,
} from "lucide-react";

export default function PropertyCategories() {
  const categories = [
    { icon: <Home size={40} />, title: "Houses", count: "1,250 Listings" },
    { icon: <Building2 size={40} />, title: "Apartments", count: "980 Listings" },
    { icon: <LandPlot size={40} />, title: "Land", count: "2,100 Listings" },
    { icon: <Building size={40} />, title: "Office Space", count: "420 Listings" },
    { icon: <Store size={40} />, title: "Shops", count: "365 Listings" },
    { icon: <Warehouse size={40} />, title: "Warehouses", count: "215 Listings" },
    { icon: <Hotel size={40} />, title: "Hotels", count: "85 Listings" },
    { icon: <Trees size={40} />, title: "Estates", count: "540 Listings" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900">
            Browse by Category
          </h2>

          <p className="mt-4 text-gray-600">
            Find properties that match your needs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {categories.map((category, index) => (

            <div
              key={index}
              className="border rounded-xl p-8 text-center hover:bg-blue-900 hover:text-white transition duration-300 cursor-pointer shadow-sm hover:shadow-xl"
            >
              <div className="flex justify-center mb-5 text-blue-700 group-hover:text-white">
                {category.icon}
              </div>

              <h3 className="font-bold text-lg">
                {category.title}
              </h3>

              <p className="text-sm mt-2 opacity-70">
                {category.count}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}