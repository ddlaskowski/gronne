import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import "@/styles/services-page.css";

export const metadata: Metadata = {
  title: "Tjenester | Grønne Mur og Flis AS",
  description: "Flislegging, baderomsarbeid og membranarbeid, betongavretting og forskaling samt sement- og mineralpuss i Oslo og omegn.",
};

type Service = {
  id: string;
  number: string;
  name: string;
  keywords: string;
  description: string;
};

const services: readonly Service[] = [
  {
    id: "bad-og-flis",
    number: "01",
    name: "BAD & FLIS",
    keywords: "Baderom · Flislegging · Membranarbeid",
    description: "Vi utfører baderomsarbeid, flislegging og membranarbeid med vekt på nøyaktig utførelse.",
  },
  {
    id: "mur-og-puss",
    number: "02",
    name: "MUR & PUSS",
    keywords: "Murarbeid · Sementpuss · Mineralpuss",
    description: "Vi utfører pussarbeid med sementpuss og mineralpuss, med oppmerksomhet på overflaten og detaljene.",
  },
  {
    id: "betong-og-forskaling",
    number: "03",
    name: "AVRETTING & FORSKALING",
    keywords: "Betongavretting · Avrettingsmasser · Forskaling",
    description: "Vi utfører betongavretting med avrettingsmasser og forskalingsarbeid tilpasset prosjektets behov.",
  },
];

export default function ServicesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="services-page">
      <header className="services-page-hero">
        <Container>
          <div className="services-page-hero-grid layout-grid">
            <p className="services-page-hero-label type-label">01 / TJENESTER</p>
            <h1 className="services-page-hero-heading">
              <span>Håndverk som</span>{" "}<span>varer.</span>
            </h1>
            <p className="services-page-hero-description type-body">
              Fra baderom, flislegging og membranarbeid til avretting,
              forskaling og pussarbeid. Håndverk i Oslo og omegn.
            </p>
          </div>
        </Container>
      </header>
      {services.map((service) => (
        <section key={service.id} className={`services-page-service services-page-${service.id}`} aria-labelledby={`${service.id}-heading`}>
          <Container>
            <div className="services-page-service-header layout-grid">
              <p className="services-page-number type-label">{service.number}</p>
              <h2 id={`${service.id}-heading`} className="services-page-service-heading">{service.name}</h2>
            </div>
            <div className="services-page-service-body layout-grid">
              <div className="services-page-service-copy">
                <p className="services-page-keywords type-micro">{service.keywords}</p>
                <p className="services-page-description type-body">{service.description}</p>
              </div>
              <div className="services-page-media">
                <p className="services-page-placeholder-label type-label">PROSJEKTFOTO KOMMER</p>
              </div>
            </div>
          </Container>
        </section>
      ))}
      <section className="services-page-contact" aria-labelledby="services-page-contact-heading">
        <Container className="layout-grid">
          <h2 id="services-page-contact-heading" className="services-page-contact-heading">
            Har du et prosjekt i tankene?
          </h2>
          <Link href="/kontakt" className="services-page-contact-link contact-cta-link type-label">
            TA KONTAKT <span aria-hidden="true">↗</span>
          </Link>
        </Container>
      </section>
    </main>
  );
}
