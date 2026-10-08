import { Container } from "@/components/layout/container";

export function Introduction() {
  return (
    <section className="introduction" aria-labelledby="introduction-heading">
      <Container>
        <div className="introduction-grid layout-grid">
          <p className="introduction-label type-label">01 / VÅR TILNÆRMING</p>
          <h2 id="introduction-heading" className="introduction-heading">
            <span>Godt håndverk</span>{" "}<span>begynner med</span>{" "}<span>detaljene.</span>
          </h2>
          <p className="introduction-description type-body">
            Vi legger vekt på presisjon, materialforståelse og gjennomtenkte løsninger.
            Fra det første underlaget til den siste detaljen.
          </p>
        </div>
      </Container>
    </section>
  );
}
