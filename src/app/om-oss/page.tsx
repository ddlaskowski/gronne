import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { AboutCraft } from "@/components/sections/about-craft";
import "@/styles/about-page.css";

export const metadata: Metadata = {
  title: "Om oss | Grønne Mur og Flis AS",
  description: "Bli kjent med Grønne Mur og Flis AS og vårt arbeid med baderom, flislegging, membraner, avretting, forskaling og puss i Oslo og omegn.",
};

const serviceGroups = [
  { name: "BAD & FLIS", keywords: "Baderom · Flislegging · Membranarbeid" },
  { name: "MUR & PUSS", keywords: "Murarbeid · Sementpuss · Mineralpuss" },
  { name: "AVRETTING & FORSKALING", keywords: "Betongavretting · Avrettingsmasser · Forskaling" },
] as const;

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1} className="about-page">
      <header className="about-page-intro">
        <Container>
          <div className="about-page-intro-grid layout-grid">
            <p className="about-page-intro-label type-label">01 / OM OSS</p>
            <h1 className="about-page-intro-heading">
              <span>Håndverk med fokus</span>{" "}<span>på detaljene.</span>
            </h1>
            <p className="about-page-intro-description type-body">
              Grønne Mur og Flis AS utfører flislegging, baderomsarbeid,
              membranarbeid, avretting, forskaling og pussarbeid i Oslo og omegn.
            </p>
          </div>
        </Container>
      </header>
      <section className="about-page-work" aria-labelledby="about-page-work-heading">
        <Container>
          <div className="about-page-work-header layout-grid">
            <p className="about-page-work-label type-label">02 / DET VI JOBBER MED</p>
            <h2 id="about-page-work-heading" className="about-page-work-heading">
              <span>Fra underlag til</span>{" "}<span>ferdig overflate.</span>
            </h2>
          </div>
          <ul className="about-page-groups layout-grid" role="list">
            {serviceGroups.map((group) => (
              <li key={group.name} className="about-page-group">
                <h3 className="about-page-group-heading">{group.name}</h3>
                <p className="about-page-group-keywords type-micro">{group.keywords}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <AboutCraft />
      <section className="about-page-contact" aria-labelledby="about-page-contact-heading">
        <Container>
          <div className="about-page-contact-grid layout-grid">
            <h2 id="about-page-contact-heading" className="about-page-contact-heading">
              <span>Har du et prosjekt</span>{" "}<span>i tankene?</span>
            </h2>
            <p className="about-page-contact-description type-body">
              Fortell oss hva du planlegger. Vi tar gjerne en prat.
            </p>
            <Link href="/kontakt" className="about-page-contact-link contact-cta-link type-label">TA KONTAKT</Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
