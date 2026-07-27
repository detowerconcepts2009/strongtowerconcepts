import ProductCard from "./ProductCard";
import SectionHeader from "./SectionHeader";

export default function InteriorNeeds() {
  const products = [
    {
      id: 1,
      name: "Vita Supreme Mattress",
      category: "Mattress",
      price: "₦285,000",
      featured: true,
    },
    {
      id: 2,
      name: "Luxury 6x6 Bed Frame",
      category: "Bedroom",
      price: "₦420,000",
      featured: false,
    },
    {
      id: 3,
      name: "Modern L-Shape Sofa",
      category: "Living Room",
      price: "₦780,000",
      featured: true,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <SectionHeader
          title="Interior Needs"
          subtitle="Quality furniture, mattresses and home essentials."
          buttonText="View All Products"
          buttonLink="/products"
        />

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}
        </div>

      </div>
    </section>
  );
}