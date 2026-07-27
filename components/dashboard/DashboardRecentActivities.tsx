"use client";

const activities = [

  {
    title: "Luxury Duplex uploaded",
    time: "5 mins ago",
  },

  {
    title: "Inspection booked",
    time: "12 mins ago",
  },

  {
    title: "New dealer registered",
    time: "45 mins ago",
  },

  {
    title: "Voucher redeemed",
    time: "1 hour ago",
  },

];

export default function DashboardRecentActivities() {

  return (

    <div className="rounded-2xl bg-white p-6 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold">
        Recent Activities
      </h2>

      <div className="space-y-4">

        {activities.map((item, index) => (

          <div
            key={index}
            className="flex items-center justify-between border-b pb-4"
          >

            <div>

              <h3 className="font-semibold">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500">
                {item.time}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}