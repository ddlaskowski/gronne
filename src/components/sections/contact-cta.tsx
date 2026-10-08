import Link from "next/link";
import { Container } from "@/components/layout/container";

export function ContactCta() {
  return (
    <section className="contact-cta" aria-labelledby="contact-cta-heading">
      <Container>
        <div className="contact-cta-grid layout-grid">
          <p className="contact-cta-label type-label">06 / LA OSS SNAKKE</p>
          <h2 id="contact-cta-heading" className="contact-cta-heading">
            <span>Har du et prosjekt</span>{" "}<span>i tankene?</span>
          </h2>
          <p className="contact-cta-description type-body">
            Fortell oss om prosjektet ditt. Vi tar gjerne en prat om mulighetene.
          </p>
          <div className="contact-cta-actions">
            <Link href="/kontakt" className="contact-cta-link type-label">
              TA KONTAKT <span aria-hidden="true">↗</span>
            </Link>
            <a href="tel:+4747153017" className="contact-cta-phone">+47 47 15 30 17</a>
          </div>
        </div>
      </Container>
    </section>
  );
}
