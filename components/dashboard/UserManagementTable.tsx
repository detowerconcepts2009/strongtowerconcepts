"use client";

const users = [
  {
    id: "USR001",
    name: "Olawale Victor",
    email: "victor@email.com",
    role: "Customer",
    status: "Active",
    joined: "26 Jul 2026",
  },
];

export default function UserManagementTable() {

  return (

    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

      <table className="w-full">

        <thead className="bg-blue-900 text-white">

          <tr>

            <th className="p-4">User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user.id}
              className="border-b text-center"
            >

              <td className="p-4">{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>{user.joined}</td>

              <td>

                <button className="rounded-lg bg-blue-900 px-4 py-2 text-white">

                  View

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}