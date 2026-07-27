import FurnitureCard from "./FurnitureCard";

export default function FurnitureGrid() {

  const furniture = [

    {
      id: "fur001",
      title: "Vita Supreme Orthopaedic Mattress",
      image: "/images/furniture/mattress1.jpg",
      category: "Mattress",
      brand: "Vitafoam",
      price: "₦420,000",
      location: "Lagos",
      condition: "Brand New",
      featured: true,
    },

    {
      id: "fur002",
      title: "Executive Office Chair",
      image: "/images/furniture/chair1.jpg",
      category: "Office Furniture",
      brand: "Strong Tower",
      price: "₦165,000",
      location: "Abuja",
      condition: "Brand New",
      featured: false,
    },

    {
      id: "fur003",
      title: "Luxury 7-Seater Sofa",
      image: "/images/furniture/sofa1.jpg",
      category: "Living Room",
      brand: "Royal Furniture",
      price: "₦1,250,000",
      location: "Port Harcourt",
      condition: "Brand New",
      featured: true,
    },

  ];

  return (

    <section className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

      {furniture.map((item) => (

        <FurnitureCard
          key={item.id}
          {...item}
        />

      ))}

    </section>

  );

}