import Link from "next/link";
import { Container } from "@/components/layout/container";
import { navigationItems } from "@/lib/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-content">
          <div className="footer-identity">
            <p className="footer-company">GRØNNE MUR OG FLIS AS</p>
            <p className="footer-location type-label">Oslo og omegn</p>
          </div>
          <address className="footer-contact type-small font-mono">
            <a href="tel:+4747153017">+47 47 15 30 17</a>
            <a href="mailto:slawek.kalemba@gmail.com">slawek.kalemba@gmail.com</a>
          </address>
          <div className="footer-bottom">
            <nav aria-label="Bunnmeny">
              <ul className="footer-navigation type-small font-mono">
                {navigationItems.map(({ href, label }) => (
                  <li key={href}><Link href={href}>{label}</Link></li>
                ))}
              </ul>
            </nav>
            <p className="footer-copyright type-micro">© {year} Grønne Mur og Flis AS</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
