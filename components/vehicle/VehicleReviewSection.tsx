"use client";

const reviews = [
  {
    id: 1,
    name: "Michael A.",
    rating: 5,
    comment:
      "The vehicle matched the description perfectly. Inspection report gave me confidence before paying.",
    date: "July 2026",
  },
  {
    id: 2,
    name: "Grace O.",
    rating: 4,
    comment:
      "Dealer was responsive and documentation was complete.",
    date: "July 2026",
  },
];

export default function VehicleReviewSection() {

  return (

    <section className="rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="mb-8 text-3xl font-bold text-blue-950">

        Buyer Reviews

      </h2>

      <div className="space-y-6">

        {reviews.map((review) => (

          <div
            key={review.id}
            className="rounded-xl border p-6"
          >

            <div className="flex items-center justify-between">

              <h3 className="font-bold">

                {review.name}

              </h3>

              <span className="text-yellow-500">

                {"⭐".repeat(review.rating)}

              </span>

            </div>

            <p className="mt-4 text-gray-600">

              {review.comment}

            </p>

            <p className="mt-3 text-sm text-gray-400">

              {review.date}

            </p>

          </div>

        ))}

      </div>

    </section>

  );

}