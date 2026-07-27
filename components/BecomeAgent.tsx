export default function BecomeAgent() {
  return (
    <section className="bg-blue-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-14 items-center">

          <div>

            <h2 className="text-5xl font-bold">
              Become a Verified Agent
            </h2>

            <p className="mt-6 text-blue-100 text-lg">
              Join Nigeria's growing property marketplace and start listing
              verified properties for sale, rent, lease and short-let.
            </p>

            <div className="mt-8 space-y-4">

              <div>✅ Verified Agent Badge</div>

              <div>✅ Unlimited Property Listings</div>

              <div>✅ Receive Buyer & Tenant Enquiries</div>

              <div>✅ Upload Photos & Videos</div>

              <div>✅ Property Performance Dashboard</div>

              <div>✅ Premium Listing Promotion</div>

            </div>

            <button className="mt-10 bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100">
              Register as an Agent
            </button>

          </div>

          <div className="bg-white rounded-2xl p-8 text-gray-800 shadow-2xl">

            <h3 className="text-2xl font-bold mb-6">
              Verification Requirements
            </h3>

            <ul className="space-y-4">

              <li>✔ Passport Photograph</li>

              <li>✔ Government ID (NIN / Driver's Licence)</li>

              <li>✔ Registered Membership Card</li>

              <li>✔ Phone Number Verification</li>

              <li>✔ Email Verification</li>

              <li>✔ Company Details (Optional)</li>

            </ul>

          </div>

        </div>

      </div>
    </section>
  );
}