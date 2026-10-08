import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import "@/styles/contact-page.css";

export const metadata: Metadata = {
  title: "Kontakt | Grønne Mur og Flis AS",
  description: "Har du et prosjekt i Oslo og omegn? Kontakt Grønne Mur og Flis AS på +47 47 15 30 17 eller slawek.kalemba@gmail.com for en prat om mulighetene.",
};

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="contact-page">
      <header className="contact-page-intro">
        <Container className="layout-grid">
          <p className="contact-page-label type-label">01 / KONTAKT</p>
          <h1 className="contact-page-heading">
            <span>La oss skape</span>{" "}<span>noe bra sammen.</span>
          </h1>
          <p className="contact-page-description type-body">
            Har du et prosjekt i tankene? Ta kontakt, så snakker vi om mulighetene.
          </p>
        </Container>
      </header>
      <section className="contact-page-details" aria-label="Kontaktinformasjon">
        <Container>
          <dl>
            <div className="contact-page-row layout-grid">
              <dt className="contact-page-detail-label type-label">TELEFON</dt>
              <dd className="contact-page-value">
                <a href="tel:+4747153017" className="contact-page-link">+47 47 15 30 17</a>
              </dd>
            </div>
            <div className="contact-page-row layout-grid">
              <dt className="contact-page-detail-label type-label">E-POST</dt>
              <dd className="contact-page-value contact-page-email">
                <a href="mailto:slawek.kalemba@gmail.com" className="contact-page-link">slawek.kalemba@gmail.com</a>
              </dd>
            </div>
            <div className="contact-page-row layout-grid">
              <dt className="contact-page-detail-label type-label">OMRÅDE</dt>
              <dd className="contact-page-value">Oslo og omegn</dd>
            </div>
          </dl>
        </Container>
      </section>
      <section className="contact-page-closing" aria-labelledby="contact-page-closing-heading">
        <Container className="layout-grid">
          <h2 id="contact-page-closing-heading" className="contact-page-closing-heading">
            <span>Fra første samtale</span>{" "}<span>til ferdig resultat.</span>
          </h2>
        </Container>
      </section>
    </main>
  );
}
