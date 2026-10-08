import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";
import { HeaderInteractions } from "@/components/layout/header-interactions";
import { Navigation } from "@/components/layout/navigation";

export function Header() {
  return (
    <HeaderInteractions
      brand={<Link href="/" className="brand-link" aria-label="Grønne Mur og Flis AS – forsiden"><BrandLogo /></Link>}
      navigation={<Navigation />}
    />
  );
}
