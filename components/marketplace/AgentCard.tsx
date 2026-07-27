import Image from "next/image";

import ContactButtons from "./ContactButtons";
import ScheduleInspection from "./ScheduleInspection";

interface AgentCardProps {
  name: string;
  company: string;
  phone: string;
  whatsapp: string;
  email: string;
  photo: string;
}

export default function AgentCard({
  name,
  company,
  phone,
  whatsapp,
  email,
  photo,
}: AgentCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">

      <div className="flex flex-col items-center">

        <div className="relative h-28 w-28 overflow-hidden rounded-full">

          <Image
            src={photo}
            alt={name}
            fill
            className="object-cover"
          />

        </div>

        <h2 className="mt-5 text-center text-2xl font-bold text-blue-950">
          {name}
        </h2>

        <p className="mt-2 text-center text-gray-500">
          {company}
        </p>

      </div>

      <div className="mt-8">

        <ContactButtons
          agentName={name}
          phone={phone}
          whatsapp={whatsapp}
          email={email}
          listingTitle="Property Listing"
        />

      </div>

      <div className="mt-6 border-t pt-6">

        <ScheduleInspection
          agentName={name}
          propertyTitle="Property Listing"
        />

      </div>

    </div>
  );
}