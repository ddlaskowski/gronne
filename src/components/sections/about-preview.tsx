import Link from "next/link";
import { Container } from "@/components/layout/container";

export function AboutPreview() {
  return (
    <section className="about-preview" aria-labelledby="about-preview-heading">
      <Container>
        <div className="about-preview-grid layout-grid">
          <p className="about-preview-label type-label">05 / OM OSS</p>
          <h2 id="about-preview-heading" className="about-preview-heading">
            <span>Et godt resultat</span>{" "}<span>begynner med</span>{" "}<span>godt samarbeid.</span>
          </h2>
          <div className="about-preview-copy">
            <p className="about-preview-description type-body">
              Grønne Mur og Flis AS utfører flislegging, murarbeid og betongarbeid
              i Oslo og omegn. Vi legger vekt på tydelig kommunikasjon, godt
              håndverk og løsninger tilpasset prosjektet.
            </p>
            <Link href="/om-oss" className="about-preview-cta type-label">
              BLI KJENT MED OSS <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
