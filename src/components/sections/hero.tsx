import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { HeroImage } from "@/components/sections/hero-image";

export function Hero() {
  const hasImage = existsSync(path.join(process.cwd(), "public/images/hero/hero-craft.webp"));

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-copy-panel">
        <div className="hero-copy">
          <p className="type-label text-muted">FLIS · MUR · PRESISJON</p>
          <h1 id="hero-heading" className="hero-heading">
            <span>Fra håndverk</span><span>til ferdig rom.</span>
          </h1>
          <p className="hero-description type-body text-muted">
            Grønne Mur og Flis AS utfører flislegging, baderomsarbeid, mur og puss samt betongarbeid i Oslo og omegn.
          </p>
          <Link href="/prosjekter" className="hero-cta type-label">
            SE VÅRE PROSJEKTER
            <svg aria-hidden="true" width="28" height="16" viewBox="0 0 28 16" fill="none">
              <path d="M0 8h26M19 1l7 7-7 7" stroke="currentColor" strokeWidth="1" />
            </svg>
          </Link>
        </div>
        <p className="hero-location type-label text-muted">OSLO OG OMEGN</p>
      </div>
      <div className="hero-media">
        <div className="hero-image-placeholder" aria-hidden="true" />
        {hasImage && <HeroImage />}
      </div>
    </section>
  );
}
