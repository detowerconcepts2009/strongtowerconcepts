const faqs = [

  {
    question: "How long does processing take?",
    answer:
      "Processing time depends on the service selected. The estimated duration is displayed on each service page.",
  },

  {
    question: "Can I pay online?",
    answer:
      "Yes. Online payment will be available through the Strong Tower Concepts payment gateway.",
  },

  {
    question: "Will I receive updates?",
    answer:
      "Yes. Email and WhatsApp notifications will keep you informed throughout the process.",
  },

  {
    question: "Can businesses partner with Strong Tower Concepts?",
    answer:
      "Yes. Verified businesses can register as partners and receive customer requests directly.",
  },

];

export default function BusinessFAQ() {

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

            <h3 className="text-lg font-bold text-blue-900">

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