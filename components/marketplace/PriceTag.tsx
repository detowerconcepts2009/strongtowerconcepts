interface PriceTagProps {
  price: number;
  negotiable?: boolean;
  period?: string;
}

export default function PriceTag({
  price,
 negotiable = false,
  period,
}: PriceTagProps) {
  return (
    <div className="space-y-2">

      <div className="flex items-center gap-3 flex-wrap">

        <h2 className="text-4xl font-black text-blue-950">
          ₦{price.toLocaleString()}
        </h2>

        {period && (
          <span className="text-gray-500 text-lg">
            / {period}
          </span>
        )}

      </div>

      {negotiable && (
        <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
          Negotiable
        </span>
      )}

    </div>
  );
}