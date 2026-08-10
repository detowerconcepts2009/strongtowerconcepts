"use client";

interface WelcomeCardProps {
  firstName?: string;
}

export default function WelcomeCard({
  firstName,
}: WelcomeCardProps) {

  return (

    <div className="mt-8 bg-white rounded-2xl shadow-sm p-8">

      <h2 className="text-2xl font-bold text-slate-900">

        Welcome{firstName ? `, ${firstName}` : ""}!

      </h2>

      <p className="mt-4 text-slate-600 leading-8">

        Welcome to Strong Tower Concepts.

        <br /><br />

        From this dashboard you will be able to:

      </p>

      <ul className="mt-5 space-y-3 text-slate-700 list-disc pl-6">

        <li>Manage your properties.</li>

        <li>Manage your businesses.</li>

        <li>Monitor your wallet balance.</li>

        <li>Receive marketplace notifications.</li>

        <li>Manage messages and inspections.</li>

      </ul>

    </div>

  );

}