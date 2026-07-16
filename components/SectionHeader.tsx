interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  buttonText,
  buttonLink = "#",
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">

      <div>
        <h2 className="text-4xl font-bold text-blue-900">
          {title}
        </h2>

        {subtitle && (
          <p className="text-gray-500 mt-2">
            {subtitle}
          </p>
        )}
      </div>

      {buttonText && (
        <a
          href={buttonLink}
          className="mt-4 md:mt-0 text-blue-900 font-semibold hover:underline"
        >
          {buttonText} →
        </a>
      )}

    </div>
  );
}