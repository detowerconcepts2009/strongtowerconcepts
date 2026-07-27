"use client";

const reviews = [

  {
    id: 1,
    name: "Victor O.",
    rating: 5,
    review:
      "Excellent mattress. Delivery was fast and quality exceeded expectations.",
  },

  {
    id: 2,
    name: "Blessing A.",
    rating: 4,
    review:
      "Comfortable sofa and exactly as advertised.",
  },

];

export default function FurnitureReviews() {

  return (

    <section className="rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="mb-8 text-3xl font-bold text-orange-700">

        Customer Reviews

      </h2>

      <div className="space-y-6">

        {reviews.map((review) => (

          <div
            key={review.id}
            className="rounded-xl border p-5"
          >

            <div className="flex justify-between">

              <strong>

                {review.name}

              </strong>

              <span>

                {"⭐".repeat(review.rating)}

              </span>

            </div>

            <p className="mt-4 text-gray-600">

              {review.review}

            </p>

          </div>

        ))}

      </div>

    </section>

  );

}