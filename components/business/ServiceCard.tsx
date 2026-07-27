import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  featured?: boolean;
}

export default function ServiceCard({
  title,
  description,
  href,
  icon: Icon,
  featured = false,
}: ServiceCardProps) {

  return (

    <Link href={href}>

      <div className="relative rounded-2xl bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">

        {featured && (

          <span className="absolute right-4 top-4 rounded-full bg-blue-900 px-3 py-1 text-xs font-semibold text-white">

            Popular

          </span>

        )}

        <Icon
          size={48}
          className="mb-6 text-blue-900"
        />

        <h3 className="text-2xl font-bold text-blue-950">

          {title}

        </h3>

        <p className="mt-4 leading-7 text-gray-600">

          {description}

        </p>

      </div>

    </Link>

  );

}