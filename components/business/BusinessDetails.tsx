interface BusinessDetailsProps {

  title: string;
  description: string;
  duration: string;
  requirements: string[];
  deliverables: string[];

}

export default function BusinessDetails({

  title,
  description,
  duration,
  requirements,
  deliverables,

}: BusinessDetailsProps) {

  return (

    <section className="rounded-2xl bg-white p-8 shadow-lg">

      <h1 className="text-4xl font-bold text-blue-950">

        {title}

      </h1>

      <p className="mt-6 leading-8 text-gray-600">

        {description}

      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">

        <div>

          <h2 className="mb-4 text-2xl font-bold">

            Requirements

          </h2>

          <ul className="space-y-3">

            {requirements.map((item) => (

              <li
                key={item}
                className="rounded-xl border p-4"
              >

                • {item}

              </li>

            ))}

          </ul>

        </div>

        <div>

          <h2 className="mb-4 text-2xl font-bold">

            What You Receive

          </h2>

          <ul className="space-y-3">

            {deliverables.map((item) => (

              <li
                key={item}
                className="rounded-xl border p-4"
              >

                ✓ {item}

              </li>

            ))}

          </ul>

        </div>

      </div>

      <div className="mt-10 rounded-xl bg-blue-50 p-5">

        <strong>Estimated Processing Time:</strong>

        <p className="mt-2">

          {duration}

        </p>

      </div>

    </section>

  );

}