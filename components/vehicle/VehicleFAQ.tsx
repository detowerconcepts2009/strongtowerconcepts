"use client";

const faqs = [

  {
    question: "Can I inspect the vehicle before payment?",
    answer:
      "Yes. Buyers can schedule a physical inspection before completing payment.",
  },

  {
    question: "Is the VIN verified?",
    answer:
      "Vehicles marked VIN Verified have passed VIN validation and identity checks.",
  },

  {
    question: "Can I finance the vehicle?",
    answer:
      "Yes. Financing partners can process eligible vehicle purchases.",
  },

  {
    question: "Can ownership be transferred?",
    answer:
      "Yes. Ownership transfer assistance is available through approved agents.",
  },

];

export default function VehicleFAQ() {

  return (

    <section className="rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="mb-8 text-3xl font-bold text-blue-950">

        Frequently Asked Questions

      </h2>

      <div className="space-y-5">

        {faqs.map((faq) => (

          <div
            key={faq.question}
            className="rounded-xl border p-5"
          >

            <h3 className="font-bold text-blue-900">

              {faq.question}

            </h3>

            <p className="mt-3 text-gray-600">

              {faq.answer}

            </p>

          </div>

        ))}

      </div>

    </section>

  );

}