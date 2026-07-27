import {
  FaCheckCircle,
  FaTimesCircle,
  FaFilePdf,
} from "react-icons/fa";

interface PropertyDocument {
  title: string;
  available: boolean;
}

interface PropertyDocumentsProps {
  documents: PropertyDocument[];
}

export default function PropertyDocuments({
  documents,
}: PropertyDocumentsProps) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-lg">

      <div className="mb-6 flex items-center gap-3">

        <FaFilePdf className="text-2xl text-red-600" />

        <h2 className="text-2xl font-bold text-blue-950">
          Property Documents
        </h2>

      </div>

      <div className="space-y-4">

        {documents.map((document) => (

          <div
            key={document.title}
            className="flex items-center justify-between rounded-xl border border-gray-200 p-4"
          >

            <span className="font-medium text-gray-700">
              {document.title}
            </span>

            {document.available ? (
              <span className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                <FaCheckCircle />

                Available

              </span>
            ) : (
              <span className="flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">

                <FaTimesCircle />

                Not Available

              </span>
            )}

          </div>

        ))}

      </div>

      <div className="mt-8 rounded-xl bg-blue-50 p-5">

        <p className="text-sm text-gray-700">

          Official documents are verified by Strong Tower Concepts.

          Download access is available after inspection booking or purchase process.

        </p>

      </div>

    </section>
  );
}