import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: number;
  showText?: boolean;
}

export default function Logo({
  size = 50,
  showText = true,
}: LogoProps) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
    >
      <Image
        src="/images/logo/stc-logo.png"
        alt="Strong Tower Concepts"
        width={size}
        height={size}
        priority
        className="rounded-full"
      />

      {showText && (
        <div className="leading-tight">
          <h2 className="font-bold text-xl text-blue-900">
            Strong Tower
          </h2>

          <p className="text-sm text-yellow-600 font-semibold tracking-wide">
            Concepts
          </p>
        </div>
      )}
    </Link>
  );
}