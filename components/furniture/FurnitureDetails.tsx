interface FurnitureDetailsProps {
  title: string;
  description: string;
  brand: string;
  category: string;
  material: string;
  warranty: string;
  delivery: string;
}

export default function FurnitureDetails({
  title,
  description,
  brand,
  category,
  material,
  warranty,
  delivery,
}: FurnitureDetailsProps) {

  return (

    <section className="rounded-2xl bg-white p-8 shadow-lg">

      <h1 className="text-4xl font-bold text-orange-700">

        {title}

      </h1>

      <p className="mt-6 leading-8 text-gray-600">

        {description}

      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">

        <div className="rounded-xl border p-5">

          <strong>Brand</strong>

          <p>{brand}</p>

        </div>

        <div className="rounded-xl border p-5">

          <strong>Category</strong>

          <p>{category}</p>

        </div>

        <div className="rounded-xl border p-5">

          <strong>Material</strong>

          <p>{material}</p>

        </div>

        <div className="rounded-xl border p-5">

          <strong>Warranty</strong>

          <p>{warranty}</p>

        </div>

        <div className="rounded-xl border p-5 md:col-span-2">

          <strong>Delivery Information</strong>

          <p>{delivery}</p>

        </div>

      </div>

    </section>

  );

}