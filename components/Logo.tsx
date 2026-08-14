import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-4 shrink-0"
    >
      <Image
        src="/images/logo/stc-logo.png"
        alt="Strong Tower Concepts"
        width={70}
        height={70}
        priority
        className="object-contain"
        style={{ width: "70px", height: "70px" }}
        />

      <div className="leading-none">

        <h1 className="text-3xl font-black tracking-tight text-blue-900">
          Strong Tower
        </h1>

        <p className="text-sm font-bold tracking-[0.35em] uppercase text-yellow-500 mt-1">
          Concepts
        </p>

      </div>

    </Link>
  );
}