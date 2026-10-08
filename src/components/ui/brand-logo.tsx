import Image from "next/image";

export function BrandLogo() {
  return (
    <Image
      src="/brand/gronne-logo.svg"
      alt="Grønne Mur og Flis AS"
      width={663.43}
      height={464.89}
      className="brand-logo"
      preload
    />
  );
}
